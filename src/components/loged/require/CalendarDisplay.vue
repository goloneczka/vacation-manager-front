<template>
    <div class="center">
        <datepicker :inline="true"
                    :language="pl"
                    :highlighted="valDate" />
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {pl} from 'vuejs-datepicker/dist/locale'

    export default {
        name: "CalendarDisplay",
        props: ["start", "end"],
        components: {Datepicker},
        data() {
            return {
                pl: pl,
                valDate: {}
            }
        },
        watch: {
            start: function(n) {
                const time = new Date(n)
                this.valDate.from = new Date(time.getFullYear(), time.getMonth(), time.getDate());
            },
            end: function(n) {
                const time = new Date(n)
                this.valDate.to = new Date(time.getFullYear(), time.getMonth(), time.getDate());
            }
        },
        mounted(){
            this.valDate = {
                to:  new Date(),
                from:  new Date(),
            }
        },
    }
</script>

<style scoped>

</style>