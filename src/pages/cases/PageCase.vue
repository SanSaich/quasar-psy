<template>
    <h5>{{ $route.params.id }}</h5>

    <template v-if="Post">
        <q-img
            :src="
                Post.file && Post.file.url
                    ? Post.file.url
                    : 'https://cdn.quasar.dev/img/mountains.jpg'
            "
            spinner-color="primary"
        />
        <p>{{ Post.title }}</p>
        <p>{{ Post.text }}</p>
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
            Post,
        };
    },
});
</script>

<style>
</style>