<script setup lang="ts">
import type { Appointment } from "@/models/Appointment.model";
import type { Student } from "@/models/Student.model";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";

const userStore = useUserStore();

const appointments = ref([] as Appointment[]);

const studentName = ref(
  {} as {
    [key: string]: string;
  }
);

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + userStore.token);
myHeaders.append("Content-Type", "application/json");

onBeforeMount(async () => {
  await getPendingAppointments();

  try {
    const res = await fetch(`http://localhost:5000/api/students`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (res.ok) {
      const students: Student[] = await res.json();

      for (let student of students) {
        studentName.value[student._id] = student.name;
      }
    }
  } catch (e) {
    console.log(e);
  }
});

const getPendingAppointments = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/teachers/${userStore.user._id}/appointments/pending`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (res.ok) {
      const json = await res.json();
      console.log(json);

      appointments.value = json;
    }
  } catch (e) {
    console.log(e);
  }
};

const approveAppointment = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/teachers/${userStore.user._id}/appointments/${id}/approve`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (res.ok) {
      await getPendingAppointments();
    }
  } catch (e) {
    console.log(e);
  }
};

const rejectAppointment = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/teachers/${userStore.user._id}/appointments/${id}/reject`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (res.ok) {
      await getPendingAppointments();
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <h2>Requests</h2>
  <div
    class="appointment-card"
    v-for="appointment in appointments"
    :key="appointment._id"
  >
    <h3>Appointment {{ appointment._id }}</h3>
    <p>Date: {{ appointment.date }}</p>
    <p>Time: {{ appointment.time }}</p>
    <p>Booked by: {{ studentName[appointment.student_id] }}</p>
    <p>Agenda: {{ appointment.agenda }}</p>
    <button @click="approveAppointment(appointment._id)">Approve</button>
    <button @click="rejectAppointment(appointment._id)">Reject</button>
  </div>
</template>
