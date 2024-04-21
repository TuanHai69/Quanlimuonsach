<template>
    <div class="page row">
        <div class="col-md-10">
            <select v-model="searchText" @change="filterByStatus">
                <option disabled value="">Vui lòng chọn trạng thái</option>
                <option value="">All</option>
                <option>Chờ xét duyệt</option>
                <option>Đã duyệt</option>
                <option>Trể hạn</option>
                <option>Đang mượn</option>
                <option>Đã trả</option>
            </select>
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                Danh sách Theo Giới Mượn Sách
                <i class="fas fa-book"></i>
            </h4>
            <hr>
            <TheoGioiMuonSachList v-if="filteredTheoGioiMuonSachCount > 0" :theogioimuonsach="filteredTheoGioiMuonSach"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có thông tin mượn sách nào.</p>
        </div>
    </div>
</template>

<script>
import TheoGioiMuonSachCard from "@/components/TheoGioiMuonSachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import TheoGioiMuonSachList from "@/components/TheoGioiMuonSachList.vue";
import TheoGioiMuonSachService from "@/services/theogioimuonsach.service";
import LocalStorageHelper from '@/services/local.service';

export default {
    components: {
        TheoGioiMuonSachCard,
        InputSearch,
        TheoGioiMuonSachList,
    },
    data() {
        return {
            theogioimuonsach: [],
            activeIndex: -1,
            searchText: "",
            chucvu: LocalStorageHelper.getItem('chucvu'),
            id: LocalStorageHelper.getItem('id'),
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        filteredTheoGioiMuonSach() {
            if (this.chucvu === 'client') {
                return this.theogioimuonsach.filter(item => item.madocgia === this.id);
            }
            if (!this.searchText) return this.theogioimuonsach;
            const lowerCaseSearchText = this.searchText.toLowerCase();
            return this.theogioimuonsach.filter(theogioimuonsach =>
                theogioimuonsach.trangthai.toLowerCase().includes(lowerCaseSearchText)
            );
        },

        filteredTheoGioiMuonSachCount() {
            return this.filteredTheoGioiMuonSach.length;
        },
    },
    methods: {
        async retrieveTheoGioiMuonSach() {
            try {
                this.theogioimuonsach = await TheoGioiMuonSachService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveTheoGioiMuonSach();
    },
};
</script>
