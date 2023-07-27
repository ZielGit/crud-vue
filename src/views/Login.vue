<template>
    <div class="container mt-4">
        <pre>{{ user }}</pre>
        <form @submit.prevent="login">
            <input v-model="form.email" type="email" placeholder="Enter your email">
            <input v-model="form.password" type="password" placeholder="************">
            <button>Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        user: {},
        form: {
            email: '',
            password: ''
        }
    }),
    methods: {
        login() {
            axios.post("http://localhost:8080/login").then(res => {
                console.log(res);
            });
            console.log("Enviando el login...", this.form);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>