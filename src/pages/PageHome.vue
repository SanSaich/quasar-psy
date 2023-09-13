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
                    <template v-slot:after>
                        <q-avatar size="md" class="q-ml-sm">
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
            </div>

            <q-list class="posts-list">
                <transition-group>
                    <!-- добавить неявную пагинацию -->
                    <!-- q-item clickable -->
                    <q-item
                        v-for="item in postsList"
                        :key="item.id"
                        class="q-px-none column posts-list__post"
                    >
                        <div class="row">
                            <q-item-section avatar top>
                                <q-avatar>
                                    <img src="../assets/nMTlqnUMaMc.jpg" />
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-subtitle" lines="1">
                                    {{ item.title }}
                                </q-item-label>
                                <q-item-label caption>
                                    {{ item.text }}
                                </q-item-label>
                                <div class="justify-between row q-my-sm">
                                    <div class="flex justify-end">
                                        <q-btn
                                            :color="item.like ? 'pink' : 'grey'"
                                            :icon="
                                                item.like
                                                    ? 'fas fa-heart'
                                                    : 'far fa-heart'
                                            "
                                            @click="toggleLike(item)"
                                            size="xs"
                                            round
                                            flat
                                        />
                                    </div>
                                    <div class="flex justify-end">
                                        <q-btn
                                            color="grey"
                                            icon="far fa-comment"
                                            size="xs"
                                            round
                                            flat
                                        />
                                    </div>
                                    <div class="flex justify-end">
                                        <q-btn
                                            color="grey"
                                            icon="fas fa-retweet"
                                            size="xs"
                                            round
                                            flat
                                        />
                                    </div>
                                    <div class="flex justify-end">
                                        <q-btn
                                            @click="removePost(item.id)"
                                            color="grey"
                                            icon="fas fa-trash"
                                            size="xs"
                                            round
                                            flat
                                        />
                                    </div>
                                </div>
                            </q-item-section>
                            <q-item-section class="absolute-top-right" side top>
                                1 min ago
                            </q-item-section>
                        </div>

                        <q-separator />
                    </q-item>
                </transition-group>
            </q-list>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { usePostsStore } from "src/stores/posts-store";

export default defineComponent({
    name: "PageHome",
    setup() {
        const store = usePostsStore();
        const newPost = reactive({
            title: "",
            text: "",
            like: false,
        });
        const postsList = ref([]);

        const createPost = () => {
            store.addPost(newPost);
            newPost.title = "";
            newPost.text = "";
        };

        const removePost = async (id) => {
            await store.deletePost(id);
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