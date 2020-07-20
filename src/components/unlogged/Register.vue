<template>
    <div>
        <Header :text="$t('registerForm.form')"/>
        <div class="pr-5 pl-5 text-left">
            <div v-for="(error, index) in errors" v-bind:key="index">
                <Alert :message="error" :type="'danger'"/>
            </div>
            <div v-if="succes">
                <Alert :message="$t('registerForm.accepted')" :type="'success'"/>
            </div>
            <form @submit="sendRegisterForm" method="post">
                <div class="form-group">
                    <label for="name">{{$t('registerForm.getName')}}</label>
                    <input v-model="name" class="form-control" id="name"
                           v-bind:placeholder="$t('registerForm.getName')">
                </div>
                <div class="form-group">
                    <label for="email">{{$t('registerForm.getEmail')}}</label>
                    <input v-model="email" class="form-control" id="email"
                           v-bind:placeholder="$t('registerForm.getEmail')">
                    <small id="note">{{$t('registerForm.emailNote')}}</small>
                </div>
                <div class="form-group">
                    <label for="company">{{$t('registerForm.getHired')}}</label>
                    <input v-model="hired" class="form-control" id="hired"
                           v-bind:placeholder="$t('CEO.newEmployee.hiredTemplate')">
                    <small>{{$t('CEO.newEmployee.hiredNote')}}</small>
                </div>
                <div class="form-group">
                    <label for="company">{{$t('registerForm.getCompanyName')}}</label>
                    <input v-model="company" class="form-control" id="company"
                           v-bind:placeholder="$t('registerForm.getCompanyName')">
                </div>
                <div class="form-group">
                    <label for="passwd">{{$t('registerForm.getPasswd')}}</label>
                    <input v-model="passwd" type="password" class="form-control" id="passwd"
                           v-bind:placeholder="$t('registerForm.getPasswd')">
                </div>
                <button type="submit" class="btn btn-primary">{{$t('registerForm.submit')}}</button>
            </form>
        </div>
    </div>
</template>

<script>
    import Header from "../Header";
    import {enterpriseService} from "../../App";
    import Alert from "../Alert";

    export default {
        name: "Register",
        components: {Alert, Header},
        data: function () {
            return {
                name: '',
                email: '',
                company: '',
                passwd: '',
                hired: '',
                errors: [],
                succes: false
            }
        },
        methods: {
            sendRegisterForm(e) {
                this.errors = []
                this.succes = false;
                enterpriseService.addEnterpriseWithCEO(this.name, this.email, this.company, this.passwd, this.hired)
                    .then(data => {
                        if (data.errors) {
                            this.errors = data.errors
                        } else {
                            this.succes = true
                        }
                    });
                e.preventDefault();     // TODO CO TO ROBI ?
            }
        }
    }
</script>

<style scoped>

</style>