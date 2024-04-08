import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Course from "@/views/Course.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/course",
      component: Course,
    },
  ],
});

// Add a navigation guard to check if the user is authenticated before navigating to non-Home route. If the user is not authenticated, redirect them to the home page.
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next();
  } else if (localStorage.getItem("token") === null) {
    next("/");
  }
});
export default router;
