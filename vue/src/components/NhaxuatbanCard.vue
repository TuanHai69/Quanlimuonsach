<template>
    <tr>
        <td>{{ nhaxuatban.tennxb }}</td>
        <td>{{ nhaxuatban.diachi }}</td>
        <td>{{ nhaxuatban.sdt }}</td>
        <td>{{ nhaxuatban.email }}</td>
        <td>
            <router-link :to="{ name: 'nhaxuatban.edit', params: { id: nhaxuatban._id }, }"
                v-if="chucvu === 'staff' || chucvu === 'admin'">
                <button class="btn btn-warning">
                    <i class="fas fa-edit"></i> Hiệu chỉnh
                </button>
            </router-link>
        </td>
    </tr>
</template>

<script>
import LocalStorageHelper from '@/services/local.service';

export default {
    props: {
        nhaxuatban: { type: Object, required: true },
    },
    data() {
        return {
            chucvu: LocalStorageHelper.getItem('chucvu')
        }
    },
};
</script>
