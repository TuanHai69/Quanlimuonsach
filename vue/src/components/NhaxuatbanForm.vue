<template>
    <Form @submit="submitNhaxuatban" :validation-schema="nhaxuatbanFormSchema">
        <div class="form-group">
            <label for="tennxb">Tên NXB</label>
            <Field name="tennxb" type="text" class="form-control" v-model="nhaxuatbanLocal.tennxb" />
            <ErrorMessage name="tennxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="nhaxuatbanLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field name="diachi" type="text" class="form-control" v-model="nhaxuatbanLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="sdt">Điện thoại</label>
            <Field name="sdt" type="tel" class="form-control" v-model="nhaxuatbanLocal.sdt" />
            <ErrorMessage name="sdt" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="nhaxuatbanLocal._id" class="btn btn-primary">Lưu</button>
            <button v-if="!nhaxuatbanLocal._id" type="button" class="ml-2 btn btn-primary" @click="addNhaxuatban">
                Thêm
            </button>
            <button v-if="nhaxuatbanLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNhaxuatban">
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
    emits: ["submit:nhaxuatban", "delete:nhaxuatban", "add:nhaxuatban"],
    props: {
        nhaxuatban: { type: Object, required: true }
    },
    data() {
        const nhaxuatbanFormSchema = yup.object().shape({
            tennxb: yup
                .string()
                .required("Phải nhập vào tên nhà xuất bản")
                .min(2, "Tên nhà xuất bản phải ít nhất 2 ký tự.")
                .max(50, "Tên nhà xuất bản có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            sdt: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            nhaxuatbanLocal: this.nhaxuatban,
            nhaxuatbanFormSchema,
        };
    },
    methods: {
        submitNhaxuatban() {
            this.$emit("submit:nhaxuatban", this.nhaxuatbanLocal);
        },
        deleteNhaxuatban() {
            this.$emit("delete:nhaxuatban", this.nhaxuatbanLocal.id);
        },
        addNhaxuatban() {
            this.$emit("add:nhaxuatban", this.nhaxuatbanLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>