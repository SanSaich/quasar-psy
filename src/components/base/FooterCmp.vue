<template>
    <q-footer bordered class="bg-grey-8 text-white footer-cmp">
        <q-toolbar>
            <q-toolbar-title>Menu</q-toolbar-title>
        </q-toolbar>
    </q-footer>
</template>

<script>
export default {};
</script>

<style lang="sass">
.footer-cmp
    display: none

@media all and (display-mode: standalone)
    .footer-cmp
        display: block
</style>