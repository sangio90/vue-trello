<template>
    <div>
        <input v-model="selected" type="checkbox"/>
        <input v-model="titolo"/>
        <button @click="eliminaTask">Elimina</button>
        <button @click="salvaTask(taskId)">Salva</button>
    </div>
</template>

<script>
    export default {
        name: "Task",
        data () {
            return {
                titolo: '',
                selected: false
            }
        },
        props: {
            taskId: {
                type: Number,
                default: 0
            },
            titoloIniziale: {
                type: String,
                default: ''
            }
        },
        methods: {
            eliminaTask () {
                this.$emit('elimina', this.taskId)
                this.$store.commit('removeTask', this.taskId)
            },
            salvaTask () {
                this.$emit('salva', this.taskId, this.titolo)
            }
        },
        mounted () {
            this.titolo = this.titoloIniziale
        }

    }
</script>

<style scoped>

</style>
