<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                Danh sách Nhà Xuất Bản
                <i class="fas fa-book"></i>
            </h4>
            <div class="mt-3 row justify-content-end align-items-center" v-if="chucvu === 'staff' || chucvu === 'staff'">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddNhaxuatban">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
            <hr>
            <NhaxuatbanList v-if="filteredNhaxuatbanCount > 0" :nhaxuatban="filteredNhaxuatban"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có nhà xuất bản nào.</p>


        </div>
    </div>
</template>

<script>
import NhaxuatbanCard from "@/components/NhaxuatbanCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import NhaxuatbanList from "@/components/NhaxuatbanList.vue";
import NhaxuatbanService from "@/services/nhaxuatban.service";
import LocalStorageHelper from '@/services/local.service';

export default {
    components: {
        NhaxuatbanCard,
        InputSearch,
        NhaxuatbanList,
    },
    data() {
        return {
            nhaxuatban: [],
            activeIndex: -1,
            searchText: "",
            chucvu: LocalStorageHelper.getItem('chucvu'),
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        nhaxuatbanStrings() {
            return this.nhaxuatban.map((nxb) => {
                const { tennxb, email, diachi, sdt } = nxb;
                return [tennxb, email, diachi, sdt].join("");
            });
        },
        filteredNhaxuatban() {
            if (!this.searchText) return this.nhaxuatban;
            return this.nhaxuatban.filter((_nxb, index) =>
                this.nhaxuatbanStrings[index].includes(this.searchText)
            );
        },

        filteredNhaxuatbanCount() {
            return this.filteredNhaxuatban.length;
        },
    },
    methods: {
        async retrieveNhaxuatban() {
            try {
                this.nhaxuatban = await NhaxuatbanService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveNhaxuatban();
            this.activeIndex = -1;
        },

        goToAddNhaxuatban() {
            this.$router.push({ name: "nhaxuatban.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>