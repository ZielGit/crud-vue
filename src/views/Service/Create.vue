<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Create Service</div>
            <div class="card-body">
                <form v-on:submit.prevent="saveService">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" name="" id="name" v-model="service.name" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="description" class="form-label">Descripción</label>
                            <input type="text" class="form-control" name="" id="description" v-model="service.description" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="price" class="form-label">Precio</label>
                            <input type="number" class="form-control" name="" id="price" v-model="service.price" placeholder="" required>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Button group name">
                        <Button type="submit" class="me-2" primary>Agregar</Button>
                        <router-link :to="{name:'services.index'}" class="btn btn-secondary">Cancelar</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { showToastSuccess, handleErrors } from '@/utils/index';

const apiUrl = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();

var service = ref({
    name: '',
    description: '',
    price: ''
});

const saveService = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.post(`${apiUrl}/services`, service.value, {
            headers,
        });
        router.push('/services');
        showToastSuccess(response.data.message);
        console.log(service.value);
    } catch (error) {
        handleErrors(error);
        console.log(service.value);
    }
};
</script>
