import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Course from "@/views/Course.vue";
import Login from "@/views/Login.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/course",
      component: Course,
    },
  ],
});

export default router;
