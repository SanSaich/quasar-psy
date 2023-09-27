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

                <!-- <template v-if="newPost.title || newPost.text || newFile">
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
                </template> -->

                <div class="q-gutter-sm q-my-md">
                    <q-editor
                        v-model="newContent"
                        min-height="5rem"
                        :dense="$q.screen.lt.md"
                        :toolbar="[
                            [
                                {
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    list: 'only-icons',
                                    options: [
                                        'left',
                                        'center',
                                        'right',
                                        'justify',
                                    ],
                                },
                            ],
                            [
                                'bold',
                                'italic',
                                'strike',
                                'underline',
                                'subscript',
                                'superscript',
                            ],
                            ['token', 'hr', 'link', 'custom_btn'],
                            [
                                {
                                    label: $q.lang.editor.formatting,
                                    icon: $q.iconSet.editor.formatting,
                                    list: 'no-icons',
                                    options: [
                                        'p',
                                        'h1',
                                        'h2',
                                        'h3',
                                        'h4',
                                        'h5',
                                        'h6',
                                        'code',
                                    ],
                                },
                                {
                                    label: $q.lang.editor.fontSize,
                                    icon: $q.iconSet.editor.fontSize,
                                    fixedLabel: true,
                                    fixedIcon: true,
                                    list: 'no-icons',
                                    options: [
                                        'size-1',
                                        'size-2',
                                        'size-3',
                                        'size-4',
                                        'size-5',
                                        'size-6',
                                        'size-7',
                                    ],
                                },
                                {
                                    label: $q.lang.editor.defaultFont,
                                    icon: $q.iconSet.editor.font,
                                    fixedIcon: true,
                                    list: 'no-icons',
                                    options: [
                                        'default_font',
                                        'arial',
                                        'arial_black',
                                        'comic_sans',
                                        'courier_new',
                                        'impact',
                                        'lucida_grande',
                                        'times_new_roman',
                                        'verdana',
                                    ],
                                },
                                'removeFormat',
                            ],
                            [
                                'quote',
                                'unordered',
                                'ordered',
                                'outdent',
                                'indent',
                            ],

                            ['undo', 'redo'],
                            ['viewsource'],
                        ]"
                        :fonts="{
                            arial: 'Arial',
                            arial_black: 'Arial Black',
                            comic_sans: 'Comic Sans MS',
                            courier_new: 'Courier New',
                            impact: 'Impact',
                            lucida_grande: 'Lucida Grande',
                            times_new_roman: 'Times New Roman',
                            verdana: 'Verdana',
                        }"
                    />

                    <q-card flat bordered>
                        <q-card-section>
                            <pre style="white-space: pre-line">
                                {{ newContent }}
                            </pre>
                        </q-card-section>
                    </q-card>

                    <!-- <q-card flat bordered class="q-pa-sm" min-height="1rem">
                        <div v-html="newContent" />
                    </q-card> -->
                </div>
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
// import CaseBig from "../components/cases/CaseBig.vue";

export default defineComponent({
    name: "PageAbout",
    components: {
        // CaseBig,
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
        let newContent = ref("");

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
            newContent,
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