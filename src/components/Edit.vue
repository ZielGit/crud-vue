<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Agregar Nuevo Empleado</div>
            <div class="card-body">
                <form v-on:submit.prevent="editRegister">
                    <div class="mb-3">
                      <label for="name" class="form-label">Nombre</label>
                      <input type="text" class="form-control" name="" id="name" v-model="employee.name" placeholder="" required>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" class="form-control" name="" id="email" v-model="employee.email" placeholder="" required>
                    </div>
                    <div class="btn-group" role="group" aria-label="Button group name">
                        <button type="submit" class="btn btn-primary">Editar</button>
                        <router-link :to="{name:'List'}" class="btn btn-secondary">Cancelar</router-link>
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
            employee:{}
        }
    },
    created:function() {
        this.getEmployeeID();
    },
    methods:{
        getEmployeeID(){
            fetch('http://localhost/employees/?consultar='+this.$route.params.id)
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                this.employee = dataResponse[0];
            })
            .catch(console.log)
        },
        editRegister(){
            var data = {
                id:this.$route.params.id,
                name:this.employee.name,
                email:this.employee.email
            }
            fetch('http://localhost/employees/?update='+this.$route.params.id,{
                method:"POST",
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                window.location.href='../list'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>