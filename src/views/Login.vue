<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-body">
                <pre>{{ user }}</pre>
                <form @submit.prevent="login">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Enter your email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="form.password" type="password" class="form-control" id="password" placeholder="************">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    data: () => ({
        user: {},
        form: {
            email: 'frans@gmail.com',
            password: 'password'
        }
    }),
    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.post("/login").then(res => {
                    console.log(res);
                });
            });
            
            console.log("Enviando el login...", this.form);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>