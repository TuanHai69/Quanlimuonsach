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
        <a href="#" class="btn btn-primary mr-auto">Mượn</a>
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
}
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
