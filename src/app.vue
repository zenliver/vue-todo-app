<template lang="html">
    <div id="app">
        <div id="cover"></div>
        <headerCompo></headerCompo>
        <todo></todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import headerCompo from './components/header.vue';
    import Footer from './components/footer.vue';
    import todo from './components/todo.vue';

    export default {
        components: {
            headerCompo,
            todo,
            Footer,

        },
        data() {
            return {
                // text: 'test'
            };
        }
    }
</script>

<style lang="less">
    #app {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    #cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #555;
        opacity: 0.5;
        z-index: -1;
    }
</style>
