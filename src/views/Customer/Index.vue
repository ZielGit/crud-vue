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
                                    <router-link :to="{ name:'customers.edit', params:{id:customer.id} }" class="btn btn-warning me-1">Edit</router-link>
                                    <button type="button" class="btn btn-danger" v-on:click="deleteCustomer(customer.id)">Delete</button>
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
import { handleErrors } from '@/utils/index';

const customers = ref([]);

onMounted(async () => {
    await fetchCustomers();
});

const fetchCustomers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/customers');
        customers.value = response.data;
    } catch (error) {
        handleErrors(error);
    }
};

const deleteCustomer = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/customers/${id}`);
        await fetchCustomers();
    } catch (error) {
        handleErrors(error);
    }
};
</script>
