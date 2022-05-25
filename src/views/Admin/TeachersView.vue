<script setup lang="ts">
import type { Teacher } from "@/models/Teacher.model";
import { useAdminStore } from "@/stores/admin";
import { onMounted, ref } from "vue";

const adminStore = useAdminStore();

const teachers = ref([] as Teacher[]);

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + adminStore.token);
myHeaders.append("Content-Type", "application/json");

const getTeachers = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/teachers`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (res.ok) {
      const json = await res.json();

      teachers.value = json;
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteTeacher = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    if (res.ok) {
      getTeachers();
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getTeachers();
});
</script>

<template>
  <router-link :to="{ name: 'Add Teacher' }">
    <button>Add Teacher</button>
  </router-link>
  <div
    class="teachers-container"
    v-for="teacher in teachers"
    :key="teacher._id"
  >
    <div class="teacher-card">
      <p>Name: {{ teacher.name }}</p>
      <p>Department: {{ teacher.department }}</p>
      <p>Course: {{ teacher.course }}</p>
      <button @click="deleteTeacher(teacher._id)">Delete Teacher</button>
    </div>
  </div>
</template>

<style lang="scss">
.teachers-container {
  display: flex;
  width: 80vw;
}

.teacher-card {
  border-radius: 1rem;
  background-color: aquamarine;
  padding: 1rem;

  margin-bottom: 0.5rem;

  cursor: pointer;
}
</style>
