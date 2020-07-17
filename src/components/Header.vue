<template>
    <div class="pb-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand ml-5"> {{$t('app') + " - " + text }} </a>
            <form class="logged" v-if="isLogged">
                <a class="navbar-brand pl-5"> {{ enterprise }} </a>
            </form>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ["text", "isLogged", "enterprise"]
    }
</script>

<style scoped>

    .logged {
        margin-left: 50%;
    }

</style>