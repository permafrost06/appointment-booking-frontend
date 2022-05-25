<script setup lang="ts">
import type { Appointment } from "@/models/Appointment.model";
import { useAdminStore } from "@/stores/admin";
import { onMounted, ref } from "vue";

const adminStore = useAdminStore();

const appointments = ref([] as Appointment[]);

const studentName = ref(
  {} as {
    [key: string]: string;
  }
);

const teacherName = ref(
  {} as {
    [key: string]: string;
  }
);

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

      for (let teacher of json) {
        teacherName.value[teacher._id] = teacher.name;
      }
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

      for (let student of json) {
        studentName.value[student._id] = student.name;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getAppointments = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/admin/appointments`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

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
      `http://localhost:5000/api/admin/appointments/${id}/approve`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    if (res.ok) {
      getAppointments();
    }
  } catch (e) {
    console.log(e);
  }
};

const rejectAppointment = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/appointments/${id}/reject`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    if (res.ok) {
      getAppointments();
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteAppointment = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/appointments/${id}`,
      {
        method: "DELETE",
        headers: myHeaders,
      }
    );

    if (res.ok) {
      getAppointments();
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getTeachers();
  getStudents();
  getAppointments();
});
</script>

<template>
  <router-link :to="{ name: 'Add Appointment - Admin' }">
    <button>Add Appointment</button>
  </router-link>
  <div
    class="teachers-container"
    v-for="appointment in appointments"
    :key="appointment._id"
  >
    <div class="teacher-card">
      <p>Teacher: {{ teacherName[appointment.teacher_id] }}</p>
      <p>Student: {{ studentName[appointment.student_id] }}</p>
      <p>Date: {{ appointment.date }}</p>
      <p>Time: {{ appointment.time }}</p>
      <p v-if="appointment.approved == true">Approved</p>
      <p v-else>
        <button @click="approveAppointment(appointment._id)">
          Approve Appointment
        </button>
        <button @click="rejectAppointment(appointment._id)">
          Reject Appointment
        </button>
      </p>
      <button @click="deleteAppointment(appointment._id)">
        Delete Appointment
      </button>
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
