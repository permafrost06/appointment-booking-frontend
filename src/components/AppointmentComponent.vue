<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useClickOutside } from "@/composables/useClickOutside";
import AppointmentPopup from "./AppointmentPopup.vue";

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

const cardClicked = () => {
  if (event.value.with) {
    return;
  } else {
    showPopup.value = !showPopup.value;
  }
  console.log(
    self_ref.value?.getBoundingClientRect().left,
    self_ref.value?.getBoundingClientRect().top
  );
};

const self_ref = ref<HTMLDivElement | null>(null);

useClickOutside(self_ref as Ref<HTMLDivElement>, () => {
  showPopup.value = false;
});
</script>

<template>
  <div
    ref="self_ref"
    :class="{ active: event.with, selected: showPopup }"
    class="event"
  >
    <div @click="cardClicked">
      <span>{{ event.time }}</span>
      <p>{{ event.with }}</p>
      <p>{{ event.agenda }}</p>
    </div>
    <AppointmentPopup v-if="showPopup" />
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

.selected {
  color: white;
  background-color: hsl(0, 0%, 50%);
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
</style>
