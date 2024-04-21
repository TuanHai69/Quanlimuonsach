import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/sach",
        name: "sachview",
        component: () => import("@/views/SachView.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/sach/add",
        name: "sach.add",
        component: () => import("@/views/SachAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/sach/:id",
        name: "sach.edit",
        component: () => import("@/views/SachEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhaxuatban",
        name: "nhaxuatbanview",
        component: () => import("@/views/NhaxuatbanView.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhaxuatban/add",
        name: "nhaxuatban.add",
        component: () => import("@/views/NhaxuatbanAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhaxuatban/:id",
        name: "nhaxuatban.edit",
        component: () => import("@/views/NhaxuatbanEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/docgia",
        name: "docgia.signup",
        component: () => import("@/views/Signup.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/docgia/:id",
        name: "docgia.edit",
        component: () => import("@/views/DocgiaEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/docgia/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhanvien",
        name: "nhanvienview",
        component: () => import("@/views/NhanvienView.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhanvien/add",
        name: "nhanvien.add",
        component: () => import("@/views/NhanvienAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhanvien/:id",
        name: "nhanvien.edit",
        component: () => import("@/views/NhanvienEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/theogioimuonsach",
        name: "theogioimuonsachview",
        component: () => import("@/views/TheoGioiMuonSachView.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/theogioimuonsach/:id",
        name: "theogioimuonsach.edit",
        component: () => import("@/views/TheoGioiMuonSachEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;