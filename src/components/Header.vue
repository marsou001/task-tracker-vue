<template>
    <header>
        <h1>{{title}}</h1>
        <Button :text="showAddTask ? 'Hide Task' : 'Show Task'" :color="showAddTask ? 'red' : 'green'" @toggleAddTask="$emit('toggle-add-task')" />
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: 'Header',     
    props: {
        title: String,
        showAddTask: Boolean,
    },   
    components: {
        Button,
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