<template>
  <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
    <img :src="sach.hinhanh" class="card-img-top border-bottom" alt="Book Image">
    <div class="card-body">
      <h5 class="card-title text-primary">{{ sach.tensach }}</h5>
      <p class="card-text">
        <strong>Giá:</strong> {{ sach.dongia }}<br>
        <strong>Số quyển:</strong> {{ sach.soquyen }}<br>
        <strong>Năm xuất bản:</strong> {{ sach.namxuatban }}<br>
        <strong>NXB:</strong> {{ sach.manxb }}<br>
        <strong>Tác giả:</strong> {{ sach.tacgia }}
      </p>
      <div class="d-flex justify-content-end">
        <button @click="muonSach" class="btn btn-primary mr-auto">Mượn</button>
        <router-link :to="{
          name: 'sach.edit',
          params: { id: sach._id },
        }" v-if="chucvu === 'staff' || chucvu === 'admin'">
          <button class="btn btn-warning">
            <i class="fas fa-edit"></i> Edit
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LocalStorageHelper from '@/services/local.service';
import TheogioimuonsachService from '@/services/theogioimuonsach.service';

export default {
  props: {
    sach: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chucvu: LocalStorageHelper.getItem('chucvu')
    }
  },
  methods: {
    async muonSach() {
      console.log(LocalStorageHelper.getItem('id'))
      console.log(this.sach._id)
      const theogms = {
        madocgia: LocalStorageHelper.getItem('id'),
        masach: this.sach._id,
        ngaymuon: new Date().toISOString().slice(0, 10), // ngày hiện tại
        ngaytra: new Date().toISOString().slice(0, 10), 
        trangthai: 'chờ xét duyệt',
        dongia: this.sach.dongia,
      };
      console.log(theogms)
      try {
        await TheogioimuonsachService.create(theogms);
        alert('Đã mượn sách thành công!');
      } catch (error) {
        console.error(error);
        alert('Cần đăng nhập để mượn sách!');
      }
    }
  }
}
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
