import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    taskLists: [
      {
        id: 1,
        name: 'Todo',
        tasks: [
          {
            id: 1,
            title: 'Comprare la frutta'
          },
          {
            id: 2,
            title: 'Mangiare la frutta'
          },
          {
            id: 3,
            title: 'Espellere la frutta'
          }
        ]
      },
      {
        id: 2,
        name: 'Doing',
        tasks: [
          {
            id: 4,
            title: 'Salvare la cheerleader'
          }
        ]
      }
    ]
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    setCount(state, count) {
      state.count = count
    },
    setTaskLists(state, taskLists) {
      state.taskLists = taskLists
    },
    addTask(state, taskListName) {
      const indexOfSelectedTaskList = state.taskLists.findIndex(function(element) {
        return element.name === taskListName
      })

      if (indexOfSelectedTaskList >= 0) {
        state.taskLists[indexOfSelectedTaskList].tasks.push({
          id: getNewId(state.taskLists),
          title: ''
        })
      }
    },
    updateTask(state, options) {
      const id = options.id
      const title = options.title
      state.taskLists.forEach((taskList) => {
        taskList.tasks.forEach((task) => {
          if (task.id === id) {
            task.title = title
          }
        })
      });
    },
    deleteTask(state, id) {
      state.taskLists.forEach((taskList) => {
        const indexToBeDeleted = taskList.tasks.findIndex(function(element) {
          return element.id === id
        })
        if (indexToBeDeleted > -1) {
          taskList.tasks.splice(indexToBeDeleted, 1)
          //TODO aggiornare LocalStorage
        }
      });
    },
    moveTask(state, options) {
      const id = options.id
      const destinationTaskListName = options.destinationTaskListName
      let taskToBeMoved = {}
      let indexToBeMoved = undefined
      state.taskLists.forEach((taskList) => {
        indexToBeMoved = taskList.tasks.findIndex(function(element) {
          return element.id === id;
        })
        if (indexToBeMoved > -1) {
          taskToBeMoved = taskList.tasks.splice(indexToBeMoved, 1)[0]
          const listIndex = state.taskLists.findIndex(function (element) {
            return element.name === destinationTaskListName
          })
          return state.taskLists[listIndex].tasks.push(taskToBeMoved)
        }
      })
    }
  }
})

function getNewId (taskLists) {
  let maxId = 0;
  taskLists.forEach((taskList) => {
    taskList.tasks.forEach((task) => {
      if (task.id > maxId) {
        maxId = task.id
      }
    })
  });
  return (maxId + 1)
}

window.pippo = new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
