<template>
    <Form @submit="submitNhanVien" :validation-schema="nhanVienFormSchema">
        <div class="form-group">
            <label for="hotennv">Họ tên</label>
            <Field name="hotennv" type="text" class="form-control" v-model="nhanVienLocal.hotennv" />
            <ErrorMessage name="hotennv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="nhanVienLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field name="diachi" type="text" class="form-control" v-model="nhanVienLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="sodienthoai">Điện thoại</label>
            <Field name="sodienthoai" type="tel" class="form-control" v-model="nhanVienLocal.sodienthoai" />
            <ErrorMessage name="sodienthoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="chucvu">Chức vụ</label>
            <Field name="chucvu" as="select" class="form-control" v-model="nhanVienLocal.chucvu">
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
            </Field>
            <ErrorMessage name="chucvu" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="nhanVienLocal._id" class="btn btn-primary">Lưu</button>
            <button v-if="!nhanVienLocal._id" type="button" class="ml-2 btn btn-primary" @click="addNhanVien">
                Thêm
            </button>
            <button v-if="nhanVienLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNhanVien">
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
    emits: ["submit:nhanvien", "delete:nhanvien", "add:nhanvien"],
    props: {
        nhanvien: { type: Object, required: true }
    },
    data() {
        const nhanVienFormSchema = yup.object().shape({
            hotennv: yup
                .string()
                .required("Họ tên phải có giá trị.")
                .min(2, "Họ tên phải ít nhất 2 ký tự.")
                .max(50, "Họ tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            sodienthoai: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            chucvu: yup
                .string()
                .required("Chức vụ phải có giá trị.")
                .oneOf(["staff", "admin"], "Chức vụ phải là Staff hoặc Admin."),
        });
        return {
            nhanVienLocal: this.nhanvien,
            nhanVienFormSchema,
        };
    },
    methods: {
        submitNhanVien() {
            this.$emit("submit:nhanvien", this.nhanVienLocal);
        },
        deleteNhanVien() {
            this.$emit("delete:nhanvien", this.nhanVienLocal.id);
        },
        addNhanVien() {
            this.$emit("add:nhanvien", this.nhanVienLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>