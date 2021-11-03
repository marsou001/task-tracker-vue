import { createStore } from 'vuex';

export default createStore({
    state: {
        showAddTask: true,
    },
    mutations: {
        toggleAddTask(state) {
            state.showAddTask = !state.showAddTask;
        }
    }
});