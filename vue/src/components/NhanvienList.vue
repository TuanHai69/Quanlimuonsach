<template>
    <table class="table">
        <thead>
            <tr>
                <th>Họ tên NV</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <NhanVienCard 
            v-for="(nhanv, index) in nhanvien"
            :key="nhanv._id"
            :nhanvien="nhanv"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
            />
        </tbody>
    </table>
</template>

<script>
import NhanVienCard from "@/components/NhanvienCard.vue";

export default {
    components: {
        NhanVienCard,
    },
    props: {
        nhanvien: { type: Array, default: [] },
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