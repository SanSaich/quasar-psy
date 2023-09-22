<template>
    <h5>{{ $route.params.id }}</h5>

    <template v-if="post">
        <q-img
            :src="
                post.file && post.file.url
                    ? post.file.url
                    : 'https://cdn.quasar.dev/img/mountains.jpg'
            "
            spinner-color="primary"
        />
        <p>{{ post.title }}</p>
        <p>{{ post.text }}</p>
    </template>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
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
            async (newId) => {
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

        return {
            post,
        };
    },
});
</script>

<style>
</style>