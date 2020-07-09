<template>
    <div>
        <nav class="navbar">
            <a class="navbar-brand ml-5"> {{$t('app')}} </a>
            <form class="mr-5">
                    <button type="button" class="btn btn-outline-success mr-2" @click="registration()"> {{$t('registration')}} </button>
                    <button type="button" class="btn btn-outline-success" @click="logging()"> {{$t('login.header')}} </button>
            </form>
        </nav>
    </div>
</template>

<script>
    import {routesNames} from "../../routes";

    export default {
        name: 'Home',
        components: {},
        methods: {
            registration(){
                this.$router.push(routesNames.registerCompany)
            },
            logging(){
                this.$router.push(routesNames.login)
            }
        }
    }


</script>

<style scoped>

</style>
