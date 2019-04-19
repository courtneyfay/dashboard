import Vue from "vue";
import Router from "vue-router";
import HealthData from "./views/HealthData.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HealthData",
      component: HealthData
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
