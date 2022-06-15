<script setup lang="ts">
import { ref } from "vue";

const newAgenda = ref("");
</script>

<template>
  <div class="popup show">
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
</template>

<style lang="scss">
.popup {
  display: none;
  position: absolute;
  background-color: white;
  border: 2px solid hsl(0, 0%, 50%);
  border-radius: 1rem;
  padding: 1rem;
  cursor: default;
  color: hsl(0, 0%, 30%);

  z-index: 999;

  transform: translateX(-110%) translateY(-20%);

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

    border: 0 solid transparent;
    border-bottom-width: 15px;
    border-top-width: 15px;
    border-left: 20px solid hsl(0, 0%, 50%);

    transform: translate(980%, 40%);
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
