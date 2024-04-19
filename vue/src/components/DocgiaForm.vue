<template>
    <Form @submit="submitDocGia" :validation-schema="docgiaFormSchema">
        <div class="form-group">
            <label for="holot">Họ lót</label>
            <Field name="holot" type="text" class="form-control" v-model="docgiaLocal.holot" />
            <ErrorMessage name="holot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ten">Tên</label>
            <Field name="ten" type="text" class="form-control" v-model="docgiaLocal.ten" />
            <ErrorMessage name="ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngaysinh">Ngày sinh</label>
            <Field name="ngaysinh" type="date" class="form-control" v-model="docgiaLocal.ngaysinh" />
            <ErrorMessage name="ngaysinh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="gioitinh">Giới tính</label>
            <Field name="gioitinh" type="text" class="form-control" v-model="docgiaLocal.gioitinh" />
            <ErrorMessage name="gioitinh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field name="diachi" type="text" class="form-control" v-model="docgiaLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="sodienthoai">Số điện thoại</label>
            <Field name="sodienthoai" type="text" class="form-control" v-model="docgiaLocal.sodienthoai" />
            <ErrorMessage name="sodienthoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="docgiaLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group" v-show="!docgiaLocal._id">
            <label for="matkhau">Mật khẩu</label>
            <Field name="matkhau" type="password" class="form-control" v-model="docgiaLocal.matkhau" />
            <ErrorMessage name="matkhau" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="confirmMatkhau">Xác nhận mật khẩu</label>
            <Field name="confirmMatkhau" type="password" class="form-control" v-model="docgiaLocal.confirmMatkhau" />
            <ErrorMessage name="confirmMatkhau" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="docgiaLocal._id" class="btn btn-primary">Lưu</button>
            <button v-if="!docgiaLocal._id" type="button" class="ml-2 btn btn-primary" @click="addDocGia">
                Thêm
            </button>
            <button v-if="docgiaLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteDocGia">
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
    emits: ["submit:docgia", "delete:docgia", "add:docgia"],
    props: {
        docgia: { type: Object, required: true }
    },
    data() {
        const docgiaFormSchema = yup.object().shape({
            holot: yup
                .string()
                .required("Bạn phải nhập họ lót")
                .min(2, "Họ lót phải ít nhất 2 ký tự.")
                .max(50, "Họ lót có nhiều nhất 50 ký tự."),
            ten: yup
                .string()
                .required("Bạn phải nhập tên")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            ngaysinh: yup
                .date()
                .required('Phải nhập vào ngày sinh')
                .min(new Date(1900, 0, 1), 'Ngày sinh phải sau năm 1900')
                .max(new Date(), 'Ngày sinh không thể là tương lai'),
            gioitinh: yup
                .string()
                .required('Phải nhập vào giới tính'),
            diachi: yup
                .string()
                .required('Phải nhập vào địa chỉ'),
            sodienthoai: yup
                .string()
                .required('Phải nhập vào số điện thoại'),
            email: yup
                .string()
                .email('Email không hợp lệ')
                .required('Phải nhập vào email'),
            matkhau: yup
                .string()
                .required('Phải nhập vào mật khẩu')
                .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
            confirmMatkhau: yup
                .string()
                .oneOf([yup.ref('matkhau'), null], 'Mật khẩu xác nhận không khớp')
                .required('Phải nhập lại mật khẩu để xác nhận'),
        });
        return {
            docgiaLocal: this.docgia,
            docgiaFormSchema,
        };
    },
    methods: {
        submitDocGia() {
            this.$emit("submit:docgia", this.docgiaLocal);
        },
        deleteDocGia() {
            this.$emit("delete:docgia", this.docgiaLocal.id);
        },
        addDocGia() {
            this.$emit("add:docgia", this.docgiaLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>