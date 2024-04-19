<template>
    <div class="page row">

        <div class="mt-3 col-md-12">
            <h4>
                Danh mục sách
                <i class="fas fa-book"></i>
            </h4>
            <hr>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddSach">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllSach">
                    <i class="fas fa-trash"></i> Xóa tất cả
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
                this.sachList = await SachService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveSach();
            this.activeIndex = -1;
            
        },

        async removeAllSach() {
            if (confirm("Bạn muốn xóa tất cả sách?")) {
                try {
                    await SachService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
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