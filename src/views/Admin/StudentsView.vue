<script setup lang="ts">
import type { Student } from "@/models/Student.model";
import { useAdminStore } from "@/stores/admin";
import { onMounted, ref } from "vue";

const adminStore = useAdminStore();

const students = ref([] as Student[]);

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + adminStore.token);
myHeaders.append("Content-Type", "application/json");

const getStudents = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/students`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (res.ok) {
      const json = await res.json();

      students.value = json;
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteStudent = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (res.ok) {
      getStudents();
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getStudents();
});
</script>

<template>
  <router-link :to="{ name: 'Add Student' }">
    <button>Add Student</button>
  </router-link>
  <div
    class="students-container"
    v-for="student in students"
    :key="student._id"
  >
    <div class="student-card">
      <p>ID: {{ student._id }}</p>
      <p>Email: {{ student.email }}</p>
      <p>Password: {{ student.password }}</p>
      <p>Name: {{ student.name }}</p>
      <p>Department: {{ student.department }}</p>
      <button @click="deleteStudent(student._id)">Delete Student</button>
    </div>
  </div>
</template>

<style lang="scss">
.students-container {
  display: flex;
  width: 80vw;
}

.student-card {
  border-radius: 1rem;
  background-color: aquamarine;
  padding: 1rem;

  margin-bottom: 0.5rem;

  cursor: pointer;
}
</style>
