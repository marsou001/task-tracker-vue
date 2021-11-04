<template>
    <div :key="task.id" v-for="task in tasks">
        <Task :task="task" />
    </div>
</template>

<script>
    import Task from './Task';
    export default {
        name: 'Tasks',
        components: {
            Task,
        },
        computed: {
            tasks() {
                return this.$store.state.tasks;
            }
        }
    }
</script>