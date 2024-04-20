import createApiClient from "./api.service";

class TheoGioiMuonSachService {
    constructor(baseURL = "/api/theogioimuonsach") {
        this.api = createApiClient(baseURL);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async findmadocgia(madocgia) {
        return (await this.api.get(`/madocgia/${madocgia}`)).data;
    }
}

export default new TheoGioiMuonSachService();
