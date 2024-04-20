<template>
    <div v-if="nhanvien" class="page">
        <h4>Hiệu chỉnh Nhân viên</h4>
        <NhanVienForm :nhanvien="nhanvien" @submit:nhanvien="updateNhanVien" @delete:nhanvien="deleteNhanVien" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import NhanVienForm from "@/components/NhanvienForm.vue";
import NhanVienService from "@/services/nhanvien.service";
export default {
    components: {
        NhanVienForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            nhanvien: null,
            message: "",
        };
    },
    methods: {
        async getNhanVien(id) {
            try {
                this.nhanvien = await NhanVienService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateNhanVien(data) {
            try {
                await NhanVienService.update(this.nhanvien._id, data);
                this.message = "Nhân viên được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteNhanVien() {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await NhanVienService.delete(this.nhanvien._id);
                    this.$router.push({ name: "nhanvienbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getNhanVien(this.id);
        this.message = "";
    },
};
</script>