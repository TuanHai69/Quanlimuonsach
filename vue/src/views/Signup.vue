<template>
    <div class="page">
        <h4>Thêm Độc Giả</h4>
        <DocGiaForm :docgia="docgia" @add:docgia="addDocGia" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import DocGiaForm from "@/components/DocgiaForm.vue";
import DocGiaService from "@/services/docgia.service";

export default {
    components: {
        DocGiaForm,
    },
    data() {
        return {
            docgia: {
                holot: '',
                ten: '',
                ngaysinh: '',
                gioitinh: '',
                diachi: '',
                sodienthoai: '',
                email: '',
                matkhau: ''
            },
            message: "",
        };
    },
    methods: {
        async addDocGia(data) {
            try {
                // Get all docgia from the database
                const allDocGia = await DocGiaService.getAll();

                // Check if the email already exists in the database
                const existingDocGia = allDocGia.find(docgia => docgia.email === data.email);

                if (existingDocGia) {
                    this.message = "Email đã được đăng ký tài khoản.";
                } else {
                    await DocGiaService.create(data);
                    this.message = "Độc giả được thêm thành công.";
                }
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>
