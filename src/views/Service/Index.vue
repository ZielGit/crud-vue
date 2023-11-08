<template>
    <div class="container mt-4">
        <RouterLink class="btn btn-primary mb-2" to="/services/create">Add Service</RouterLink>
        <div class="card">
            <div class="card-header">
                <h5>Services List</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="service in services" :key="service.id">
                                <td scope="row">{{ service.id }}</td>
                                <td>{{ service.name }}</td>
                                <td>{{ service.description }}</td>
                                <td>{{ service.price }}</td>
                                <td>
                                    <router-link :to="{ name: 'services.edit', params: { id: service.id } }" class="btn btn-warning me-1">Edit</router-link>
                                    <Button type="button" danger @click="deleteService(service.id)">Delete</Button>
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
const services = ref([]);

onMounted(async () => {
    await fetchServices();
});

const fetchServices = async () => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${apiUrl}/services`, {
            headers,
        });
        services.value = response.data;
    } catch (error) {
        handleErrors(error);
    }
};

const deleteService = async (id) => {
    try {
        const accessToken = authStore.accessToken;
        if (!accessToken) {
            router.push('/login');
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(`${apiUrl}/services/${id}`, {
            headers,
        });
        await fetchServices();
    } catch (error) {
        handleErrors(error);
    }
};
</script>
