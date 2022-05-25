<script setup lang="ts">
import type { User } from "@/models/User.model";
import { useAdminStore } from "@/stores/admin";
import { onMounted, ref } from "vue";

const adminStore = useAdminStore();

const requests = ref([] as User[]);

const message = ref("");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + adminStore.token);
myHeaders.append("Content-Type", "application/json");

const getRequests = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/admin/requests`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (res.ok) {
      const json = await res.json();

      requests.value = json;
    }
  } catch (e) {
    console.log(e);
  }
};

const approveRequest = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/requests/${id}/approve`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    if (res.ok) {
      getRequests();
    }
  } catch (e) {
    console.log(e);
  }
};

const rejectRequest = async (id: string) => {
  message.value = `I actually didn't create the endpoint for rejecting/deleting account requests**facepalm**
  so.... Request with ${id} not deleted`;
};

onMounted(() => {
  getRequests();
});
</script>

<template>
  <router-link :to="{ name: 'Add Student' }">
    <button>Add Student</button>
  </router-link>
  <div
    class="students-container"
    v-for="request in requests"
    :key="request._id"
  >
    <div class="student-card">
      <p>{{ request.username }} -{{ request.password }}</p>
      {{ message }}
      <button @click="approveRequest(request._id)">Approve Request</button>
      <button @click="rejectRequest(request._id)">Reject Request</button>
    </div>
  </div>
</template>

<style lang="scss">
.students-container {
  display: flex;
  width: 80vw;
}

.student-card {
  border-radius: 1rem;
  background-color: aquamarine;
  padding: 1rem;

  margin-bottom: 0.5rem;

  cursor: pointer;
}
</style>
