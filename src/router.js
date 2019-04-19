import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./views/LandingPage.vue";

Vue.use(Router);

export default new Router({
  linkActiveClass: "active-route",
  routes: [
    {
      path: "/",
      name: "Landing",
      component: LandingPage
    },
    {
      path: "/health",
      name: "HealthData",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "education" */ "./views/HealthData.vue")
    },
    {
      path: "/education",
      name: "EducationData",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "education" */ "./views/EducationData.vue")
    },
    {
      path: "/economics",
      name: "EconomicData",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "economics" */ "./views/EconomicData.vue")
    }
  ]
});
