<template>
    <div class="dialog-alert" >
        <b-alert sticky
                 :show="dismissTime"
                 dismissible
                 @dismissed="dismissTime=0"
                 @dismiss-count-down="countDownChanged"
                 :variant="type">{{ this.message }}
        </b-alert>
    </div>
</template>

<script>
    export default {
        name: "AlertTemplate",
        data() {
            return {
                dismissTime: 0,
                countDown: 4
            }
        },
        props: ['message', 'type'],
        watch: {
            message: function () {
                this.dismissTime = this.countDown;
            },
            dismissTime: function (n) {
                if (n === 0)
                    this.$root.$emit("clearMessage");
            }
        },
        methods: {
            countDownChanged(dismissDangerCountDown) {
                this.dismissTime = dismissDangerCountDown
            },
        },
        mounted() {
            if (this.message)
                this.dismissTime = this.countDown;

        }
    }

</script>

<style scoped>
    .dialog-alert {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }
</style>
