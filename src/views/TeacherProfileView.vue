<script setup lang="ts">
import type { Appointment } from "@/models/Appointment.model";
import type { Student } from "@/models/Student.model";
import type { Teacher } from "@/models/Teacher.model";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AppointmentComponent from "@/components/AppointmentComponent.vue";

const route = useRoute();
const userStore = useUserStore();

const vcal = ref(
  {} as {
    move: ({ month, year }) => void;
  }
);

const teacher_id = route.params.id;

const teacher = ref({} as Teacher);
const appointments = ref([] as Appointment[]);

const studentName = ref(
  {} as {
    [key: string]: string;
  }
);

const attributes = ref([] as unknown[]);

const generateEmptyEvents = () => {
  const emptyObjects = [];

  for (let i = 1; i < 31; i++) {
    const date = `2022-06-${String(i).padStart(2, "0")}`;

    const matchingDates = appointments.value.filter(
      (appointment) => appointment.date == date
    );

    for (let j = 0; j < teacher.value.hours; j++) {
      const time = String(j + 9).padStart(2, "0") + "00";

      let matchingTimes;
      if (matchingDates.length) {
        matchingTimes = matchingDates.filter(
          (appointment) => appointment.time == time
        );

        if (matchingTimes.length) {
          emptyObjects.push({
            key: matchingTimes[0]._id,
            customData: {
              time: time,
              with: studentName.value[matchingTimes[0].student_id],
              agenda: matchingTimes[0].agenda,
              teacher_id: matchingTimes[0].teacher_id,
              date: date,
            },
            dates: new Date(date),
          });
          console.log(matchingTimes[0]);
        } else {
          emptyObjects.push({
            key: `0${i}0${j}`,
            customData: {
              time: time,
              date: date,
            },
            dates: new Date(date),
          });
        }
      } else {
        emptyObjects.push({
          key: `0${i}0${j}`,
          customData: {
            time: time,
            date: date,
          },
          dates: new Date(date),
        });
      }
    }
  }
  return emptyObjects;
};

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + userStore.token);
myHeaders.append("Content-Type", "application/json");

onBeforeMount(async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/teachers/${teacher_id}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (res.ok) {
      const json = await res.json();
      console.log(json);

      teacher.value = json;
    }
  } catch (e) {
    console.log(e);
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/teachers/${teacher_id}/appointments`,
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

  attributes.value = generateEmptyEvents();
});

onMounted(() => {
  vcal.value.move({ month: 6, year: 2022 });
});
</script>

<template>
  <div class="teacher-card">
    <p>Name: {{ teacher.name }}</p>
    <p>Department: {{ teacher.department }}</p>
    <p>Course: {{ teacher.course }}</p>
  </div>
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
</template>
