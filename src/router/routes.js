const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/HomePage.vue"),
      },
      {
        path: "/customers",
        name: "customers",
        component: () => import("pages/CustomersPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/404Page.vue"),
  },
];

export default routes;
