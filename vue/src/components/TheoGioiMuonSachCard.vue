<template>
    <tr>
        <td>{{ docgiaName }}</td>
        <td>{{ theogioimuonsach.masach }}</td>
        <td>{{ theogioimuonsach.ngaymuon }}</td>
        <td>{{ theogioimuonsach.ngaytra }}</td>
        <td>{{ theogioimuonsach.trangthai }}</td>
        <td>{{ theogioimuonsach.dongia }}</td>
        <td>
            <router-link :to="{ name: 'theogioimuonsach.edit', params: { id: theogioimuonsach._id }, }"
                v-if="chucvu === 'staff' || chucvu === 'admin'">
                <button class="btn btn-warning">
                    <i class="fas fa-edit"></i> Hiệu chỉnh
                </button>
            </router-link>
        </td>
    </tr>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import NhanVienService from "@/services/nhanvien.service";
import LocalStorageHelper from '@/services/local.service';

export default {
    props: {
        theogioimuonsach: { type: Object, required: true },
    },
    data() {
        return {
            chucvu: LocalStorageHelper.getItem('chucvu'),
            docgiaName: '',
        }
    },
    methods: {
        async getDocGiaName(id) {
            try {
                const docgia = await DocGiaService.get(id);
                if (docgia) {
                    return docgia.holot + ' ' + docgia.ten;
                } else {
                    const nhanvien = await NhanVienService.get(id);
                    if (nhanvien) {
                        return nhanvien.hotennv;
                    }
                }
            } catch (error) {
                console.log(error);
            }
            return 'Không xác định';
        },
    },
    async created() {
        this.docgiaName = await this.getDocGiaName(this.theogioimuonsach.madocgia);
        console.log(this.docgiaName)
    },
};
</script>
