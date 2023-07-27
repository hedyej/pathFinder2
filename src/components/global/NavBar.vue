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
import WrapContainer from '@/components/global/WrapContainer.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import 'element-plus/theme-chalk/display.css';
import { getUsers, createUser, updateUser } from '@/apis/user';
import Cookies from 'js-cookie';

// user login & update
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const users = ref([]);

const handleupdateUser = () => {
  const isSameUser = users.value.data.filter((item) => item.id === user.value.id).length;
  if (isSameUser) {
    updateUser(user.value.id, user.value);
  } else {
    createUser(user.value);
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
  Cookies.set('login', JSON.stringify(user.value), { expires: 3 });
  await handleupdateUser();
};

const logOut = () => {
  googleLogout();
  user.value = {
    id: 0,
    name: '匿名',
    imgUrl: 'https://i.ibb.co/jwKW7LP/default-Avatar.png',
    email: 'hedy@gmail.com',
  };
  Cookies.remove('login');
};

onMounted(async () => {
  users.value = await getUsers();
  if (Cookies.get('login')) {
    const userInCookie = Cookies.get('login');
    user.value = JSON.parse(userInCookie);
    handleupdateUser();
  }
});
</script>

<style scoped>
.nav-shadow {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
