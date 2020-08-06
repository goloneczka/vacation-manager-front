<template>
    <div class="view">
        <datepicker :placeholder="$t('CEO.newEmployee.hiredTemplate')"
                    @selected="passVal" :language="pl"
                    :bootstrap-styling="true"
                    :disabled-dates="validateDate"></datepicker>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import {pl} from 'vuejs-datepicker/dist/locale'

    export default {
        components: {Datepicker},
        name: "CalendarPicker",
        props: ["endDate", "startDate", "pastLeaves"],
        data() {
            return {
                pl: pl,
                validateDate: {},
            }
        },
        watch: {
            startDate: function(n) {
                const time = new Date(n)
                this.validateDate.to = new Date(time.getFullYear(), time.getMonth(), time.getDate());
            },
            endDate: function(n) {
                const time = new Date(n)
                this.validateDate.from = new Date(time.getFullYear(), time.getMonth(), time.getDate());
            }
        },
        mounted() {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const end = new Date(now.getFullYear(), now.getMonth() +3, now.getDate() );
            this.validateDate = {
                to:  start,
                from:  end,
                days: [6, 0],
                ranges: this.pastLeaves
            }
        },
        methods: {
            passVal(val){
                this.$emit('calendarVal', moment(val).format('L'))
            },
        }
    }
</script>

<style scoped>

</style>