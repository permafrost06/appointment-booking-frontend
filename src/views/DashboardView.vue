<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onBeforeMount, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import AppointmentComponent from "@/components/AppointmentComponent.vue";
import type { Appointment } from "@/models/Appointment.model";

const userStore = useUserStore();
const router = useRouter();

const appointments = ref([] as Appointment[]);

const attributes = ref(
  [] as { key: string; customData: { time: string }; dates: Date }[]
);

const vcal = ref(
  {} as {
    move: ({ month, year }) => void;
  }
);

const logOutHandler = () => {
  userStore.clearData();
  router.push({ name: "Login" });
};

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + userStore.token);
myHeaders.append("Content-Type", "application/json");

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

onBeforeMount(async () => {
  getTeachers();
  getStudents();

  if (userStore.type == "teacher") {
    try {
      const res = await fetch(
        `http://localhost:5000/api/teachers/${userStore.user._id}/appointments`,
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

    attributes.value = appointments.value.map((appointment) => {
      const time =
        appointment.time.slice(0, 2) + ":" + appointment.time.slice(2);

      return {
        key: appointment._id,
        customData: {
          time: time,
          with: studentName.value[appointment.student_id],
          agenda: appointment.agenda,
        },
        dates: new Date(appointment.date),
      };
    });
  } else {
    try {
      const res = await fetch(
        `http://localhost:5000/api/students/${userStore.user._id}/appointments`,
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

    attributes.value = appointments.value.map((appointment) => {
      const time =
        appointment.time.slice(0, 2) + ":" + appointment.time.slice(2);

      return {
        key: appointment._id,
        customData: {
          time: time,
          with: teacherName.value[appointment.teacher_id],
          agenda: appointment.agenda,
        },
        dates: new Date(appointment.date),
      };
    });
  }
});

onMounted(() => {
  vcal.value.move({ month: 6, year: 2022 });
});
</script>

<template>
  <router-link :to="{ name: 'Profile' }">Profile</router-link>
  <div class="full-width">
    <div class="text-center section">
      <v-calendar
        ref="vcal"
        class="custom-calendar max-w-full"
        :attributes="attributes"
        :first-day-of-week="7"
        disable-page-swipe
        trim-weeks
        is-expanded
      >
        <template v-slot:day-content="{ day, attributes }">
          <!-- temporary hack to hide past month dates -->
          <div v-if="day.month == 6">
            {{ day.day }}
            <div class="appointments-holder">
              <AppointmentComponent
                v-for="attr in attributes"
                :event="attr"
                :key="attr.key"
              />
            </div>
            <template></template>
          </div>
        </template>
      </v-calendar>
    </div>
  </div>
  <br />
  <button @click="logOutHandler">Log Out</button>
</template>

<style lang="scss">
.vc-day {
  position: static;
  z-index: auto;
}
</style>
