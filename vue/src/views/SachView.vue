<template>
    <div class="page row">

        <div class="mt-3 col-md-12">
            <h4>
                Danh mục sách
                <i class="fas fa-book"></i>
            </h4>
            <hr>
            <div class="mt-3 row justify-content-end align-items-center" v-if="chucvu === 'staff' || chucvu === 'admin'" >
                <button class="btn btn-sm btn-success" @click="goToAddSach">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
            <hr>
            <div class="col-md-10">
                <InputSearch v-model="searchText" />
            </div>
            <hr>
            <div class="container">
                <SachList v-if="filteredSachCount > 0" :sachList="filteredSach" v-model:activeIndex="activeIndex" />
                <p v-else>Không có sách nào.</p>
            </div>
            <hr>
        </div>

    </div>
</template>

<script>
import SachCard from "@/components/SachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import SachList from "@/components/SachList.vue";
import SachService from "@/services/sach.service";
import NhaXuatBanService from "@/services/nhaxuatban.service";
import LocalStorageHelper from '@/services/local.service';

export default {
    components: {
        SachCard,
        InputSearch,
        SachList,
    },
    data() {
        return {
            sachList: [],
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

        filteredSach() {
            if (!this.searchText) return this.sachList;
            const lowerCaseSearchText = this.searchText.toLowerCase();
            return this.sachList.filter(sach =>
                sach.tensach.toLowerCase().includes(lowerCaseSearchText) ||
                sach.dongia.toString().includes(lowerCaseSearchText) ||
                sach.namxuatban.toString().includes(lowerCaseSearchText) ||
                sach.tacgia.toLowerCase().includes(lowerCaseSearchText)
            );
        },
        filteredSachCount() {
            return this.filteredSach.length;
        },
    },
    methods: {
        async retrieveSach() {
            try {
                const sachList = await SachService.getAll();
                // Fetch nhà xuất bản cho mỗi sách
                for (let sach of sachList) {
                    if (sach.manxb) {
                        const nxb = await NhaXuatBanService.get(sach.manxb);
                        // Thay thế 'nxb' bằng tên của nhà xuất bản
                        sach.manxb = nxb ? nxb.tennxb : 'Không có';
                    } else {
                        sach.manxb = 'Không có';
                    }
                }
                this.sachList = sachList;
                console.log(this.sachList)

            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveSach();
            this.activeIndex = -1;

        },


        goToAddSach() {
            this.$router.push({ name: "sach.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>