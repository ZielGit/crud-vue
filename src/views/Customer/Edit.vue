<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Edit Customer</div>
            <div class="card-body">
                <form v-on:submit.prevent="updateCustomer">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="document_type">Tipo de Documento</label>
                            <select class="form-control" name="" id="document_type" v-model="formData.document_type">
                                <option value="0">DNI</option>
                                <option value="1">RUC</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="document_number">Nr de Documento</label>
                            <input type="number" class="form-control" name="" id="document_number" v-model="formData.document_number" min="0" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" name="" id="name" v-model="formData.name" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="last_name" class="form-label">Apellido</label>
                            <input type="text" class="form-control" name="" id="last_name" v-model="formData.last_name" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Correo</label>
                            <input type="email" class="form-control" name="" id="email" v-model="formData.email" placeholder="" required>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary me-1">Edit</button>
                        <router-link :to="{ name:'customers.index'}" class="btn btn-secondary">Cancel</router-link>
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
const customer = ref({});
const formData = ref({});

onMounted(() => {
    getCustomer();
});

const getCustomer = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${apiUrl}/customers/${route.params.id}`, {
            headers,
        });
        customer.value = response.data.customer;
        formData.value = { ...customer.value }
    } catch (error) {
        handleErrors(error);
    }
};

const updateCustomer = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.put(`${apiUrl}/customers/${customer.value.id}`, formData.value, {
            headers,
        });
        router.push('/customers');
        showToastSuccess(response.data.message);
    } catch (error) {
        handleErrors(error);
    }
}
</script>
