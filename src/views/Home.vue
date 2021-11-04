<template>
  <AddTask v-show="showAddTask" />
  <Tasks />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";

export default {
  name: "Home",
  components: {
    Tasks,
    AddTask,
  },
  async created() {
    this.$store.dispatch("fetchTasks");
  },
  computed: {
    showAddTask() {
      return this.$store.state.showAddTask;
    },
    tasks() {
      return this.$store.state.tasks;
    },
  }
};
</script>
