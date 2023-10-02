<template>
    <!-- q-item clickable -->
    <q-item
        clickable
        :to="{ name: 'Case', params: { id: item.id } }"
        class="column q-pa-none q-mb-md case-card"
    >
        <q-item-section class="case-card__image">
            <!-- <q-responsive :ratio="16 / 9"> -->
            <q-img
                v-if="item.file && item.file.url"
                :src="item.file.url"
                spinner-color="primary"
            />
            <img v-else src="~assets/image.gif" />
            <!-- </q-responsive> -->
        </q-item-section>

        <q-item-section class="case-card__icon shadow-1">
            <q-btn
                :color="item.like ? 'primary' : 'primary'"
                :icon="item.like ? 'bookmark' : 'bookmark_border'"
                @click.stop.prevent="$emit('toggleLike')"
                size="md"
                round
                flat
            />
        </q-item-section>

        <q-item-section class="case-card__block-text q-ma-md">
            <q-item-label overline>{{
                item.date ? now(item.date) : "Время публикации"
            }}</q-item-label>
            <q-item-label>{{ item.title ? item.title : "..." }}</q-item-label>
            <q-item-label caption>
                {{ item.text ? item.text : "..." }}
            </q-item-label>
            <q-btn
                @click.stop.prevent="$emit('removePost')"
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
import { defineComponent } from "vue";
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

<style lang="sass">
.case-card
    &__image
        width: 100%
        max-height: 46cqw
        overflow: hidden
        border-radius: 8px

        @media (min-width: $breakpoint-sm)
            max-height: 28cqw

        > img
            object-fit: contain
            max-width: 50%
            height: 100%
            margin-left: auto
            margin-right: auto

    &__icon
        position: absolute
        top: 8px
        right: 8px
        // padding: 6px
        background: white
        border-radius: 50%

    &__block-text
        flex: none

    .q-item__section
        // margin-left: 0
</style>