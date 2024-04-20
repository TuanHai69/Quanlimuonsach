<template>
    <Form @submit="submitTheoGioiMuonSach" :validation-schema="theogioimuonsachFormSchema">
        <div class="form-group">
            <label for="madocgia">Mã độc giả</label>
            <Field name="madocgia" type="text" class="form-control" v-model="theogioimuonsachLocal.madocgia" disabled />
            <ErrorMessage name="madocgia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="masach">Mã sách</label>
            <Field name="masach" type="text" class="form-control" v-model="theogioimuonsachLocal.masach" disabled />
            <ErrorMessage name="masach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngaymuon">Ngày mượn</label>
            <Field name="ngaymuon" type="date" class="form-control" v-model="theogioimuonsachLocal.ngaymuon" />
            <ErrorMessage name="ngaymuon" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngaytra">Ngày trả</label>
            <Field name="ngaytra" type="date" class="form-control" v-model="theogioimuonsachLocal.ngaytra" />
            <ErrorMessage name="ngaytra" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="trangthai">Trạng thái</label>
            <Field as="select" name="trangthai" class="form-control" v-model="theogioimuonsachLocal.trangthai">
                <option value="chờ xét duyệt">Chờ xét duyệt</option>
                <option value="đã duyệt">Đã duyệt</option>
                <option value="đang mượn">Đang mượn</option>
                <option value="trể hạn">Trể hạn</option>
                <option value="trể hạn">Đã trả</option>
            </Field>
            <ErrorMessage name="trangthai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dongia">Đơn giá</label>
            <Field name="dongia" type="number" class="form-control" v-model="theogioimuonsachLocal.dongia" />
            <ErrorMessage name="dongia" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="theogioimuonsachLocal._id" class="btn btn-primary">Lưu</button>
            <button v-if="theogioimuonsachLocal._id" type="button" class="ml-2 btn btn-danger"
                @click="deleteTheoGioiMuonSach">
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:theogioimuonsach", "delete:theogioimuonsach"],
    props: {
        theogioimuonsach: { type: Object, required: true }
    },
    data() {
        const theogioimuonsachFormSchema = yup.object().shape({
            madocgia: yup
                .string()
                .required("Phải nhập vào mã độc giả")
                .min(2, "Mã độc giả phải ít nhất 2 ký tự.")
                .max(50, "Mã độc giả có nhiều nhất 50 ký tự."),
            masach: yup
                .string()
                .required("Phải nhập vào mã sách")
                .min(2, "Mã sách phải ít nhất 2 ký tự.")
                .max(50, "Mã sách có nhiều nhất 50 ký tự."),
            ngaymuon: yup
                .date()
                .required("Phải nhập vào ngày mượn"),
            ngaytra: yup
                .date()
                .required("Phải nhập vào ngày trả"),
            trangthai: yup.string().max(100, "Trạng thái tối đa 100 ký tự."),
            dongia: yup
                .number()
                .required("Phải nhập vào đơn giá")
                .positive("Đơn giá phải là một số dương"),
        });
        return {
            theogioimuonsachLocal: this.theogioimuonsach,
            theogioimuonsachFormSchema,
        };
    },
    methods: {
        submitTheoGioiMuonSach() {
            this.$emit("submit:theogioimuonsach", this.theogioimuonsachLocal);
        },
        deleteTheoGioiMuonSach() {
            this.$emit("delete:theogioimuonsach", this.theogioimuonsachLocal._id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
