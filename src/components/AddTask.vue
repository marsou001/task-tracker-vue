<template>
  <form class="add-form" @submit="onSubmit">
    <div class="form-control">
      <label for="text">Task</label>
      <input
        type="text"
        id="text"
        name="text"
        v-model="text"
        placeholder="Add Task"
      />
    </div>
    <div class="form-control">
      <label for="day">Day &amp; Time</label>
      <input
        type="text"
        id="day"
        name="day"
        v-model="day"
        placeholder="Add Day &amp; Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label for="reminder">Set Reminder</label>
      <input type="checkbox" id="reminder" name="reminder" v-model="reminder" />
    </div>
    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      text: "",
      day: "",
      reminder: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.text) {
        alert("Please add a task!");
        return;
      }

      if (!this.day) {
        alert("Please add a day!");
        return;
      }

      const newTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };

      this.$store.dispatch('addTask', newTask);

      this.text = "";
      this.day = "";
      this.reminder = false;
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
