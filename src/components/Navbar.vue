<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img alt="Vue logo" class="logo p-1" src="@/assets/logo.svg" width="40" height="40" />
        Crud Vue
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/customers">Customers</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/services">Services</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/list">List</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/create">Create</RouterLink>
          </li>
        </ul>

        <div v-if="!authStore.accessToken" class="d-flex">
          <RouterLink class="btn btn-outline-success" to="/login">Login</RouterLink>
        </div>
        <div v-if="authStore.accessToken" class="d-flex">
          <Button type="button" outlineDanger @click="logout">Logout</Button>
        </div>
      </div>
    </div>
  </nav>
</template>
  
<script setup>
import { RouterLink } from 'vue-router'
import axios from "axios";
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { handleErrors } from '@/utils/index';

const apiUrl = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();

const logout = async () => {
  try {
    const accessToken = authStore.accessToken;
    if (!accessToken) {
      router.push('/login');
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`${apiUrl}/logout`, {
      headers,
    });
    if (response.status === 200) {
      authStore.clearAccessToken();
      router.push('/login');
    }
  } catch (error) {
    handleErrors(error);
  }
};
</script>
  