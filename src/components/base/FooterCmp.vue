<template>
    <q-footer bordered class="bg-grey-8 text-white footer-cmp">
        <q-toolbar>
            <q-toolbar-title>
                <q-list class="row justify-between">
                    <q-item
                        :to="{ name: 'Home' }"
                        exact
                        clickable
                        v-ripple
                        class="q-pa-none"
                    >
                        <q-item-section class="q-pa-md" avatar>
                            <q-icon name="home" size="md" />
                        </q-item-section>
                    </q-item>

                    <q-item
                        :to="{ name: 'Editor' }"
                        exact
                        clickable
                        v-ripple
                        class="q-pa-none"
                    >
                        <q-item-section class="q-pa-md" avatar>
                            <q-icon name="create" size="md" />
                        </q-item-section>
                    </q-item>

                    <q-item
                        :to="{ name: 'Search' }"
                        exact
                        clickable
                        v-ripple
                        class="q-pa-none"
                    >
                        <q-item-section class="q-pa-md" avatar>
                            <q-icon name="book" size="md" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-toolbar-title>
        </q-toolbar>
    </q-footer>
</template>

<script>
export default {};
</script>

<style lang="sass">
.footer-cmp
    display: none

// отображать только в PWA
@media all and (display-mode: standalone)
    .footer-cmp
        display: block
</style>