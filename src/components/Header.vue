<template>
    <div class="pb-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand ml-5"> {{$t('app') + " - " + text }} </a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ["text"]
    }
</script>

<style scoped>

</style>