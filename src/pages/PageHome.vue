<template>
    <q-page class="relative-position">
        <q-scroll-area class="q-px-md absolute full-width full-height">
            <h5 class="q-my-md text-weight-medium">
                {{ $route.name }}
            </h5>

            <q-list class="posts-list">
                <!-- <transition-group> -->
                <!-- добавить неявную пагинацию -->
                <case-big
                    v-for="item in postsList"
                    :key="item.id"
                    :item="item"
                    @toggleLike="toggleLike(item)"
                    @removePost="removePost(item)"
                ></case-big>
                <!-- </transition-group> -->
            </q-list>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { usePostsStore } from "src/stores/posts-store";
import { useFilesStore } from "src/stores/files-store";

import CaseBig from "../components/cases/CaseBig.vue";

export default defineComponent({
    name: "PageHome",
    components: {
        CaseBig,
    },
    setup() {
        const postsList = ref([]);

        const store = usePostsStore();
        const filesStore = useFilesStore();

        const removePost = async (item) => {
            await store.deletePost(item.id);
            if (item.file && item.file.name) {
                await filesStore.deleteFile(item.file.name);
            }
        };

        const toggleLike = async (post) => {
            await store.updatePost(post.id, { like: !post.like });
        };

        watch(
            () => store.postsList,
            (newValue) => {
                postsList.value = newValue;
            },
            { deep: true }
        );

        onMounted(async () => {
            store.getPostsChanges();
        });

        return {
            postsList,
            removePost,
            toggleLike,
        };
    },
});
</script>

<style scoped lang="sass">
@media (min-width: $breakpoint-sm)
    .posts-list
        display: flex
        flex-wrap: wrap
        gap: 16px

        .case-card
            flex: 1 0 49%
</style>