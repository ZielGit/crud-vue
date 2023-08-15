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

<script>
export default {
    data () {
        return {
            customers:[]
        }
    },
    created:function(){
        this.consultCustomers();
    },
    methods:{
        consultCustomers(){
            fetch('http://localhost:8000/api/customers')
            .then(response => response.json())
            .then((dataResponse) => {
                this.customers = []
                if (typeof dataResponse[0].success === 'undefined') {
                    this.customers = dataResponse;
                }
            })
            .catch(console.log)
        },
        deleteCustomer(id){
            console.log(id);
            fetch('http://localhost:8000/api/customers/'+id, {
                method:"DELETE",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                window.location.href="customers";
            })
            .catch(console.log)
        }
    }
}
</script>
