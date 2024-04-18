<template>
    <div class="container">
        <div class="row">
            <div 
            v-for="(sach, index) in sachList"
            :key="sach._id"
            class="col-md-4 p-2"
            >
                <SachCard 
                :sach="sach"
                :class="{ active: index === activeIndex }"
                @click="updateActiveIndex(index)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import SachCard from './SachCard.vue';

export default {
    components: {
        SachCard
    },
    props: {
        sachList: { type: Array, default: [] },
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

<style scoped>
.active {
  background-color: #f8f9fa;
}
</style>
