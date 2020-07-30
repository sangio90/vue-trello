<template>
    <div class="list" style="position: relative; min-height: 200px;">
        <h2 style="margin-bottom: -5px; margin-top: 5px;">{{ title }}</h2>
        <hr>
        <p v-if="tasks.length === 0">Non sono presenti task</p>
        <task
            class="task"
            v-for="(task, index) in tasks"
            @elimina="eliminaTask"
            @salva="salvaTask"
            :key="index"
            :task-id="task.taskId"
            :titolo-iniziale="task.titolo"
        />

        <br/>
        <button @click="addTask" style="position: absolute; bottom: 5px; left: 5px;">Aggiungi</button>
    </div>
</template>

<script>
    import Task from './Task'
    export default {
        name: "TaskList",
        components: {
            Task
        },
        props: {
           title: {
               type: String,
               default: 'untitled'
           }
        },
        data () {
            return {
                tasks: []
            }
        },
        methods: {
            addTask () {
                this.tasks.push({ taskId: this.getMaxId(), titolo: '' })
                this.$store.commit('increment');
            },
            eliminaTask (taskId) {
                const indexToDelete = this.tasks.findIndex(
                    function(element) {
                        return element.taskId === taskId
                    })
                this.tasks.splice(indexToDelete, 1)
                this.updateLocalStorage()
                this.$store.commit('decrement');
            },
            salvaTask (taskId, titolo) {
                const task = { taskId: taskId, titolo: titolo }

                let existingTaskIndex = this.tasks.findIndex(function(element) {
                    return element.taskId === taskId
                })
                this.tasks[existingTaskIndex] = task
                this.updateLocalStorage();
            },
            updateLocalStorage() {
                let allTasks = localStorage.getItem('tasks')
                allTasks = JSON.parse(allTasks) || {}
                allTasks[this.title] = this.tasks
                localStorage.setItem('tasks', JSON.stringify(allTasks))
            },
            getMaxId () {
                let maxId = 0;
                this.tasks.forEach((task) => {
                    if (task.taskId > maxId) {
                        maxId = task.taskId
                    }
                });
                return (maxId + 1)
            },
        },
        created () {
            let tasks = localStorage.getItem('tasks')
            tasks = JSON.parse(tasks) || {}
            this.tasks = tasks[this.title] || []
        }
    }
</script>

<style scoped>
    .list {
        background-color: lightgrey;
        box-shadow: 2px 2px 4px white;
        border-radius: 0.3em;
        padding: 0 .5em .5em .5em;
        color: black;
        min-width: 280px;
    }

    h2 {
        color: #555;
    }

    .task {
        margin-bottom: 5px;
    }

    button {
        border: 1px solid grey;
        border-radius: 0.2em;
        padding: 0.3em;
        font-size: 1.2em;
        font-weight: bold;
    }

    button:hover {
        outline: none;
        box-shadow: 1px 1px 1px 0 grey;
        background-color: lightgrey;
    }
</style>