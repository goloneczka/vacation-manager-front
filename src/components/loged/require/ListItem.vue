<template>
    <q> Wniosek o urlop na <b>{{item.startDate}} ; {{item.endDate}}</b> pracownika <b> {{item.name}} ( {{item.occupation}} )</b> </q>
</template>

<script>

    export default {
        name: "ListItem",
        props: ["item"],

    }
</script>

<style scoped>

</style>