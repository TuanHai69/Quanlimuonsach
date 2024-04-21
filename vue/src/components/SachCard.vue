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
import sachService from '@/services/sach.service';

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
      const madocgia = LocalStorageHelper.getItem('id');
      const masach = this.sach._id;
      const ngaymuon = new Date().toISOString().slice(0, 10); // ngày hiện tại

      // Check if the book has already been borrowed by the same user on the same day
      const existingBorrow = await TheogioimuonsachService.findtrung(madocgia, masach, ngaymuon);
      if (existingBorrow.length > 0) {
        alert('Bạn đã mượn cuốn sách này trong ngày hôm nay. Vui lòng chọn một cuốn sách khác.');
        return;
      }

      const theogms = {
        madocgia,
        masach,
        ngaymuon,
        ngaytra: ngaymuon,
        trangthai: 'chờ xét duyệt',
        dongia: this.sach.dongia,
      };

      try {
        await TheogioimuonsachService.create(theogms);
        // Update the book quantity after a successful borrow
        if (this.sach.soquyen > 0) {
          this.sach.soquyen -= 1;
          await sachService.update(this.sach._id, { soquyen: this.sach.soquyen });
        }
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
