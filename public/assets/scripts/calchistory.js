const calcHistory = Vue.component('calchistory',{
	props: ['history'],
	data(){
		return {}
	},
	methods:{
		sendCalc(calc){
			this.$emit("sendcalc", calc)
		},
		sendResult(result){
			this.$emit("sendresult", [result])
		}
	},
	template: `
		<div id="calc-history">
			<ul>
				<li v-for="calc in history">
					<span @click="sendCalc(calc.calcArray)">{{calc.calcString}}</span> = <span @click="sendResult(calc.result)">{{calc.result}}</span>
				</li>
			</ul>
		</div>
	`
})