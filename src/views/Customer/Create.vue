<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Create Customer</div>
            <div class="card-body">
                <form v-on:submit.prevent="saveCustomer">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="document_type">Tipo de Documento</label>
                            <select class="form-control" name="" id="document_type" v-model="customer.document_type">
                                <option value="0" selected>DNI</option>
                                <option value="1">RUC</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="document_number">Nr de Documento</label>
                            <input type="number" class="form-control" name="" id="document_number" v-model="customer.document_number" min="0" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" name="" id="name" v-model="customer.name" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="last_name" class="form-label">Apellido</label>
                            <input type="text" class="form-control" name="" id="last_name" v-model="customer.last_name" placeholder="" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Correo</label>
                            <input type="email" class="form-control" name="" id="email" v-model="customer.email" placeholder="" required>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Button group name">
                        <button type="submit" class="btn btn-primary me-2">Agregar</button>
                        <router-link :to="{name:'customers.index'}" class="btn btn-secondary">Cancelar</router-link>
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

var customer = ref({
    document_type: '',
    document_number: '',
    name: '',
    last_name: '',
    email: ''
});

const saveCustomer = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        customer.value.document_number = String(customer.value.document_number);
        const response = await axios.post(`${apiUrl}/customers`, customer.value, {
            headers,
        });
        router.push('/customers');
        showToastSuccess(response.data.message);
        console.log(customer.value);
    } catch (error) {
        handleErrors(error);
        console.log(customer.value);
    }
};
</script>
