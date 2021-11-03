<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    :tasks="tasks"
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
  />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";

export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      const res = await fetch("api/tasks");
      const data = res.json();

      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = res.json();

      return data;
    },
    async addTask(task) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id);
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async deleteTask(id) {
      if (!confirm("Are you sure?")) return;

      const res = await fetch(`api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.status !== 200) {
        alert("Error deleting task!");
        return;
      }

      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
