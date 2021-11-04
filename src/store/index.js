import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      showAddTask: true,
      tasks: [],
    };
  },
  mutations: {
    fetchTasks(state, tasks) {
      state.tasks = [...tasks];
    },
    toggleAddTask(state) {
      state.showAddTask = !state.showAddTask;
    },
    addTask(state, task) {
      state.tasks = [...state.tasks, task];
    },
    toggleReminder(state, updatedTask) {
      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, reminder: updatedTask.reminder } : task
      );
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    }
  },
  actions: {
    async fetchTasks(context) {
      const res = await fetch("api/tasks");
      const data = await res.json();

      context.commit("fetchTasks", data);
    },
    async addTask(context, task) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      context.commit('addTask', data);
    },
    async toggleReminder(context, id) {
      const response = await fetch(`api/tasks/${id}`);
      const taskToToggle = await response.json();
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();

      context.commit("toggleReminder", data);
    },
    async deleteTask(context, id) {
      if (!confirm("Are you sure?")) return;
  
      const res = await fetch(`api/tasks/${id}`, {
        method: "DELETE",
      });
  
      if (res.status !== 200) {
        alert("Error deleting task!");
        return;
      }
  
      context.commit('deleteTask', id);
    },
  }
});
