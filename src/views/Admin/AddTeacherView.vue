<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "@/stores/admin";
import { useRouter } from "vue-router";

const formData = ref({});

const adminStore = useAdminStore();
const router = useRouter();

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + adminStore.token);
myHeaders.append("Content-Type", "application/json");

const submitHandler = async () => {
  const res = await fetch(`http://localhost:5000/api/teachers`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formData.value),
  });

  if (res.ok) {
    router.push({ name: "Teachers - Admin" });
  }
};
</script>

<template>
  <FormKit
    type="form"
    v-model="formData"
    submit-label="Add User"
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
      type="text"
      name="email"
      label="Email"
      placeholder="jane@example.com"
      validation="required"
    />
    <FormKit
      type="password"
      name="password"
      label="Password"
      validation="required|length:6"
      placeholder="Your password"
    />
    <FormKit
      type="text"
      name="name"
      label="Name"
      placeholder="John Doe"
      validation="required"
    />
    <FormKit
      type="text"
      name="department"
      label="Department"
      validation="required"
      value="Oceanography"
    />
    <FormKit
      type="text"
      name="course"
      label="Course"
      validation="required"
      placeholder="OCG111"
    />
    <FormKit
      type="number"
      name="hours"
      label="Hours"
      validation="required"
      placeholder="7"
      min="2"
      max="7"
    />
  </FormKit>
</template>
