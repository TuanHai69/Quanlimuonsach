<template>
    <tr>
        <td>{{ nhanvien.hotennv }}</td>
        <td>{{ nhanvien.diachi }}</td>
        <td>{{ nhanvien.sodienthoai }}</td>
        <td>{{ nhanvien.email }}</td>
        <td>{{ nhanvien.chucvu }}</td>
        <td>
            <router-link :to="{ name: 'nhanvien.edit', params: { id: nhanvien._id }, }" v-if="1 === 1">
                <button class="btn btn-warning">
                    <i class="fas fa-edit"></i> Hiệu chỉnh
                </button>
            </router-link>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        nhanvien: { type: Object, required: true },
    },
};
</script>
