<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                Danh sách Nhân viên
                <i class="fas fa-user"></i>
            </h4>
            <div class="mt-3 row justify-content-end align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddNhanVien">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
            <hr>
            <NhanVienList v-if="filteredNhanVienCount > 0" :nhanvien="filteredNhanVien"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có nhân viên nào.</p>
        </div>
    </div>
</template>

<script>
import NhanVienCard from "@/components/NhanvienCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import NhanVienList from "@/components/NhanvienList.vue";
import NhanVienService from "@/services/nhanvien.service";

export default {
    components: {
        NhanVienCard,
        InputSearch,
        NhanVienList,
    },
    data() {
        return {
            nhanvien: [],
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
        nhanVienStrings() {
            return this.nhanvien.map((nv) => {
                const { hotennv, email, diachi, sodienthoai } = nv;
                return [hotennv, email, diachi, sodienthoai].join("");
            });
        },
        filteredNhanVien() {
            if (!this.searchText) return this.nhanvien;
            return this.nhanvien.filter((_nv, index) =>
                this.nhanVienStrings[index].includes(this.searchText)
            );
        },

        filteredNhanVienCount() {
            return this.filteredNhanVien.length;
        },
    },
    methods: {
        async retrieveNhanVien() {
            try {
                this.nhanvien = await NhanVienService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveNhanVien();
            this.activeIndex = -1;
        },

        goToAddNhanVien() {
            this.$router.push({ name: "nhanvien.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
