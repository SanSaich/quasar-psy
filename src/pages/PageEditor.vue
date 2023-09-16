<template>
    <q-page class="relative-position">
        <q-scroll-area class="q-px-md absolute full-width full-height">
            <h5 class="q-my-md text-weight-medium">
                {{ $route.name }}
            </h5>

            <template v-if="!isLoading">
                <div
                    class="q-pa-md q-my-md borders rounded-borders form-container"
                >
                    <q-input
                        v-model="newPost.title"
                        bottom-slots
                        placeholder="Введите заголовок"
                        filled
                        dense
                    >
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
                        <template v-slot:append>
                            <q-icon
                                v-if="newPost.text !== ''"
                                name="close"
                                @click="newPost.text = ''"
                                class="cursor-pointer"
                            />
                        </template>
                    </q-input>

                    <q-file
                        v-model="newFile"
                        dense
                        filled
                        use-chips
                        accept="image/*"
                        @update:model-value="handleUpload()"
                    >
                        <template v-slot:prepend>
                            <q-icon name="attach_file" />
                        </template>
                    </q-file>
                </div>

                <template v-if="newPost.title || newPost.text || newFile">
                    <case-big :item="newPost"></case-big>
                    <q-btn
                        rounded
                        outline
                        size="md"
                        color="primary"
                        class="q-mb-md q-mx-auto flex"
                        icon="add"
                        label="Создать пост"
                        :disabled="!newPost.title || !newPost.text"
                        @click="createPost()"
                    />
                </template>
            </template>
            <div v-else class="flex justify-center">
                <q-spinner-puff color="primary" size="50%" />
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { usePostsStore } from "src/stores/posts-store";
import { useFilesStore } from "src/stores/files-store";
import CaseBig from "../components/cases/CaseBig.vue";

export default defineComponent({
    name: "PageAbout",
    components: {
        CaseBig,
    },
    setup() {
        const isLoading = ref(false);
        const store = usePostsStore();
        const filesStore = useFilesStore();

        const newFile = ref(null);
        const newPost = reactive({
            title: "",
            text: "",
            file: { name: "", url: "" },
            like: false,
        });

        const handleUpload = () => {
            newPost.file.url = newFile.value
                ? URL.createObjectURL(newFile.value)
                : "";
        };

        const addFile = async () => {
            if (newFile.value) {
                newPost.file.url = await filesStore.sendFile(newFile.value);
                newPost.file.name = newFile.value.name;
                newFile.value = null;
            }
        };

        const createPost = async () => {
            isLoading.value = true;

            await addFile();
            store.addPost(newPost);

            newPost.title = "";
            newPost.text = "";
            newPost.file.url = "";
            newPost.file.name = "";
            isLoading.value = false;
        };

        return {
            isLoading,
            newPost,
            newFile,
            createPost,
            handleUpload,
        };
    },
});
</script>

<style lang="sass">
.q-scrollarea__content
    max-width: 100%

.form-container
    border: 1px solid
    border-color: $primary
    border-radius: 8px

@media (min-width: $breakpoint-sm)
    .form-container
        max-width: 70%
</style>