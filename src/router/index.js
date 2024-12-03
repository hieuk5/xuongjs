import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/Admin/HomePage.vue"),
      meta: { requiredAuth: true, requiredAdmin: true },
      children: [
        //http://localhost:5173/admin
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/Admin/Dashboard.vue"),
        },
        //http://localhost:5173/admin/account
        {
          path: "account",
          name: "account",
          component: () => import("../views/Admin/Account/Account.vue"),
        },
        //http://localhost:5173/admin/add-account
        {
          path: "add-account",
          name: "addAccount",
          component: () => import("../views/Admin/Account/AddAccount.vue"),
        },
        //http://localhost:5173/admin/update-account
        {
          path: "update-account/:idAccount",
          name: "updateAccount",
          component: () => import("../views/Admin/Account/UpdateAccount.vue"),
        },
        //http://localhost:5173/admin/category

        {
          path: "category",
          name: "category",
          component: () => import("../views/Admin/Category/Categoty.vue"),
        },
        //http://localhost:5173/admin/add-category

        {
          path: "add-category",
          name: "addCategory",
          component: () => import("../views/Admin/Category/AddCategory.vue"),
        },
        //http://localhost:5173/admin/update-category

        {
          path: "update-category/:idCategory",
          name: "updateCategory",
          component: () => import("../views/Admin/Category/UpdateCategory.vue"),
        },
        //http://localhost:5173/admin/product

        {
          path: "product",
          name: "product",
          component: () => import("../views/Admin/Product/Product.vue"),
        },
        //http://localhost:5173/admin/add-product

        {
          path: "add-product",
          name: "addProduct",
          component: () => import("../views/Admin/Product/AddProduct.vue"),
        },
        //http://localhost:5173/admin/update-product

        {
          path: "update-product/:idProduct",
          name: "updateProduct",
          component: () => import("../views/Admin/Product/UpdateProduct.vue"),
        },
        //http://localhost:5173/admin/order

        {
          path: "order",
          name: "order",
          component: () => import("../views/Admin/Order.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "user",
      component: () => import("../views/User/HomePage.vue"),
      children: [
        //http://localhost:5173/
        {
          path: "",
          name: "trang-chu",
          component: () => import("../views/User/Dashboard.vue"),
        },
        //http://localhost:5173/san-pham/:idCategory
        {
          path: "san-pham/:idCategory",
          name: "sanpham",
          component: () => import("../views/User/Product.vue"),
        },
        //http://localhost:5173/san-pham/:idCategory
        {
          path: "san-pham-chi-tiet/:id",
          name: "sanphamchitiet",
          component: () => import("../views/User/ProductDetail.vue"),
        },
        {
          path: "gio-hang",
          name: "giohang",
          component: () => import("../views/User/Cart.vue"),
        },
        {
          path: "thanh-toan",
          name: "thanhtoan",
          component: () => import("../views/User/Checkout.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  let userLogin = localStorage.getItem("userLogin");
  if (to.meta.requiredAuth && userLogin == null) {
    next({ path: "/login" });
  } else {
    userLogin = JSON.parse(userLogin);
    if (to.meta.requiredAdmin && userLogin.role != "admin") {
      next({ path: "/" });
    } else {
      next();
    }
  }
});

export default router;
