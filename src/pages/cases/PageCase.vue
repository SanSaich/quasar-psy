<template>
    <q-page class="relative-position">
        <q-scroll-area class="q-px-md absolute full-width full-height">
            <template v-if="post">
                <h5 class="q-my-md text-weight-medium">
                    {{ post.title }}
                </h5>
                <p>{{ post.text }}</p>
                <q-img
                    :src="
                        post.file && post.file.url
                            ? post.file.url
                            : 'https://cdn.quasar.dev/img/mountains.jpg'
                    "
                    spinner-color="primary"
                />
            </template>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { defineComponent, onMounted, onServerPrefetch, ref, watch } from "vue";
import { usePostsStore } from "src/stores/posts-store";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "PageCase",
    setup() {
        const postsStore = usePostsStore();
        const route = useRoute();
        const post = ref(null);

        const getPost = async (id) => {
            if (postsStore.postsList.length) {
                // console.log("получаю пост из коллекции");
                post.value = postsStore.postsList.find((item) => {
                    return item.id === id;
                });
            } else {
                // console.log("запрашиваю пост");
                post.value = await postsStore.getPostId(id);
            }
        };

        watch(
            () => route.params.id,
            async (newId, oldId) => {
                if (oldId !== newId) {
                    post.value = null;
                }
                if (newId) {
                    getPost(newId);
                }
            }
        );

        onMounted(() => {
            getPost(route.params.id);
        });

        onServerPrefetch(async () => {
            post.value = await postsStore.getPostId(id);
        });

        return {
            post,
        };
    },
});
</script>

<style>
</style>