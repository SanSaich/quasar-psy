<template>
    <!-- q-item clickable -->
    <q-item class="case-card column q-pa-none q-mb-md posts-list__post">
        <q-item-section class="case-card__image">
            <img v-if="item.file && item.file.url" :src="item.file.url" />
            <img v-else src="https://cdn.quasar.dev/img/mountains.jpg" />
        </q-item-section>

        <q-item-section class="case-card__icon shadow-1">
            <q-btn
                :color="item.like ? 'primary' : 'primary'"
                :icon="item.like ? 'bookmark' : 'bookmark_border'"
                @click.stop="$emit('toggleLike')"
                size="md"
                round
                flat
            />
        </q-item-section>

        <q-item-section class="case-card__block-text">
            <q-item-label overline>{{ now(item.date) }}</q-item-label>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>
                {{ item.text }}
            </q-item-label>
            <q-btn
                @click.stop="$emit('removePost')"
                color="grey"
                icon="fas fa-trash"
                size="xs"
                round
                flat
                class="absolute-bottom-right q-mb-sm"
            />
        </q-item-section>
        <q-separator />
    </q-item>
</template>

<script>
import { defineComponent, computed } from "vue";
import { formatDistance } from "date-fns";

export default defineComponent({
    name: "CaseBig",
    props: {
        item: {
            type: Object,
            required: false,
        },
    },
    setup() {
        const now = (val) => {
            return formatDistance(val, new Date());
        };

        return {
            now,
        };
    },
});
</script>

<style>
</style>