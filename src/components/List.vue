<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <h5>Lista de Empleados</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in employees" :key="employee.id">
                                <td scope="row">{{ employee.id }}</td>
                                <td>{{ employee.name }}</td>
                                <td>{{ employee.email }}</td>
                                <td>
                                    <a class="btn btn-warning">Editar</a>
                                    <a class="btn btn-danger">Eliminar</a>
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
            employees:[]
        }
    },
    created:function(){
        this.consultEmployees();
    },
    methods:{
        consultEmployees(){
            fetch('http://localhost/employees/')
            .then(response => response.json())
            .then((dataResponse) => {
                console.log(dataResponse);
                this.employees = []
                if (typeof dataResponse[0].success === 'undefined') {
                    this.employees = dataResponse;
                }
            })
            .catch(console.log)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>