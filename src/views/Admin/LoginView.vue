<script setup lang="ts">
import { useAdminStore } from "@/stores/admin";
import { ref } from "vue";
import { useRouter } from "vue-router";

const adminStore = useAdminStore();

const invalidCreds = ref(false);

const router = useRouter();

interface LoginFormData {
  username: string;
  password: string;
}

const formData = ref({} as LoginFormData);

const submitHandler = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/login/admin`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(formData.value),
    });

    if (res.ok) {
      const json = await res.json();

      adminStore.addToken(json.token);

      router.push({ name: "Account Requests" });
    } else {
      invalidCreds.value = true;
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
    submit-label="Log in"
    @submit="submitHandler"
    @input="invalidCreds = false"
  >
    <FormKit
      type="text"
      name="username"
      label="Email"
      placeholder="jane@example.com"
      validation="required"
    />
    <FormKit
      type="password"
      name="password"
      label="Password"
      validation="required|length:6"
      :validation-messages="{
        matches: 'Please include at least one symbol',
      }"
      placeholder="Your password"
    />
    <ul class="formkit-messages" v-if="invalidCreds">
      <li class="formkit-message">Invalid credentials provided</li>
    </ul>
  </FormKit>
</template>
