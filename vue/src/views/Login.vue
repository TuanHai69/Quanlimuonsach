<template>
    <div class="container">
        <hr>
        <div class="row bodylog">
            <div class="form-box">
                <div>
                    <form @submit.prevent="submitForm">
                        <h2 class="head-text">Đăng nhập</h2>
                        <div class="input-box">
                            <input type="text" id="email" v-model="email" placeholder="nhập vào email hoặc username">
                            <i class="fa-solid fa-user box-email-lock"></i>
                        </div>
                        <div class="input-box">
                            <input type="password" id="passwd" v-model="matkhau" placeholder="Mật khẩu">
                            <i class="fa-solid fa-lock box-email-lock"></i>
                        </div>
                        <div class="forget">
                            <label for=""><input type="checkbox">Remember Me /<a href="#">Quên mật khẩu</a></label>
                        </div>
                        <button class="Nutbam" type="submit">Đăng Nhập</button>
                        <div class="register">
                            <p>Tôi chưa có tài khoản <a href="#">Đăng ký</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import NhanVienService from "@/services/nhanvien.service";
import LocalStorageHelper from '@/services/local.service';

export default {
    data() {
        return {
            email: '',
            matkhau: '',
            errorMessage: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const docgia = await DocGiaService.login({ email: this.email, matkhau: this.matkhau });
                LocalStorageHelper.setItem('id', docgia._id);
                LocalStorageHelper.setItem('holot', docgia.holot);
                LocalStorageHelper.setItem('ten', docgia.ten);
                LocalStorageHelper.setItem('chucvu', docgia.chucvu || 'client');
                this.$router.push({ name: "sachview" });
            } catch (error) {
                // Nếu không tìm thấy độc giả, kiểm tra xem có phải là nhân viên không
                try {
                    const nhanvien = await NhanVienService.login({ email: this.email, matkhau: this.matkhau });
                    LocalStorageHelper.setItem('id', nhanvien._id);
                    LocalStorageHelper.setItem('hotennv', nhanvien.hotennv);
                    LocalStorageHelper.setItem('chucvu', nhanvien.chucvu);
                    console.log(LocalStorageHelper.getItem('chucvu'));
                    this.$router.push({ name: "sachview" });
                } catch (error) {
                    this.errorMessage = 'Không có tài khoản hoặc email / mật khẩu không hợp lệ';
                }
            }
        },
    },
};
</script>


<style scoped>
.bodylog {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    border-radius: 25px;
    background: url('https://th.bing.com/th/id/R.926142ec10e94218d44ab20f8f839208?rik=e8k348Ky3%2bdDIA&riu=http%3a%2f%2fpixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fSunset-Beaches-Backgrounds.jpg&ehk=50QURJIXrlDdCSaOUTLwBe%2flUpzQvPdOPk6HVps%2bvYc%3d&risl=1&pid=ImgRaw&r=0')no-repeat;
    background-position: center;
    background-size: cover;
}


.form-box {
    position: relative;
    width: 400px;
    height: 450px;
    background: transparent;
    border: 2px solid white;
    border-radius: 40px;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;

}

h2 {
    font-size: 2em;
    color: white;
    text-align: center;
}

.input-box {
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid white;
}

.form-box ::placeholder {
    color: white;
}

.input-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 35px 0 5px;
    color: white;
}

.input-box .box-email-lock {
    position: absolute;
    right: 8px;
    color: white;
    font-size: 20px;
    top: 20px;
}

.forget {
    margin: -15px 0 15px;
    font-size: 15px;
    color: white;
    display: flex;
    justify-content: left;
}

.forget label a {
    color: white;
    text-decoration: none;
}

.forget label a:hover {
    text-decoration: underline;
}

.Terms-Policies {
    margin: -15px 0 15px;
    font-size: 15px;
    color: white;
    display: flex;
    justify-content: left;
}

.Terms-Policies label a {
    color: white;
    text-decoration: none;
}

.Terms-Policies label a:hover {
    text-decoration: underline;
}

.Nutbam {
    position: relative;
    width: 80%;
    height: 40px;
    right: -10%;
    border-radius: 40px;
    background: white;
    border: none;
    font-size: 20px;
    font-weight: 600;
}

button:hover {
    font-size: 24px;
}

.register {
    font-size: 16px;
    color: white;
    text-align: center;
    margin: 25px 0 10px;
}

.register p a {
    text-decoration: none;
    color: white;
    font-weight: 600;
}

.register p a:hover {
    text-decoration: underline;
}
</style>