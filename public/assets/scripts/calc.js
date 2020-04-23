const calc = Vue.component('calc',{
	props: ['db','userdata','history'],
	data(){
		return {
			numbers: [{name: 'zeroo',value: 0},{name: 'one',value: 1},{name: 'two',value: 2},{name: 'three',value: 3},{name: 'four',value: 4},{name: 'five',value: 5},{name: 'six',value: 6},{name: 'seven',value: 7},{name: 'eight',value: 8},{name: 'nine',value: 9},{name: 'float',value: '.'}],
			ops: [{name: 'plus', value: '+'},{name: 'minus', value: '-'},{name: 'by', value: '*'},{name: 'divided', value: '/'}],
			actions: [{name: 'equal', value: '='},{name: 'clear', value: 'C'},{name: 'backspace', value: '<<'}],
			output: [],
			
		}
	},
	methods: {
		print(key){
			if(this.output.includes('SyntaxError')){
				this.output = []
			}

			this.output.push(key.value)
		},
		clear(){
			this.output = []
		},
		backspace(){
			if(this.output.includes('SyntaxError')){
				this.output = []
			}else{
				this.output.pop()
			}
			
		},
		equal(){
			try{
				let calc = this.output 
				this.output = [eval(this.output.join(''))]
				this.db.ref('/calc/' + this.userdata.uid).push({
					calcArray: calc,
					calcString: calc.join(''),
					result: this.output.join('')
				})

			}catch(error){
				this.output = [error.name]
			}
		},
		handleFn(fn_name){
			return this[fn_name]()
		}
	},
	computed: {
		fancyOutput(){
			return this.output.map(e => this.ops.some(op => e == op.value) || e == 'SyntaxError' ? `<span style="color:red">${e}</span>` : e)
		}
	},
	template: `
		<div id="calc-container" class="container">
			<div class="flex-container">
				<div id="calc">
					<div v-for="number in numbers" v-bind:id="number.name" class="key" @click="print(number)" :style="'grid-area:' + number.name">{{number.value}}</div>
					<div v-for="op in ops" :id="op.name" class="key op" @click="print(op)" :style="'grid-area:' + op.name">{{op.value}}</div>
					<div v-for="action in actions" :id="action.name" @click="handleFn(action.name)" :style="'grid-area:' + action.name">{{action.value}}</div>
				</div>
				<div id="output"><template v-for="value in fancyOutput"><span v-html="value"></span></template></div>
			</div>
			<calchistory @sendcalc="output = $event" @sendresult="output = $event" :history="history"></calchistory>
		</div>
	`
})