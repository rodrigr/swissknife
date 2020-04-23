const app = new Vue({
	el: '#app',
	data: {
		user: '',
		token: '',
		error: {},
		database: firebase.database(),
		calcHistory: [] 
	},
	methods:{
		login(){
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
			  app.token = result.credential.accessToken;
			  app.user = result.user;

			  app.database.ref('/calc/' + app.user.uid).on("child_added",function(data){
			  	app.calcHistory.push(data.val())
			  })
			  
			}).catch(function(error) {
			  app.error = error
			});
		},
		logout(){
			firebase.auth().signOut().then(function() {
			  app.user = ''
			  app.token = ``
			  app.calcHistory = []
			}).catch(function(error) {
			  app.error = error
			});
		}
	}
})