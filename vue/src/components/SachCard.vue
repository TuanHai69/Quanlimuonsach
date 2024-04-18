<template>
  <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
    <img :src="sach.hinhanh" class="card-img-top border-bottom" alt="Book Image">
    <div class="card-body">
      <h5 class="card-title text-primary">{{ sach.tensach }}</h5>
      <p class="card-text">
        <strong>Giá:</strong> {{ sach.dongia }}<br>
        <strong>Số quyển:</strong> {{ sach.soquyen }}<br>
        <strong>Năm xuất bản:</strong> {{ sach.namxuatban }}<br>
        <!-- <strong>Mã NXB:</strong> {{ sach.manxb }}<br> -->
        <strong>Tác giả:</strong> {{ sach.tacgia }}
      </p>
      <a href="#" class="btn btn-primary">Xem chi tiết</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sach: {
      type: Object,
      required: true
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
