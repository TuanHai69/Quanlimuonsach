<template>
    <div class="page">
        <h4>Thêm Nhà Xuất Bản</h4>
        <NhaxuatbanForm :nhaxuatban="nhaxuatban" @add:nhaxuatban="addNhaxuatban" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import NhaxuatbanForm from "@/components/NhaxuatbanForm.vue";
import NhaxuatbanService from "@/services/nhaxuatban.service";

export default {
    components: {
        NhaxuatbanForm,
    },
    data() {
        return {
            nhaxuatban: {
                tennxb: '',
                diachi: '',
                sdt: '',
                email: ''
            },
            message: "",
        };
    },
    methods: {
        async addNhaxuatban(data) {
            try {
                await NhaxuatbanService.create(data);
                this.message = "Nhà xuất bản được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>