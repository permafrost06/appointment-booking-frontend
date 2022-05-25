<script setup lang="ts">
import type { Student } from "@/models/Student.model";
import type { Teacher } from "@/models/Teacher.model";
import type { User } from "@/models/User.model";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const userStore = useUserStore();

const formData = ref({} as User | Student | Teacher);

formData.value = userStore.user;

const profileFormSchema = [
  {
    $formkit: "text",
    label: "Email",
    name: "email",
    placeholder: "jane@example.com",
    validation: "required|email",
  },
  {
    $formkit: "text",
    name: "password",
    label: "Password",
    validation: "required|length:6",
    placeholder: "Password",
  },
];

if (userStore.type != "admin") {
  profileFormSchema.push({
    $formkit: "text",
    label: "Name",
    name: "name",
    placeholder: "Name",
    validation: "required",
  });
  profileFormSchema.push({
    $formkit: "text",
    label: "Department",
    name: "department",
    placeholder: "Department",
    validation: "required",
  });
}

if (userStore.type == "teacher") {
  profileFormSchema.push({
    $formkit: "text",
    label: "Course",
    name: "course",
    placeholder: "OCG111",
    validation: "required",
  });
  profileFormSchema.push({
    $formkit: "text",
    label: "Hours",
    name: "hours",
    placeholder: "3",
    validation: "required",
  });
}

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + userStore.token);
myHeaders.append("Content-Type", "application/json");

const submitHandler = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/${userStore.type}s/${formData.value._id}`,
      {
        method: "PATCH",
        cache: "no-cache",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(formData.value),
      }
    );

    if (res.ok) {
      const json = await res.json();
      console.log(json);

      userStore.updateUser(json);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <FormKit
    type="form"
    v-model="formData"
    submit-label="Update Profile"
    @submit="submitHandler"
  >
    <FormKitSchema :schema="profileFormSchema" />
  </FormKit>
</template>
