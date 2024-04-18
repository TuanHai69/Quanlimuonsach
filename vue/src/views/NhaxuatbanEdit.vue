<template>
    <div v-if="nhaxuatban" class="page">
        <h4>Hiệu chỉnh Nhà Xuất Bản</h4>
        <NhaxuatbanForm :nhaxuatban="nhaxuatban" 
        @submit:nhaxuatban="updateNhaxuatban" 
        @delete:nhaxuatban="deleteNhaxuatban" 
        />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            nhaxuatban: null,
            message: "",
        };
    },
    methods: {
        async getNhaxuatban(id) {
            try {
                this.nhaxuatban = await NhaxuatbanService.get(id);
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
        async updateNhaxuatban(data) {
            try {
                await NhaxuatbanService.update(this.nhaxuatban._id, data);
                this.message = "Nhà xuất bản được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteNhaxuatban() {
            if (confirm("Bạn muốn xóa Nhà Xuất Bản này?")) {
                try {
                    await NhaxuatbanService.delete(this.nhaxuatban._id);
                    this.$router.push({ name: "nhaxuatbanview" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getNhaxuatban(this.id);
        this.message = "";
    },
};
</script>
