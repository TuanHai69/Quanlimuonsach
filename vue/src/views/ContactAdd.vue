<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :contact="contact" @add:contact="addContact" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            contact: {
                name: '',
                email: '',
                address: '',
                phone: '',
                favorite: false
            },
            message: "",
        };
    },
    methods: {
        async addContact(data) {
            try {
                await ContactService.create(data);
                this.message = "Liên hệ được Thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
