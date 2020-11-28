<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand ml-5"> {{$t('app')}} </a>
            <form class="mr-5" style="margin-left: 65%">
                    <button type="button" class="btn btn-outline-success mr-2" @click="registration()"> {{$t('registration')}} </button>
                    <button type="button" class="btn btn-outline-success" @click="logging()"> {{$t('login.header')}} </button>
            </form>
        </nav>
        <div class="container" >
            <div class="grid-box-danger" style="overflow-anchor: none;" >
                <ImagesSlider />
            </div>
            <div id="info" >
                <div id="updating" >
                    <div class="highlight">
                        <h3> Stały rozwój aplikacji </h3>
                        <font-awesome-icon class="icon" icon="code" />
                    </div>
                    Tworzona aplikacja jest w ciągłym rozwoju. Słuchamy naszych klientów którzy pomagają nam stworzyć
                    pełnowartościowy produkt. Jeśli uważasz, że coś powinno być dodane to skontaktuj się z nami.
                </div>
                <div id="cloud" >
                    <div class="highlight">
                        <h3> Dostępność w chmurze </h3>
                        <font-awesome-icon class="icon" icon="cloud" />
                    </div>
                    Vacation Manager jest aplikacją do zarządzania urlopami, dostępną w chmurze.
                    Do skorzystania z naszych usług nie potrzebujesz zaplecza IT w firmie.
                    Skorzystasz z niej zawsze i wszędzie, gdziekolwiek jesteś.
                </div>
                <div id="security" >
                    <div class="highlight">
                        <h3> Bezpieczeństwo </h3>
                        <font-awesome-icon class="icon" icon="lock" />
                    </div>
                    W naszej aplikacji dbamy o bezpieczeństwo klientów.
                    Z nami masz pewność, że twoje dane są zaszyfrowane i zabezpieczone.
                    Możesz korzystać z naszych usług bez obaw o bezpieczeństwo.
                </div>
            </div>
        </div>
        <footer class="page-footer font-small navbar-light bg-light">
            <div class="container-fluid ">
                <div class="row">
                    <div class="col-md-8 mt-md-0 mt-3">
                        <h5>Kontakt</h5>
                        <p>Adres email:  <i>vacationmanagerapp@gmail.com</i></p>
                    </div>
                    <div class="col-md-3 mb-md-0 mb-3">
                        <h5>Ważne</h5>
                        <p>Aplikacja została stworzona na potrzeby pracy inżynierskiej.
                            W razie potrzeby, skontaktuj się z twórcą.</p>
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
        },
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

    #info{
        padding-top: 30px;
        padding-bottom: 30px;
        width: 60%;
        margin-right: auto;
        margin-left: auto;
    }

    .highlight {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon{
        font-size: 40px;
        padding-left: 10px;
    }

    #updating, #cloud, #security{
        padding-bottom: 20px;
        text-align: justify;
    }

</style>
