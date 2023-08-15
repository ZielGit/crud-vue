<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Create Customer</div>
            <div class="card-body">
                <form v-on:submit.prevent="addRegister">
                    <div class="mb-3">
                      <label for="name" class="form-label">Nombre</label>
                      <input type="text" class="form-control" name="" id="name" v-model="customer.name" placeholder="" required>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" class="form-control" name="" id="email" v-model="customer.email" placeholder="" required>
                    </div>
                    <div class="btn-group" role="group" aria-label="Button group name">
                        <button type="submit" class="btn btn-primary">Agregar</button>
                        <router-link :to="{name:'customers.index'}" class="btn btn-secondary">Cancelar</router-link>
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
    methods:{
        addRegister(){
            var data = {
                name: this.customer.name,
                email: this.customer.email
            }
            console.log(data);
            fetch('http://localhost:8000/api/customers',{
                method:"POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                window.location.href='/customers'
            })
            .catch(console.log)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>