<template>
    <div class="list" style="position: relative; min-height: 200px;">
        <h2 style="margin-bottom: -5px; margin-top: 5px;">{{ name }}</h2>
        <hr>
        <p v-if="tasks.length === 0">Non sono presenti task</p>
        <task
            class="task"
            v-for="(task, index) in tasks"
            :key="index"
            :task-id="task.taskId"
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
           name: {
               type: String,
               default: 'untitled'
           }
        },
        computed: {
            tasks () {
                const indexOfSelectedTaskList = this.taskLists.findIndex(function(element) {
                    return element.name === this.name
                }, this)
                return this.taskLists[indexOfSelectedTaskList].tasks
            },
            taskLists () {
                return this.$store.state.taskLists
            }
        },
        methods: {
            addTask () {
                this.$store.commit('addTask', this.name)
                this.$store.commit('increment')
            },
            updateLocalStorage() {
                let allTasks = localStorage.getItem('tasks')
                allTasks = JSON.parse(allTasks) || {}
                allTasks[this.title] = this.tasks
                localStorage.setItem('tasks', JSON.stringify(allTasks))
            }
        },
        created () {
            // let tasks = localStorage.getItem('tasks')
            // tasks = JSON.parse(tasks) || {}
            // this.tasks = tasks[this.title] || []
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