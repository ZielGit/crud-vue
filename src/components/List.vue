<template>
    <div>
        <div v-for="employee in employees" :key="employee.id">
            <div>{{ employee.id }}</div>
            <div>{{ employee.name }}</div>
            <div>{{ employee.email }}</div>
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