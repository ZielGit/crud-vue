<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">Agregar Nuevo Empleado</div>
            <div class="card-body">
                <form v-on:submit.prevent="addRegister">
                    <div class="mb-3">
                      <label for="name" class="form-label">Nombre</label>
                      <input type="text" class="form-control" name="" id="name" v-model="employee.name" placeholder="" required>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" class="form-control" name="" id="email" v-model="employee.email" placeholder="" required>
                    </div>
                    <div class="btn-group" role="group" aria-label="Button group name">
                        <button type="submit" class="btn btn-primary">Agregar</button>
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
    methods:{
        addRegister(){
            console.log(this.employee);
            var data = {
                name:this.employee.name,
                email:this.employee.email
            }
            fetch('http://localhost/employees/?store=1',{
                method:"POST",
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                window.location.href='list'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>