<template>
    <div v-if="theogioimuonsach" class="page">
        <h4>Hiệu chỉnh Theo Giới Mượn Sách</h4>
        <TheoGioiMuonSachForm :theogioimuonsach="theogioimuonsach" 
        @submit:theogioimuonsach="updateTheoGioiMuonSach"
        @delete:theogioimuonsach="deleteTheoGioiMuonSach"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import TheoGioiMuonSachForm from "@/components/TheoGioiMuonSachForm.vue";
import TheoGioiMuonSachService from "@/services/theogioimuonsach.service";

export default {
    components: {
        TheoGioiMuonSachForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            theogioimuonsach: null,
            message: "",
        };
    },
    methods: {
        async getTheoGioiMuonSach(id) {
            try {
                this.theogioimuonsach = await TheoGioiMuonSachService.get(id);
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
        async updateTheoGioiMuonSach(data) {
            try {
                await TheoGioiMuonSachService.update(this.theogioimuonsach._id, data);
                this.message = "Thông tin mượn sách được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTheoGioiMuonSach() {
            if (confirm("Bạn muốn xóa thông tin mượn sách này?")) {
                try {
                    await TheoGioiMuonSachService.delete(this.theogioimuonsach._id);
                    this.$router.push({ name: "theogioimuonsachview" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getTheoGioiMuonSach(this.id);
        this.message = "";
    },
};
</script>
