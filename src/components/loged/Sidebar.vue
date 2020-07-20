<template>
    <div class="sidebar">
        <a type="button" :id="mappedProperties.isWorkerInfo" @click="emitChosenView($event)">Home</a>
        <a type="button" :id="mappedProperties.isTimetableInfo" v-if="role === roleCeo || role === roleHR"
           @click="emitChosenView($event)">HR</a>
        <a type="button" :id="mappedProperties.isEmployeesInfo" v-if="role === roleCeo || role === roleHR"
           @click="emitChosenView($event)">EMPLOYEES</a>
        <a type="button" :id="mappedProperties.isCompanySettings" v-if="role === roleCeo"
           @click="emitChosenView($event)">ADMIN</a>
    </div>
</template>

<script>

    import {ROLES} from "../../core/Enums";

    export default {
        name: "Sidebar",
        props: ["role", "toSelect"],
        data() {
            return{
                mappedProperties: {}
            }
        },
        computed: {
            roleCeo: () => {
                return ROLES.CEO
            },
            roleHR: () => {
                return ROLES.HR
            },
        },
        created() {
            for (const prop in this.toSelect)
                this.mappedProperties[prop] = prop;

        },
        methods: {
            emitChosenView(event){
                this.$root.$emit("renderView", event.currentTarget.id);
            },
        }
    }
</script>

<style scoped>
    body {
        margin: 0;
        font-family: "Lato", sans-serif;
    }

    .sidebar {
        margin: 0;
        padding: 0;
        width: 200px;
        background-color: #f1f1f1;
        position: fixed;
        height: 50%;
        overflow: auto;
    }

    .sidebar a {
        display: block;
        color: black;
        padding: 16px;
        text-decoration: none;
    }

    .sidebar a.active {
        background-color: #4CAF50;
        color: white;
    }

    .sidebar a:hover:not(.active) {
        background-color: #555;
        color: white;
    }

    div.content {
        margin-left: 200px;
        padding: 1px 16px;
        height: 1000px;
    }

    @media screen and (max-width: 700px) {
        .sidebar {
            width: 100%;
            height: auto;
            position: relative;
        }
        .sidebar a {float: left;}
        div.content {margin-left: 0;}
    }

    @media screen and (max-width: 400px) {
        .sidebar a {
            text-align: center;
            float: none;
        }
    }
</style>