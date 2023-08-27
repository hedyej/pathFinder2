<template>
  <div style="background-color: #fff; height: 80px" class="nav-shadow">
    <WrapContainer class="d-flex align-center" style="justify-content: space-between; height: 80px">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/imgs/logo/logo.png" style="width: 200" class="hidden-sm-and-down" />
        <img src="@/assets/imgs/logo/logo-xs.png" style="width: 100" class="hidden-md-and-up" />
      </router-link>
      <template v-if="!user.id">
        <GoogleLogin :callback="callback" />
      </template>
      <el-dropdown v-else class="cursor-pointer" trigger="click">
        <span class="el-dropdown-link">
          <div class="d-flex" style="align-items: center">
            <img
              :src="user.imgUrl"
              style="height: 40px; width: 40px; border-radius: 100px"
              class="me-1"
            />
            <h5 style="display: inline-block; margin-bottom: 0px">{{ user.name }}</h5>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </WrapContainer>
  </div>
</template>

<script setup>
import { decodeCredential, googleLogout } from 'vue3-google-login';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import WrapContainer from '@/components/global/WrapContainer.vue';
import { useUserStore } from '@/stores/useUserStore';
import 'element-plus/theme-chalk/display.css';
import { getUsers, createUser, updateUser } from '@/apis/user';
import Cookies from 'js-cookie';

// user login & update
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const users = ref([]);

const handleupdateUser = async () => {
  const isSameUser = users.value.data.filter((item) => item.id === user.value.id).length;
  if (isSameUser) {
    await updateUser(user.value.id, user.value);
  } else {
    await createUser(user.value);
    users.value = await getUsers();
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

const checkCookieExpiration = async () => {
  if (Cookies.get('login')) {
    const userInCookie = Cookies.get('login');
    user.value = JSON.parse(userInCookie);
    await handleupdateUser();
  } else {
    await logOut();
  }
  setTimeout(checkCookieExpiration, 1000);
};

onMounted(async () => {
  users.value = await getUsers();
  await checkCookieExpiration();
});
</script>

<style scoped>
.nav-shadow {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
