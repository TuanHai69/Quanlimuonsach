<template>
    <table class="table">
        <thead>
            <tr>
                <th>Tên NXB</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th>Email</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <NhaxuatbanCard 
            v-for="(nxb, index) in nhaxuatban"
            :key="nxb._id"
            :nhaxuatban="nxb"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
            />
        </tbody>
    </table>
</template>

<script>
import NhaxuatbanCard from "@/components/NhaxuatbanCard.vue";

export default {
    components: {
        NhaxuatbanCard,
    },
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
