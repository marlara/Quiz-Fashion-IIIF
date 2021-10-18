import { createWebHistory, createRouter } from "vue-router";
import Home from "/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quiz_:id",
    name: "quiz.show",
    component: ()=> import("/views/QuizShow.vue")
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
