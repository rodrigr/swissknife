const nav = Vue.component('navigator',{
	props: ['userdata','loginFn','logoutFn'],
	data(){
		return {}
	},
	template: `
		<div id="navigator">
			<template v-if="userdata == ''">
				<button @click="loginFn()">Login with Google</button>
			</template>
			<template v-else>
				<img :src="userdata.photoURL" class="profile-pic" alt="profile picture" />
				<button @click="logoutFn()">Logout</button>	
			</template>
			
		</div>
	`
})