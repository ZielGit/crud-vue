<template>
    <div class="container mt-4">
        <div class="card my-6">
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="************">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import router from '@/router';
import { useAuthStore } from '@/stores/authStore'; // Importa la tienda de autenticación
import { handleErrors } from '@/utils/index';

const apiUrl = import.meta.env.VITE_API_URL;
const email = ref('');
const password = ref('');
const authStore = useAuthStore(); // Obtén una instancia de la tienda

const login = async () => {
    try {
        const response = await axios.post(`${apiUrl}/login`, { email: email.value, password: password.value });
        const { accessToken, user } = response.data;
        // Guarda el accessToken en la tienda
        authStore.setAccessToken(accessToken);
        router.push('/customers');
    } catch (error) {
        handleErrors(error);
    }
};
</script>