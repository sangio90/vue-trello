<template>
    <div>
        <br>
        <h3>Move Task</h3>
        <select v-model="selectedTaskListName">
            <option :key="taskList.id" v-for="taskList in taskLists" :value="taskList.name">{{ taskList.name }}</option>
        </select>
        <button @click="moveTask">Sposta</button>
        {{ selectedTaskIds }}
    </div>
</template>

<script>
    export default {
        name: "MenuTask",
        data () {
            return {
                selectedTaskListName: undefined
            }
        },
        computed: {
            taskLists() {
                return this.$store.state.taskLists
            },
            selectedTaskIds () {
                let selectedTaskIds = []
                this.$store.state.taskLists.forEach((taskList) => {
                    taskList.tasks.forEach((task) => {
                        if (task.selected) {
                            selectedTaskIds.push(task.id)
                        }
                    })
                });
                return selectedTaskIds
            }
        },
        methods: {
            moveTask () {
                this.selectedTaskIds.forEach(function(id) {
                    this.$store.commit('moveTask', {
                        id: id,
                        destinationTaskListName: this.selectedTaskListName
                    })
                }, this)
            }
        }
    }
</script>

<style scoped>

</style>