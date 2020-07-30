<template>
  <div id="app">
    <h1>My Trello</h1>
    <div style="display: flex; justify-content: space-evenly">
      <task-list @salva="stoSalvando" v-for="element in lists" :name="element.name" :key="element.id"></task-list>
    </div>
    <br>
    <h3>In totale ci sono {{ counter }} task</h3>
  </div>
</template>

<script>
import TaskList from "./components/TaskList";
export default {
  name: 'App',
  components: {
    TaskList
  },
  methods: {
    stoSalvando () {
      console.log('hei sto salvando')
    }
  },
  computed: {
    counter () {
      return this.$store.state.count
    },
    lists () {
      return this.$store.state.taskLists
    }
  },
  created () {
    // let tasks = localStorage.getItem('tasks')
    // tasks = JSON.parse(tasks) || {}
    // let counter = 0
    // for (const taskList in tasks) {
    //   counter += tasks[taskList].length
    // }
    // this.$store.commit('setCount', counter)
  }
}
</script>
