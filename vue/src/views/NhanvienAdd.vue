<template>
    <div class="page">
        <h4>Thêm Nhân viên</h4>
        <NhanVienForm :nhanvien="nhanVien" @add:nhanvien="addNhanVien" />
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
    data() {
        return {
            nhanVien: {
                hotennv: '',
                matkhau: '',
                chucvu: '',
                diachi: '',
                sodienthoai: '',
                email: ''
            },
            message: "",
        };
    },
    methods: {
        async addNhanVien(data) {
            try {
                await NhanVienService.create(data);
                this.message = "Nhân viên được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
