<script setup lang="ts">
import { ref } from "vue";

interface LoginFormData {
  email: string;
  password: string;
}

const type = ref("");
const submitted = ref(false);

const formData = ref({} as LoginFormData);

const submitHandler = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/signup/${type.value}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(formData.value),
    });

    if (res.ok) {
      submitted.value = true;
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
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Sign up"
    @submit="submitHandler"
  >
    <FormKit
      type="select"
      :options="{ teacher: 'Teacher', student: 'Student' }"
      label="Account type"
      placeholder="Select account type"
      validation="required"
      v-model="type"
    />
    <FormKit
      type="text"
      name="email"
      label="Email"
      placeholder="jane@example.com"
      validation="required|email"
    />
    <FormKit
      type="password"
      name="password"
      label="Password"
      validation="required|length:6"
      placeholder="Your password"
    />
    <FormKit
      type="password"
      name="password_confirm"
      label="Confirm password"
      placeholder="Confirm password"
      validation="required|confirm"
    />
  </FormKit>
  <div v-if="submitted">
    <h2>Account requested. Waiting for approval.</h2>
  </div>
</template>

<style lang="scss">
.hide {
  display: none;
}
</style>
