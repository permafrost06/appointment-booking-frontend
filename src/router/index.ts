import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/SignupView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      path: "/teachers",
      name: "Teachers List",
      component: () => import("@/views/TeachersListView.vue"),
    },
    {
      path: "/teacher/:id",
      name: "Teacher Profile",
      component: () => import("@/views/TeacherProfileView.vue"),
      props: true,
    },
    {
      path: "/create-appointment/:teacher_id/:datetime",
      name: "Create Appointment",
      component: () => import("@/views/CreateAppointmentView.vue"),
      props: true,
    },
    {
      path: "/requests",
      name: "Appointment Requests",
      component: () => import("@/views/RequestsView.vue"),
    },
    {
      path: "/admin/",
      name: "Admin login",
      component: () => import("@/views/Admin/LoginView.vue"),
    },
    {
      path: "/admin/teachers",
      name: "Teachers - Admin",
      component: () => import("@/views/Admin/TeachersView.vue"),
    },
    {
      path: "/admin/teachers/new",
      name: "Add Teacher",
      component: () => import("@/views/Admin/AddTeacherView.vue"),
    },
    {
      path: "/admin/students",
      name: "Students - Admin",
      component: () => import("@/views/Admin/StudentsView.vue"),
    },
    {
      path: "/admin/students/new",
      name: "Add Student",
      component: () => import("@/views/Admin/AddStudentView.vue"),
    },
    {
      path: "/admin/appointments",
      name: "Appointments",
      component: () => import("@/views/Admin/AppointmentsView.vue"),
    },
    {
      path: "/admin/appointments/new",
      name: "Add Appointment - Admin",
      component: () => import("@/views/Admin/AddAppointmentView.vue"),
    },
    {
      path: "/admin/requests",
      name: "Account Requests",
      component: () => import("@/views/Admin/RequestsView.vue"),
    },
  ],
});

export default router;
