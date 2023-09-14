<template>
    <q-layout view="lHr lpR fFf">
        <header-cmp
            @toggleLeft="toggleLeftDrawer"
            @toggleRight="toggleRightDrawer"
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
                <!-- <q-separator /> -->
                <q-item
                    :to="{ name: 'About' }"
                    exact
                    clickable
                    v-ripple
                    class="q-pa-md"
                >
                    <q-item-section avatar>
                        <q-icon name="help" size="md" />
                    </q-item-section>

                    <q-item-section class="text-h6 text-weight-bold">
                        О проекте
                    </q-item-section>
                </q-item>
                <!-- <q-separator /> -->
                <q-item
                    :to="{ name: 'Search' }"
                    exact
                    clickable
                    v-ripple
                    class="q-pa-md"
                >
                    <q-item-section avatar>
                        <q-icon name="search" size="md" />
                    </q-item-section>

                    <q-item-section class="text-h6 text-weight-bold">
                        Поиск
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

        <q-drawer
            show-if-above
            v-model="rightDrawerOpen"
            side="right"
            behavior="mobile"
            bordered
            :width="300"
            class="q-pa-md"
        >
            <q-input
                placeholder="Найти статью"
                color="primary"
                class="q-mb-md"
                rounded
                outlined
                dense
            >
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>

            <q-list>
                <q-item
                    v-for="(item, key) of searchResult"
                    :key="key"
                    class="case-card column q-pa-none q-mb-md"
                >
                    <q-item-section class="case-card__image">
                        <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    </q-item-section>

                    <q-item-section class="case-card__icon">
                        <q-icon
                            color="primary"
                            size="md"
                            name="bookmark_border"
                        />
                    </q-item-section>

                    <q-item-section class="case-card__block-text">
                        <q-item-label overline>{{ item }}</q-item-label>
                        <q-item-label>Single line item</q-item-label>
                        <q-item-label caption
                            >Secondary line text. Lorem ipsum dolor sit amet,
                            consectetur adipiscit elit.
                        </q-item-label>
                    </q-item-section>
                    <q-separator />
                </q-item>
            </q-list>
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
import { useQuasar } from "quasar";
import HeaderCmp from "../components/base/HeaderCmp.vue";
import FooterCmp from "../components/base/FooterCmp.vue";

export default {
    components: {
        HeaderCmp,
        FooterCmp,
    },
    setup() {
        const leftDrawerOpen = ref(false);
        const rightDrawerOpen = ref(false);
        function toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value;
        }
        function toggleRightDrawer() {
            rightDrawerOpen.value = !rightDrawerOpen.value;
        }

        const searchResult = ref(["one", "two", "three"]);

        // const $q = useQuasar();
        // const platform = $q.platform;

        let deferredPrompt = ref();
        // метод для установки pwa
        const install = async () => {
            console.log("Installing");
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

            rightDrawerOpen,
            toggleRightDrawer,

            searchResult,
            deferredPrompt,
            install,
        };
    },
};
</script>

<style lang="sass">
.case-card
    gap: 10px

    &__image
        width: 100%
        max-height: 200px
        overflow: hidden
        border-radius: 8px

        img
            object-fit: cover
            width: 100%
            height: 100%

    &__icon
        position: absolute
        top: 8px
        right: 8px
        padding: 6px
        background: white
        border-radius: 50%

    .q-item__section
        margin-left: 0
</style>