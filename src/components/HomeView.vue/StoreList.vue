<template>
  <section style="background: #f0f8f5" class="py-7">
    <WrapContainer>
      <h1 class="text-center mb-5">
        <font-awesome-icon :icon="['fas', 'store']" class="text-primary me-3" />精選換宿店家
      </h1>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="me-3 text-center" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'star']" class="me-1" />評分最高</h5>
            </div>

            <h5 class="mb-1">
              <span class="me-2 text-accent">1</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>
            <h5 class="mb-1">
              <span class="me-2 text-accent">2</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>
            <h5 class="mb-4">
              <span class="me-2 text-accent">3</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>

            <img src="@/assets/imgs/home/comment.png" /> </el-card
        ></el-col>

        <el-col :span="8">
          <el-card class="me-3 text-center" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'clock']" class="me-1" />工時最短</h5>
            </div>

            <h5 class="mb-1">
              <span class="me-2 text-accent">1</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>
            <h5 class="mb-1">
              <span class="me-2 text-accent">2</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>
            <h5 class="mb-4">
              <span class="me-2 text-accent">3</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>

            <img src="@/assets/imgs/home/lessHour.png" /> </el-card
        ></el-col>

        <el-col :span="8">
          <el-card class="me-3 text-center" style="width: 100%">
            <div class="card-tag mb-4">
              <h5><font-awesome-icon :icon="['fas', 'heart']" class="me-1" />福利最多</h5>
            </div>

            <h5 class="mb-1">
              <span class="me-2 text-accent">1</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>
            <h5 class="mb-1">
              <span class="me-2 text-accent">2</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>
            <h5 class="mb-4">
              <span class="me-2 text-accent">3</span>
              <span class="text-left" style="width: 200px">路易沙發咖啡館</span>
            </h5>

            <img src="@/assets/imgs/home/benefit.png" /> </el-card
        ></el-col>
      </el-row>
    </WrapContainer>
  </section>
</template>

<script setup>
import WrapContainer from '../global/WrapContainer.vue';
</script>
