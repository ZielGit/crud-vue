<template>
    <div class="container mt-4">
        <RouterLink class="btn btn-primary mb-2" to="/customers/create">Add Customer</RouterLink>
        <div class="card">
            <div class="card-header">
                <h5>Customers List</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="customer in customers" :key="customer.id">
                                <td scope="row">{{ customer.id }}</td>
                                <td>{{ customer.name }}</td>
                                <td>{{ customer.email }}</td>
                                <td>{{ customer.phone }}</td>
                                <td>
                                    <router-link :to="{ name: 'customers.edit', params: { id: customer.id } }" class="btn btn-warning me-1">Edit</router-link>
                                    <Button type="button" danger @click="deleteCustomer(customer.id)">Delete</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { handleErrors } from '@/utils/index';

const apiUrl = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();
const customers = ref([]);

onMounted(async () => {
    await fetchCustomers();
});

const fetchCustomers = async () => {
    try {
        const accessToken = authStore.accessToken;
        // Comprueba si hay un token de acceso antes de hacer la solicitud
        if (!accessToken) {
            // Puedes manejar esto de manera adecuada, como redirigir al usuario al inicio de sesión
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${apiUrl}/customers`, {
            headers,
        });
        customers.value = response.data;
    } catch (error) {
        handleErrors(error);
    }
};

const deleteCustomer = async (id) => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(`${apiUrl}/customers/${id}`, {
            headers,
        });
        await fetchCustomers();
    } catch (error) {
        handleErrors(error);
    }
};
</script>
