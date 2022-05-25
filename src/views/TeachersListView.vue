<script setup lang="ts">
import type { Teacher } from "@/models/Teacher.model";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const teachers = ref([] as Teacher[]);

const getTeachers = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + userStore.token);
  myHeaders.append("Content-Type", "application/json");

  try {
    const res = await fetch(`http://localhost:5000/api/teachers`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (res.ok) {
      const json = await res.json();
      console.log(json);

      teachers.value = json;
    }
  } catch (e) {
    console.log(e);
  }
};

const handleClick = (id: string) => {
  router.push({ name: "Teacher Profile", params: { id } });
};

onMounted(() => {
  getTeachers();
});
</script>

<template>
  <div
    class="teachers-container"
    v-for="teacher in teachers"
    :key="teacher._id"
  >
    <div
      @click="handleClick(teacher._id)"
      v-if="teacher.name"
      class="teacher-card"
    >
      <p>Name: {{ teacher.name }}</p>
      <p>Department: {{ teacher.department }}</p>
      <p>Course: {{ teacher.course }}</p>
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
