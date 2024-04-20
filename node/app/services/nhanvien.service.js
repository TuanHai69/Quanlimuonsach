const { ObjectId } = require("mongodb");

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection("nhanvien");    
    }

    extractNhanVienData(payload){
        const nhanvien = {
            hotennv: payload.hotennv,
            matkhau: payload.matkhau,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sodienthoai: payload.sodienthoai,
            email: payload.email,
        };

        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload){
        const nhanvien = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            nhanvien,
            { $set: nhanvien },
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }

    async findByName(hotennv) {
        return await this.find({
            hotennv: { $regex: new RegExp(hotennv), $options: "i" },
        });
    }
    
    async findById(id) {
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByEmailAndPassword(email, matkhau) {
        return await this.NhanVien.findOne({ email, matkhau });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.NhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

}

module.exports = NhanVienService;
