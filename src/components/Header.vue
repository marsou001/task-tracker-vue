<template>
    <header>
        <h1>{{title}}</h1>
        <Button v-show="homePage" :text="showAddTask ? 'Hide Task' : 'Show Task'" :color="showAddTask ? 'red' : 'green'" @click="toggleAddTask" />
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: 'Header',     
    props: {
        title: String,
    },   
    components: {
        Button,
    },
    methods: {
        toggleAddTask() {
            this.$store.commit("toggleAddTask");
        }
    },
    computed: {
        homePage() {
            return this.$route.path === '/';
        },
        showAddTask() {
            return this.$store.state.showAddTask;
        }
    }
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>