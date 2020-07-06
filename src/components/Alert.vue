<template>
    <div class="dialog-alert">
        <b-alert sticky
                 :show="true"
                 dismissible
                 :variant="type">{{ this.message }}</b-alert>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        data() {
            return {
                var: this.type
            }
        },
        props: ['message', 'type'],
        methods: {}
    }

</script>

<style scoped>
    .dialog-alert {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }
</style>
