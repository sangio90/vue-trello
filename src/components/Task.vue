<template>
    <div>
        <input v-model="selected" type="checkbox"/>
        <input :value="titolo" @keypress="updateTask"/>
        <button @click="eliminaTask">Elimina</button>
        <button @click="salvaTask(taskId)">Salva</button>
    </div>
</template>

<script>
    export default {
        name: "Task",
        data () {
            return {
                selected: false
            }
        },
        computed: {
            titolo () {
                this.$store.state.taskLists.forEach((taskList) => {
                    taskList.tasks.forEach((task) => {
                        if (task.id === this.taskId) {
                            return task.title
                        }
                    })
                });
                return ''
            }
        },
        props: {
            taskId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            eliminaTask () {
                this.$store.commit('deleteTask', this.taskId)
                this.$store.commit('decrement')
            },
            updateTask () {
                console.log('here')
            }
        }
    }
</script>

<style scoped>

</style>
