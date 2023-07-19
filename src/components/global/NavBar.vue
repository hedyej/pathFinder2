<template>
  <div style="background-color: #fff; height: 80px" class="nav-shadow">
    <WrapContainer class="d-flex align-center" style="justify-content: space-between; height: 80px">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/imgs/logo/logo.png" style="width: 200" class="hidden-sm-and-down"/>
        <img src="@/assets/imgs/logo/logo-xs.png" style="width: 100" class="hidden-md-and-up"/>
      </router-link>
      <template v-if="!user.id" >
        <GoogleLogin :callback="callback" />
      </template>
      <el-button v-else @click="logOut">登出</el-button>
    </WrapContainer>
  </div>
</template>

<script setup>
import { decodeCredential, googleLogout } from 'vue3-google-login';
import axios from 'axios';
import WrapContainer from '@/components/global/WrapContainer.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import 'element-plus/theme-chalk/display.css';

// userStore
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const users = ref([]);
const getUsers = async () => { users.value = await axios.get('/users'); };
const postUser = async () => {
  await axios.post('/users', user.value);
};
const putUser = async () => {
  await axios.put(`/users/${user.value.id}`, user.value);
};
const upDateUser = () => {
  const isSameUser = users.value.data.filter((item) => item.id === user.value.id).length;
  if (isSameUser) {
    putUser(user);
  } else {
    postUser(user);
  }
};

const callback = async (response) => {
  const data = await decodeCredential(response.credential);
  user.value = {
    id: data.sub,
    name: data.name,
    imgUrl: data.picture,
    email: data.email,
  };
  await upDateUser();
};

const logOut = () => {
  googleLogout();
  user.value = {
    id: 0,
    name: '匿名',
    imgUrl: 'https://i.ibb.co/jwKW7LP/default-Avatar.png',
    email: 'hedy@gmail.com',
  };
};

onMounted(async () => {
  await getUsers();
});
</script>

<style scoped>
.nav-shadow {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
