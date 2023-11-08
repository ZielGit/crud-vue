<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Edit Service</div>
            <div class="card-body">
                <form v-on:submit.prevent="updateService">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" name="" id="name" v-model="formData.name" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="description" class="form-label">Descripción</label>
                            <input type="text" class="form-control" name="" id="description" v-model="formData.description" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="price" class="form-label">Precio</label>
                            <input type="number" class="form-control" name="" id="price" min="0" step="any" v-model="formData.price" placeholder="" required>
                        </div>
                    </div>
                    <div>
                        <Button type="submit" class="me-2" primary>Edit</Button>
                        <router-link :to="{ name:'services.index'}" class="btn btn-secondary">Cancel</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { showToastSuccess, handleErrors } from '@/utils/index';

const apiUrl = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const service = ref({});
const formData = ref({});

onMounted(() => {
    getService();
});

const getService = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${apiUrl}/services/${route.params.id}`, {
            headers,
        });
        service.value = response.data;
        formData.value = { ...service.value }
    } catch (error) {
        handleErrors(error);
    }
};

const updateService = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        formData.value.price = parseFloat(formData.value.price).toFixed(2);
        const response = await axios.put(`${apiUrl}/services/${service.value.id}`, formData.value, {
            headers,
        });
        router.push('/services');
        showToastSuccess(response.data.message);
    } catch (error) {
        handleErrors(error);
    }
}
</script>
