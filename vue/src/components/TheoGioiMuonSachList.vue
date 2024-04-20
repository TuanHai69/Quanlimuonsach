<template>
    <table class="table">
        <thead>
            <tr>
                <th>Tên đọc giả</th>
                <th>Tên sách</th>
                <th>Ngày mượn</th>
                <th>Ngày trả</th>
                <th>Trạng thái</th>
                <th>Đơn giá</th>
                <th v-if="chucvu === 'staff' || chucvu === 'admin'">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <TheoGioiMuonSachCard v-for="(item, index) in theogioimuonsach" :key="item._id" :theogioimuonsach="item"
                :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)" />
        </tbody>
    </table>
</template>

<script>
import TheoGioiMuonSachCard from "@/components/TheoGioiMuonSachCard.vue";
import LocalStorageHelper from '@/services/local.service';

export default {
    components: {
        TheoGioiMuonSachCard,
    },
    props: {
        theogioimuonsach: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    },
    data() {
        return {
            chucvu: LocalStorageHelper.getItem('chucvu')
        }
    },
};
</script>
