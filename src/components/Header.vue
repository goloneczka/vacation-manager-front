<template>
    <div class="pb-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand ml-5"> {{$t('app') + " - " + text }} </a>
            <form class="logged" v-if="isLogged">
                <a class="navbar-brand  mr-3"> {{ enterprise }} </a>
                <button type="button" class="btn btn-outline-success mr-5" v-if="isBackRequire" @click="back()"> {{$t('back')}} </button>
                <button type="button" class="btn btn-outline-success" @click="logOut()"> {{$t('logOut')}} </button>
            </form>
        </nav>
    </div>
</template>

<script>
    import {routesNames} from "../routes";
    import {authorizationStorage} from "../App";

    export default {
        name: "Header",
        props: ["text", "isLogged", "enterprise", "isBackRequire"],
        methods: {
            logOut(){
                authorizationStorage.removeAuthorization()
                this.$router.push(routesNames.home)
            },
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

    .logged {
        margin-left: 50%;
    }

</style>