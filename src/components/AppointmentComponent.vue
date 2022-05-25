<script setup lang="ts">
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

const cardClicked = () => {
  if (props.event.customData.with) {
    return;
  } else {
    const date = props.event.customData.date;
    const timestr = props.event.customData.time;
    const time = `${timestr.slice(0, 2)}:${timestr.slice(2)}`;
    const datetime = date + "T" + time;

    router.push({
      name: "Create Appointment",
      params: {
        teacher_id: route.path.split("/")[2],
        datetime: datetime,
      },
    });
  }
};
</script>

<template>
  <div
    :class="{ active: props.event.customData.with }"
    @click="cardClicked"
    class="appointment-status"
  >
    <span>{{ props.event.customData.time }}</span>
    <p>{{ props.event.customData.with }}</p>
    <p>{{ props.event.customData.agenda }}</p>
  </div>
</template>

<style lang="scss" scoped>
.appointment-status {
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
  }

  * {
    margin: 0.2rem;
  }
}

.active {
  background-color: rgb(2, 117, 255);
  color: white;

  &:hover {
    background-color: rgb(2, 117, 255);
  }
}
</style>
