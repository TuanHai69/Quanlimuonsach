<script>
export default {
    props: {
        nhaxuatban: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <div class="d-flex flex-row flex-wrap">
        <div 
        class="p-2"
        v-for="(nxb, index) in nhaxuatban"
        :key="nxb._id"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)"
        >
            {{ nxb.tennxb }}
        </div>
    </div>
</template>
