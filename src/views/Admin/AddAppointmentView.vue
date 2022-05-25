<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Teacher } from "@/models/Teacher.model";
import type { Student } from "@/models/Student.model";
import { useAdminStore } from "@/stores/admin";
import { useRouter } from "vue-router";

const formData = ref({});

const adminStore = useAdminStore();
const router = useRouter();

const teachers = ref([] as Teacher[]);
const students = ref([] as Student[]);

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

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + adminStore.token);
myHeaders.append("Content-Type", "application/json");

const submitHandler = async () => {
  const res = await fetch(`http://localhost:5000/api/admin/appointments`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formData.value),
  });

  if (res.ok) {
    router.push({ name: "Appointments" });
  }
};

onMounted(() => {
  getTeachers();
  getStudents();
});
</script>

<template>
  <FormKit
    type="form"
    v-model="formData"
    submit-label="Add Appointment"
    @submit="submitHandler"
  >
    <FormKit
      type="text"
      name="_id"
      label="ID"
      :value="Math.random().toString(36).slice(2)"
      validation="required"
    />
    <FormKit
      type="select"
      name="teacher_id"
      label="Teacher"
      :options="
        teachers.map((teacher) => {
          return { label: teacher.name, value: teacher._id };
        })
      "
    />
    <FormKit
      type="select"
      name="student_id"
      label="Student"
      :options="
        students.map((student) => {
          return { label: student.name, value: student._id };
        })
      "
    />
    <FormKit
      type="date"
      name="date"
      label="Date"
      validation="required"
      :value="new Date().toISOString().split('T')[0]"
    />
    <FormKit
      type="text"
      name="time"
      label="Time"
      validation="required"
      placeholder="0900"
    />
    <FormKit
      type="textarea"
      name="agenda"
      label="Agenda"
      validation="required"
    />
    <FormKit
      type="select"
      name="approved"
      label="Approved?"
      validation="required"
      :options="{ true: 'Yes', false: 'No' }"
    />
  </FormKit>
</template>
