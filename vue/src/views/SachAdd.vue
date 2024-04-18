<template>
    <div class="page">
        <h4>Thêm Sách</h4>
        <SachForm :sach="sach" @add:sach="addSach" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import SachForm from "@/components/SachForm.vue";
import SachService from "@/services/sach.service";

export default {
    components: {
        SachForm,
    },
    data() {
        return {
            sach: {
                tensach: '',
                dongia: '',
                soquyen: '',
                namxuatban: '',
                manxb: '',
                tacgia: '',
                hinhanh: ''
            },
            message: "",
        };
    },
    methods: {
        async addSach(data) {
            try {
                await SachService.create(data);
                this.message = "Sách được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
