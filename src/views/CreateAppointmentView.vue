<script setup lang="ts">
import type { Teacher } from "@/models/Teacher.model";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();

const datetime = ref(route.params.datetime);
const formData = ref(
  {} as {
    datetime: string;
    agenda: string;
  }
);

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + userStore.token);
myHeaders.append("Content-Type", "application/json");

const getTeacher = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/teachers/${id}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });

  const teacher: Teacher = await res.json();

  return teacher;
};

const teacher = ref({} as Teacher);

onBeforeMount(async () => {
  teacher.value = await getTeacher(route.params.teacher_id as string);
});

const submitHandler = async () => {
  const dateTimeObj: string[] = formData.value.datetime.split("T");
  const date = dateTimeObj[0];
  const time = dateTimeObj[1].replace(":", "");

  try {
    const res = await fetch(
      `http://localhost:5000/api/teachers/${teacher.value._id}/appointments`,
      {
        method: "POST",
        cache: "no-cache",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          student_id: userStore.user._id,
          date,
          time,
          agenda: formData.value.agenda,
        }),
      }
    );

    if (res.ok) {
      console.log(await res.json());
      // submitted.value = true;
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <h3>{{ teacher.name }}</h3>
  <FormKit
    type="form"
    v-model="formData"
    submit-label="Request Appointment"
    @submit="submitHandler"
  >
    <FormKit
      class="disbler"
      type="datetime-local"
      name="datetime"
      :value="datetime"
      label="Date & Time"
      validation="required"
      disabled
    />
    <FormKit
      type="textarea"
      name="agenda"
      label="Agenda"
      validation="required|length:6"
      placeholder="Meeting about X"
    />
  </FormKit>
</template>
