import Vue from "vue";
import Router from "vue-router";
import Page1 from "./views/Page1.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "page1",
      component: Page1
    },
    {
      path: "/2",
      name: "Page2",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Page2.vue")
    },
    {
      path: "/3",
      name: "Page3",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Page3.vue")
    }
  ]
});
