<template>
    <div>
        <input v-model="selected" type="checkbox"/>
        <input v-model="titolo" />
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
            titolo:{
                get () {
                    let titolo = ''
                    this.$store.state.taskLists.forEach((taskList) => {
                        taskList.tasks.forEach((task) => {
                            if (task.id === this.taskId) {
                                titolo = task.title
                            }
                        })
                    });
                    return titolo
                },
                set (newValue) {
                    this.$store.commit('updateTask', {
                        id: this.taskId,
                        title: newValue
                    })
                }
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
            }
        }
    }
</script>

<style scoped>

</style>
