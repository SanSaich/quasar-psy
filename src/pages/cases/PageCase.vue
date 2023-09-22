<template>
    <q-page class="relative-position">
        <q-scroll-area class="q-px-md absolute full-width full-height">
            <h5 class="q-my-md text-weight-medium">
                {{ post.title }}
            </h5>
            <p>{{ post.text }}</p>

            <template v-if="post">
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
    name: "case-id",
    setup() {
        const postsStore = usePostsStore();
        const route = useRoute();
        const Post = ref(null);

        const getPost = async (id) => {
            if (postsStore.postsList.length) {
                // console.log("получаю пост из коллекции");
                Post.value = postsStore.postsList.find((item) => {
                    return item.id === id;
                });
            } else {
                // console.log("запрашиваю пост");
                Post.value = await postsStore.getPostId(id);
            }
        };

        watch(
            () => route.params.id,
            async (newId) => {
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
            Post,
        };
    },
});
</script>

<style>
</style>