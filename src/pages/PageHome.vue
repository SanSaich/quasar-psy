<template>
    <q-page class="relative-position">
        <q-scroll-area class="q-px-md absolute full-width full-height">
            <h5 class="q-mt-md q-mb-md text-weight-medium">
                {{ $route.name }}
            </h5>

            <div class="q-pa-md q-my-md borders rounded-borders form-container">
                <q-input
                    v-model="newPost.title"
                    bottom-slots
                    placeholder="Введите заголовок"
                    filled
                    dense
                >
                    <template v-slot:before>
                        <q-avatar size="md" class="q-mr-sm">
                            <img src="../assets/nMTlqnUMaMc.jpg" />
                        </q-avatar>
                    </template>

                    <template v-slot:append>
                        <q-icon
                            v-if="newPost.title !== ''"
                            name="close"
                            @click="newPost.title = ''"
                            class="cursor-pointer"
                        />
                    </template>
                </q-input>

                <q-input
                    v-model="newPost.text"
                    dense
                    filled
                    autogrow
                    placeholder="Введите текст"
                    counter
                    maxlength="280"
                >
                    <template v-slot:after>
                        <q-btn
                            round
                            dense
                            flat
                            icon="send"
                            :disabled="!newPost.title || !newPost.text"
                            @click="createPost()"
                        />
                    </template>
                </q-input>

                <q-file v-model="newFile" dense filled use-chips>
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>
            </div>

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
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { usePostsStore } from "src/stores/posts-store";

import CaseBig from "../components/cases/CaseBig.vue";

export default defineComponent({
    name: "PageHome",
    components: {
        CaseBig,
    },
    setup() {
        const store = usePostsStore();
        const newFile = ref(null);
        const newPost = reactive({
            title: "",
            text: "",
            file: { name: "", url: "" },
            like: false,
        });
        const postsList = ref([]);

        const createPost = async () => {
            if (newFile.value) {
                newPost.file.url = await store.sendFile(newFile.value);
                newPost.file.name = newFile.value.name;
                newFile.value = null;
            }
            store.addPost(newPost);
            newPost.title = "";
            newPost.text = "";
            newPost.file.url = "";
            newPost.file.name = "";
        };

        const removePost = async (item) => {
            await store.deletePost(item.id);
            if (item.file && item.file.name) {
                await store.deleteFile(item.file.name);
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
            // await store.getPostsCollection();
            store.getPostsChanges();
        });

        return {
            newPost,
            newFile,
            postsList,
            createPost,
            removePost,
            toggleLike,
        };
    },
});
</script>

<style scoped lang="sass">
.form-container
    border: 1px solid
    border-color: $primary
    border-radius: 8px

@media (min-width: $breakpoint-sm)
    .form-container
        max-width: 70%

    .posts-list
        display: flex
        flex-wrap: wrap
        gap: 16px

        &__post
            flex: 1 0 49%
</style>