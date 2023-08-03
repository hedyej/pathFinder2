<template>
    <div class="text-center" >
        <font-awesome-icon :icon="['fas', 'face-sad-tear']"
            style="width: 80;height: 80" class="mb-1 text-grey"/>
        <h1>404 </h1>
        <h4 class="mb-3">找不到網頁</h4>
        <router-link :to="{name:'home'}">
            <el-button type="primary" size="large">回到首頁</el-button>
        </router-link>

    </div>

</template>
