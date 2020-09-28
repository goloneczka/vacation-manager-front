<template>
    <div>
        <nav class="navbar color">
            <a class="navbar-brand ml-5"> {{$t('app')}} </a>
            <form class="mr-5">
                    <button type="button" class="btn btn-outline-success mr-2" @click="registration()"> {{$t('registration')}} </button>
                    <button type="button" class="btn btn-outline-success" @click="logging()"> {{$t('login.header')}} </button>
            </form>
        </nav>
        <div class="container grid-box-danger" >
            <ImagesSlider />
        </div>
        <footer class="page-footer font-small color">
            <div class="container-fluid ">
                <div class="row">
                    <div class="col-md-7 mt-md-0 mt-3">
                        <h5>Kontakt</h5>
                        <p>W razie potrzeby kontaktu, napisz na  <i>vacationmanagerapp@gmail.com</i></p>
                    </div>
                    <div class="col-md-5 mb-md-0 mb-3">
                        <h5 >Informacje</h5>
                        <p>Całość aplikacji jest pracą inżynierską </p>
                    </div>
                </div>
            </div>
            <div class="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="https://vacation-app-front.herokuapp.com/#/"> vacation-app-front.herokuapp.com</a>
            </div>
        </footer>
    </div>
</template>

<script>
    import {routesNames} from "../../routes";
    import ImagesSlider from "./ImagesSlider";

    export default {
        name: 'Home',
        components: {ImagesSlider},
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
    .grid-box-danger {
        margin-top: 2%;
        margin-bottom: 2%;
        box-shadow: 0 0 13px 3px rgba(0, 0, 0, 0.2), 0 0 13px 3px rgba(0, 0, 0, 0.2);
    }

    .color  {
        background-color: #C0C0C0;
        color: white;
    }
</style>
