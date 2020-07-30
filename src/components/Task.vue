<template>
    <div>
        <input v-model="selected" type="checkbox"/>
        <input v-model="titolo" />
        <button @click="eliminaTask">Elimina</button>
        <button @click="persistTaskLists">Salva</button>
    </div>
</template>

<script>
    export default {
        name: "Task",
        computed: {
            titolo:{
                cache: false,
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
                        selected: this.selected,
                        title: newValue
                    })
                }
            },
            selected: {
                cache: false,
                get () {
                    let selected = undefined
                    this.$store.state.taskLists.forEach((taskList) => {
                        taskList.tasks.forEach((task) => {
                            if (task.id === this.taskId) {
                                selected = task.selected
                            }
                        })
                    });
                    return selected
                },
                set (newValue) {
                    this.$store.commit('updateTask', {
                        id: this.taskId,
                        title: this.titolo,
                        selected: newValue
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
                this.persistTaskLists()
            },
            persistTaskLists () {
                const taskLists = this.$store.state.taskLists
                const taskListsToJson = JSON.stringify(taskLists)
                localStorage.setItem('taskLists', taskListsToJson)
            }
        }
    }
</script>

<style scoped>

</style>
