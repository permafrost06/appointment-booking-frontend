<script setup lang="ts">
import type { SignInResponse, UserType } from "@/models/Misc.model";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const invalidCreds = ref(false);
const type = ref("" as UserType);

const router = useRouter();

interface LoginFormData {
  username: string;
  password: string;
}

const formData = ref({} as LoginFormData);

const submitHandler = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/login/${type.value}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(formData.value),
    });

    if (res.ok) {
      const json: SignInResponse = await res.json();
      console.log(json);

      userStore.initUser(json.userObj, json.token, type.value);

      router.push({ name: "Dashboard" });
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
      type="select"
      :options="{ teacher: 'Teacher', student: 'Student' }"
      label="Account type"
      placeholder="Select account type"
      validation="required"
      v-model="type"
    />
    <FormKit
      type="text"
      name="username"
      label="Email"
      placeholder="jane@example.com"
      validation="required|email"
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
