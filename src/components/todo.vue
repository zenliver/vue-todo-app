<template lang="html">
    <div class="real-app">
        <input type="text" name="" value="" class="add-input" placeholder="接下来要做什么？" autofocus v-on:keyup.enter="addTodo">
        <item v-bind:todo="todoItem" v-for="todoItem in filteredTodoData" :key="todoItem.id" @delTodo="delTodoItem"></item>
        <tabs :currentState="currentStateData" :todos="todoData" @clearAllComp="clearAllCompTodos" @toggleState="toggleStates"></tabs>
    </div>
</template>

<script>
    import item from './item.vue';
    import tabs from './tabs.vue';

    var idDefault = 0;

    export default {
        components: {
            item,
            tabs
        },
        data() {
            return {
                todoData: [],
                currentStateData: 'all'
            };
        },
        computed: {
            filteredTodoData() {
                function isEqualTrue(object) {
                    return object.completed === true;
                }
                function isEqualFalse(object) {
                    return object.completed === false;
                }

                if (this.currentStateData === 'all') {
                    return this.todoData;
                } else if (this.currentStateData === 'completed') {
                    return this.todoData.filter(isEqualTrue);
                } else {
                    return this.todoData.filter(isEqualFalse);
                }

            }
        },
        methods: {
            addTodo(e) {
                if (e.target.value.trim() != '') {
                    this.todoData.unshift({
                        id: idDefault,
                        content: e.target.value.trim(),
                        completed: false
                    });
                    console.log('idDefault: ' + idDefault + ',' + e.target.value.trim());
                    console.log(e);
                    e.target.value = '';
                    idDefault++;
                } else {
                    alert('任务内容不能为空。');
                }
            },
            delTodoItem(id) {
                console.log('从子组件item返回的id：'+ id);

                function isEqual(object) {
                    console.log('从子组件接收的id：' + id);
                    return object.id === id;
                }
                var __index = this.todoData.findIndex(isEqual);
                console.log('与子组件item中点击的项目的id值一致的父组件数组元素的序号：' + __index);
                this.todoData.splice(__index,1);
            },
            clearAllCompTodos() {
                console.log('tabs子组件与父组件成功通信。');

                function isEqual(object) {
                    return object.completed === false;
                }

                // var __index = this.todoData.findIndex(isEqual);
                // while (__index >= 0) {
                //     this.todoData.splice(__index,1);
                //     __index = this.todoData.findIndex(isEqual);
                // }

                this.todoData = this.todoData.filter(isEqual);

            },
            toggleStates(state) {
                this.currentStateData = state;
            }
        }
    }
</script>

<style lang="less" scoped="">
    .real-app {
        width: 600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666;
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>
