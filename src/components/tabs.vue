<template lang="html">
    <div class="helper">
        <span class="left">{{unCompletedNum}} {{itemNames}} left</span>
        <span class="tabs">
            <span v-for="state in states" :key="state" :class="[state,currentState === state ? 'actived' : '']" :currentStateValue="currentState" @click="toggleFilter(state)">{{state}}</span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear Completed</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                states: ['all','active','completed'],
                itemName1: 'item',
                itemName2: 'items'
            };
        },
        props: {
            currentState: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true
            }
        },
        computed: {
            unCompletedNum() {
                function rule(object) {
                    return object.completed === false;
                }
                return this.todos.filter(rule).length;
            },
            itemNames() {
                return this.unCompletedNum < 2 ? this.itemName1 : this.itemName2;
            }
        },
        methods: {
            toggleFilter(state) {
                console.log(this.currentState);
                console.log(state);
                this.$emit('toggleState',state);
            },
            clearAllCompleted() {
                this.$emit('clearAllComp');
            }
        }
    }
</script>

<style lang="less" scoped>
    .helper {
        font-weight: 100;
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        line-height: 30px;
        background-color: #ffffff;
        font-size: 14px;
        font-smoothing: antialiased;
    }

    .left, .clear, .tabs {
        padding: 0 10px;
        box-sizing: border-box;
    }

    .left, .clear {
        width: 150px;
    }

    .left {
        text-align: left;
    }

    .clear {
        text-align: right;
        cursor: pointer;
    }

    .tabs {
        width: 200px;
        display: flex;
        justify-content: space-around;
        * {
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
            border: 1px solid rgba(175, 47, 47, 0);
            &.actived {
                border-color: rgba(175, 47, 47, 0.4);
                border-radius: 5px;
            }
        }
    }

</style>
