<template>
    <Form @submit="submitSach" :validation-schema="sachFormSchema">
        <div class="form-group">
            <label for="tensach">Tên sách</label>
            <Field name="tensach" type="text" class="form-control" v-model="sachLocal.tensach" />
            <ErrorMessage name="tensach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dongia">Đơn giá</label>
            <Field name="dongia" type="number" class="form-control" v-model="sachLocal.dongia" />
            <ErrorMessage name="dongia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soquyen">Số quyển</label>
            <Field name="soquyen" type="number" class="form-control" v-model="sachLocal.soquyen" />
            <ErrorMessage name="soquyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="hinhanh">URL Hình ảnh</label>
            <Field name="hinhanh" type="text" class="form-control" v-model="sachLocal.hinhanh" />
            <ErrorMessage name="hinhanh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="namxuatban">Năm xuất bản</label>
            <Field name="namxuatban" type="date" class="form-control" v-model="sachLocal.namxuatban" />
            <ErrorMessage name="namxuatban" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="manxb">Nhà xuất bản</label>
            <Field name="manxb" as="select" class="form-control" v-model="sachLocal.manxb">
                <option v-for="nxb in nxbList" :value="nxb._id" :key="nxb._id">
                    {{ nxb.tennxb }}
                </option>
            </Field>
            <ErrorMessage name="manxb" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="tacgia">Tác giả</label>
            <Field name="tacgia" type="text" class="form-control" v-model="sachLocal.tacgia" />
            <ErrorMessage name="tacgia" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="sachLocal._id" class="btn btn-primary">Lưu</button>
            <button v-if="!sachLocal._id" type="button" class="ml-2 btn btn-primary" @click="addSach">
                Thêm
            </button>
            <button v-if="sachLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteSach">
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NhaXuatBanService from "@/services/nhaxuatban.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:sach", "delete:sach", "add:sach"],
    props: {
        sach: { type: Object, required: true }
    },
    data() {
        const sachFormSchema = yup.object().shape({
            tensach: yup
                .string()
                .required("Bạn phải nhập tên sách vào")
                .min(2, "Tên sách phải ít nhất 2 ký tự.")
                .max(50, "Tên sách có nhiều nhất 50 ký tự."),
            dongia: yup
                .number()
                .transform(value => (isNaN(value) ? undefined : value))
                .required("Phải nhập vào đơn giá mượn sách")
                .min(0, "Đơn giá phải lớn hơn hoặc bằng 0"),
            soquyen: yup
                .number()
                .transform(value => (isNaN(value) ? undefined : value))
                .required("Bạn phải nhập vào số lượng sách có thể mượn")
                .min(0, "Số quyển phải lớn hơn hoặc bằng 0."),
            namxuatban: yup
                .number()
                .required("Năm xuất bản phù hợp")
                .min(0, "Năm xuất bản phải lớn hơn hoặc bằng 0."),
            tacgia: yup
                .string()
                .required("Bạn phải nhập tên tác giả")
                .min(2, "Hãy nhập đầy đủ tên hoặc nick name tác giả ")
                .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
            namxuatban: yup
                .date()
                .required('Phải nhập vào năm xuất bản')
                .min(new Date(1800, 0, 1), 'Năm xuất bản phải sau năm 1800')
                .max(new Date(), 'Năm xuất bản không thể là tương lai'),
            hinhanh: yup
                .string()
                .required('Phải nhập vào URL hình ảnh')

        });
        return {
            sachLocal: this.sach,
            sachFormSchema,
            nxbList: [],
        };
    },
    async created() {  // Sử dụng hook 'created' hoặc 'mounted'
        this.nxbList = await NhaXuatBanService.getAll();
    },
    methods: {
        submitSach() {
            this.$emit("submit:sach", this.sachLocal);
        },
        deleteSach() {
            this.$emit("delete:sach", this.sachLocal.id);
        },
        addSach() {
            this.$emit("add:sach", this.sachLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>