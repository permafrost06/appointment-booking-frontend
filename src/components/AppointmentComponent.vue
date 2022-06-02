<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  event: {
    key: string;
    customData: {
      time: string;
      with: string;
      agenda: string;
      teacher_id: string;
      date: string;
    };
    dates: Date;
  };
}>();

const event = ref(props.event.customData);

const showPopup = ref(false);
const newAgenda = ref("");

const cardClicked = () => {
  if (event.value.with) {
    return;
  } else {
    showPopup.value = !showPopup.value;
  }
  //  else {
  //   const date = props.event.customData.date;
  //   const timestr = props.event.customData.time;
  //   const time = `${timestr.slice(0, 2)}:${timestr.slice(2)}`;
  //   const datetime = date + "T" + time;

  //   router.push({
  //     name: "Create Appointment",
  //     params: {
  //       teacher_id: route.path.split("/")[2],
  //       datetime: datetime,
  //     },
  //   });
  // }
};
</script>

<template>
  <div :class="{ active: event.with }" class="event">
    <div @click="cardClicked">
      <span>{{ event.time }}</span>
      <p>{{ event.with }}</p>
      <p>{{ event.agenda }}</p>
    </div>
    <div class="popup" :class="{ show: showPopup }">
      <h4>Create Appointment</h4>
      <p>
        With:
        <span class="teacher-name">Solaiman Hossain</span>
      </p>
      <p>
        Time:
        <span class="time-range">09:00-10:00</span>
      </p>
      <FormKit rows="2" type="textarea" v-model="newAgenda" label="Agenda" />
      <FormKit type="button" label="Create" :disabled="!newAgenda" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.event {
  width: 7rem;
  font-family: "Segoe UI";
  text-align: left;
  background-color: hsl(0, 0%, 95%);
  color: hsl(0, 0%, 30%);
  border-radius: 0.3rem;
  margin-inline: 0.2rem;
  font-size: 0.8rem;
  padding: 0.2rem;
  &:hover {
    color: white;
    background-color: hsl(0, 0%, 50%);
    cursor: pointer;

    .popup {
      color: hsl(0, 0%, 30%);
      background-color: white;
    }
  }
  * {
    margin: 0.2rem;
  }
}

.active {
  background-color: rgb(2, 117, 255);
  color: white;

  .popup {
    color: hsl(0, 0%, 30%);
  }

  &:hover {
    background-color: rgb(2, 117, 255);
  }
}
.popup {
  display: none;
  position: absolute;
  background-color: white;
  border: 2px solid hsl(0, 0%, 50%);
  border-radius: 1rem;
  padding: 1rem;
  cursor: default;

  z-index: 999;

  transform: translateX(-25%) translateY(5%);

  textarea {
    margin: 0;

    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    background: turquoise;
    border-radius: 0.3rem;
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    color: hsl(0, 0%, 30%);
  }

  &::before {
    position: absolute;

    content: "";
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;

    border-bottom: 15px solid hsl(0, 0%, 50%);

    transform: translate(250%, -215%);
  }
}

.show {
  display: block;
}

.teacher-name,
.time-range {
  background-color: hsl(0, 0%, 95%);
  padding: 0 0.2rem;
  border-radius: 0.2rem;
}

.agenda-form {
  width: 12rem;
  height: 2rem;
}
</style>
