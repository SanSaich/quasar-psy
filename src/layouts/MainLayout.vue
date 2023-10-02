<template>
    <q-layout view="lHr lpR fFf">
        <header-cmp
            @toggleLeft="toggleLeftDrawer"
            :showIcon="!leftDrawerOpen"
        />

        <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            side="left"
            bordered
            :breakpoint="920"
        >
            <q-icon
                name="spatial_audio_off"
                size="xl"
                class="q-pa-md"
                color="primary"
            ></q-icon>

            <q-list>
                <q-item
                    :to="{ name: 'Home' }"
                    exact
                    clickable
                    v-ripple
                    class="q-pa-md"
                >
                    <q-item-section avatar>
                        <q-icon name="home" size="md" />
                    </q-item-section>

                    <q-item-section class="text-h6 text-weight-bold">
                        Домой
                    </q-item-section>
                </q-item>

                <q-item
                    :to="{ name: 'Editor' }"
                    exact
                    clickable
                    v-ripple
                    class="q-pa-md"
                >
                    <q-item-section avatar>
                        <q-icon name="create" size="md" />
                    </q-item-section>

                    <q-item-section class="text-h6 text-weight-bold">
                        Редактор постов
                    </q-item-section>
                </q-item>

                <q-item
                    :to="{ name: 'Search' }"
                    exact
                    clickable
                    v-ripple
                    class="q-pa-md"
                >
                    <q-item-section avatar>
                        <q-icon name="book" size="md" />
                    </q-item-section>

                    <q-item-section class="text-h6 text-weight-bold">
                        About
                    </q-item-section>
                </q-item>
            </q-list>

            <q-btn
                v-if="deferredPrompt"
                color="primary"
                icon="check"
                label="Install App"
                @click="install"
            />
        </q-drawer>

        <q-page-container>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </q-page-container>

        <footer-cmp />
    </q-layout>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
// import { useQuasar } from "quasar";
import HeaderCmp from "../components/base/HeaderCmp.vue";
import FooterCmp from "../components/base/FooterCmp.vue";

export default {
    components: {
        HeaderCmp,
        FooterCmp,
    },
    setup() {
        const leftDrawerOpen = ref(false);
        function toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value;
        }

        // const $q = useQuasar();
        // const platform = $q.platform;

        let deferredPrompt = ref();
        // метод для установки pwa
        const install = async () => {
            // console.log("Installing");
            // Show the install prompt
            deferredPrompt.value.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.value.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt.value = null;
        };

        onMounted(() => {
            window.addEventListener("beforeinstallprompt", (e) => {
                // Prevent the mini-infobar from appearing on mobile
                e.preventDefault();
                // Stash the event so it can be triggered later.
                deferredPrompt.value = e;
                // Optionally, send analytics event that PWA install promo was shown.
                console.log("PWA not installed");
            });
            // PWA было успешно установлено
            window.addEventListener("appinstalled", () => {
                // Clear the deferredPrompt so it can be garbage collected
                deferredPrompt.value = null;
                // Optionally, send analytics event to indicate successful install
                console.log("PWA was installed");
            });
        });

        return {
            leftDrawerOpen,
            toggleLeftDrawer,

            deferredPrompt,
            install,
        };
    },
};
</script>

<style lang="sass">
</style>