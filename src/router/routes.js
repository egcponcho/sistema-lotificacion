const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("src/pages/HomePage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/404Page.vue"),
  },
];

export default routes;
