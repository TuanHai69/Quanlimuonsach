<template>
    <!-- console.log(LocalStorageHelper.getItem('id')); -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="#" class="navbar-brand" @click="checkLoginStatus">Ứng dụng quản lý mượn sách </a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'sachview' }" class="nav-link">
                    Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'nhaxuatbanview' }" class="nav-link">
                    Nhà xuất bản
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="chucvu === 'staff' || chucvu === 'admin' || chucvu === 'client'">
                <router-link :to="{ name: 'theogioimuonsachview' }" class="nav-link">
                    Hàng đợi mượn Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="chucvu === 'staff' || chucvu === 'admin'">
                <router-link :to="{ name: 'nhanvienview' }" class="nav-link">
                    Nhân viên
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <!-- Nếu người dùng đã đăng nhập (localStorage có id) -->
            <li class="nav-item" v-if="isLoggedIn && chucvu === 'client'">
                <router-link :to="{ name: 'docgia.edit', params: { id: userId } }" class="nav-link">
                    Tài khoản
                    <i class="fas fa-user"></i>
                </router-link>
            </li>

            <li class="nav-item" v-if="isLoggedIn">
                <a href="#" class="nav-link" @click="logout">
                    Logout
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </li>

            <!-- Nếu người dùng chưa đăng nhập -->
            <li class="nav-item" v-if="!isLoggedIn">
                <router-link :to="{ name: 'docgia.signup' }" class="nav-link">
                    Signup
                    <i class="fas fa-sign-in-alt"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
                <router-link :to="{ name: 'login' }" class="nav-link">
                    Login
                    <i class="fas fa-sign-in-alt"></i>
                </router-link>
            </li>

        </div>

    </nav>
</template>


<script>
import LocalStorageHelper from '@/services/local.service';
export default {
    data() {
        return {
            isLoggedIn: false,
            userId: LocalStorageHelper.getItem('id'),
            chucvu: ''
        };
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        checkLoginStatus() {
            if (LocalStorageHelper.getItem('id')) {
                this.isLoggedIn = true;
                this.chucvu = LocalStorageHelper.getItem('chucvu'); // Đọc lại giá trị của chucvu
            } else {
                this.isLoggedIn = false;
                this.chucvu = ''; // Đặt lại giá trị của chucvu
            }
        },
        logout() {
            LocalStorageHelper.clear();
            this.isLoggedIn = false;
            this.$router.push({ name: "sachview" });
        },
    },
};
</script>

