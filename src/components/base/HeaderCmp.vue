<template>
    <q-header bordered class="bg-primary text-white">
        <q-toolbar>
            <q-btn dense flat round icon="menu" @click="$emit('toggleLeft')" />

            <q-toolbar-title>
                Psy
                <transition>
                    <q-icon
                        v-if="showIcon"
                        name="spatial_audio_off"
                        size="md"
                        class="q-pa-md header__icon"
                        color="white"
                    ></q-icon>
                </transition>
                <q-icon size="md" class="q-pa-md"></q-icon>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>

<script>
import { ref } from "vue";

export default {
    props: {
        showIcon: Boolean,
    },
    setup() {},
};
</script>

<style lang="sass">
.header

    &__icon
        position: absolute
        left: 50%
        top: 0
        transform: translateX(-50%)
</style>