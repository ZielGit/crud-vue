<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Edit Customer</div>
            <div class="card-body">
                <form v-on:submit.prevent="editRegister">
                    <div class="mb-3">
                      <label for="name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="name" v-model="customer.name" placeholder="" required>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" v-model="customer.email" placeholder="" required>
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

<script>
export default {
    data() {
        return {
            customer:{}
        }
    },
    created:function() {
        this.getEmployeeID();
    },
    methods:{
        getEmployeeID(){
            fetch('http://localhost:8000/api/customers/'+this.$route.params.id)
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                this.customer = dataResponse.customer;
            })
            .catch(console.log)
        },
        editRegister(){
            var data = {
                id:this.$route.params.id,
                name:this.customer.name,
                email:this.customer.email
            }
            fetch('http://localhost:8000/api/customers/'+this.$route.params.id,{
                method:"PUT",
                body:JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                window.location.href='/customers'
            })
        }
    }
}
</script>
