<template>
    <div>这是首页的内容{{name}}</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'App',
    data() {
        return {
            name: '网页'
        };
    }
})
</script>