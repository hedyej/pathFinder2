<template>
  <div>
    <CommentDetailModal></CommentDetailModal>
    <CommentModal></CommentModal>
    <WrapContainer>
      <router-link :to="{ name: 'searchStore' }" class="text-primary bold router-link mb-1"
        ><font-awesome-icon :icon="['fas', 'arrow-left']" class="me-1" />返回</router-link
      >

      <el-row :gutter="20" class="mt-2">
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="d-flex align-center mb-2">
              <div class="me-2">
                <div v-if="store.imgUrl" class="rounded block">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="store.imgUrl"
                    fit="cover"
                    class="rounded"
                  />
                </div>
                <img v-else src="@/assets/imgs/ProductDetail/storeDefaultImg.png" class="rounded" />
              </div>

              <div>
                <h3>{{ store.name }}</h3>

                <div class="d-flex align-center">
                  <h2 class="me-2 text-accent">{{ averageStoreInfo.averageScore }}</h2>
                  <el-rate
                    v-model="scoreValue"
                    disabled
                    :colors="['#F48C2B', '#F48C2B', '#F48C2B']"
                    size="large"
                  />
                </div>
              </div>
            </div>

            <div class="text-grey mb-2">
              <p class="mb-1">
                <font-awesome-icon :icon="['fas', 'location-dot']" class="me-1" />{{
                  store.address
                }}
              </p>
              <p class="mb-1">
                <font-awesome-icon :icon="['fas', 'phone']" class="me-1" />{{ store.tel }}
              </p>
              <p class="mb-1">
                <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />平均工時：
                {{ averageStoreInfo.averageHours }}
                <span>小時</span>
              </p>
              <p class="mb-1">
                <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />平均換宿：
                {{ averageStoreInfo.averageDays }}
                <span>周</span>
              </p>
            </div>
            <el-button
              type="primary"
              style="display: block; margin: auto"
              size="large"
              @click="createComment"
              >撰寫貼文</el-button
            >
          </el-card>
        </el-col>

        <el-col :xs="24" :md="16">
          <div class="d-flex align-center" style="justify-content: space-between">
            <p class="text-grey bold" style="margin: 0">{{ comments.length }} 則評論</p>
            <FilterSelection></FilterSelection>
          </div>

          <el-card
            v-for="comment in comments"
            :key="comment.id"
            class="mb-2 cursor-pointer"
            @click="commentEventHandler(comment.store.id, comment.id, $event)"
          >
            <div class="d-flex mb-2" style="justify-content: space-between">
              <div class="d-flex">
                <img :src="comment.user.imgUrl" class="me-2 profileImg" />
                <div>
                  <h4>{{ comment.user.name }}</h4>

                  <p class="text-grey">{{ moment(comment.createDate).format('YYYY-MM-DD') }}</p>
                </div>
              </div>
              <div class="card-light-tag" style="align-self: flex-start">
                <h5 style="margin-bottom: 0px">
                  <font-awesome-icon :icon="['fas', 'star']" class="me-1" />{{ comment.score }} 分
                </h5>
              </div>
            </div>
            <div>
              <p class="text-grey">
                <span class="mb-1 me-1">
                  <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />日工時：
                  {{ comment.workHours }}
                  <span>小時</span>
                </span>
                <span class="me-1">·</span>
                <span class="mb-1">
                  <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />換宿：
                  {{ comment.workDays }}
                  <span>周</span>
                </span>
              </p>
            </div>
            <p class="mb-2 multiline-ellipsis">
              {{ comment.description }}
            </p>

            <span v-for="tag in comment.advantages" :key="tag">
              <span v-if="tag.status">
                <el-tag class="me-1" type="info">{{ tag.value }}</el-tag>
              </span>
            </span>

            <span v-for="tag in comment.disAdvantages" :key="tag">
              <span v-if="tag.status">
                <el-tag class="me-1" type="info">{{ tag.value }}</el-tag>
              </span>
            </span>

            <ActionBar :comment="comment"></ActionBar>
          </el-card>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="comments.length"
            @current-change="handleCurrentChange"
            :hide-on-single-page="comments.length === 10 || comments.length < 10"
            :current-page="sorterInfo.nowPage"
          />
        </el-col>
      </el-row>
    </WrapContainer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { storeToRefs } from 'pinia';

import moment from 'moment';
import { useCommentStore } from '@/stores/useCommentStore';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import WrapContainer from '../../global/WrapContainer.vue';
import FilterSelection from './components/FilterSelection.vue';
import CommentModal from './components/CommentModal.vue';
import CommentDetailModal from './components/CommentDetailModal.vue';
import ActionBar from './components/ActionBar.vue';

// commentStore
const commentStore = useCommentStore();
const {
  comments, storeId, sorterInfo, averageStoreInfo, form, type, isOpen,
} = storeToRefs(commentStore);
const { getStoreInfo, pageSorter } = commentStore;

// commentDetailStore
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen } = storeToRefs(commentDetailStore);

// store info
const store = ref({});
const getStore = () => {
  axios.get(`/stores/${storeId.value}`).then((res) => {
    store.value = res.data;
  });
};
const scoreValue = computed(() => averageStoreInfo.value.averageScore);

// comment action
const createComment = () => {
  isOpen.value = true;
  type.value = 'create';
  form.value.storeId = storeId;
};

// click to open detail modal
const router = useRouter();
const commentEventHandler = (cardStoreId, cardCommentId, event) => {
  const dropdownClicked = event.target.closest('.dropdown');
  if (dropdownClicked) {
    event.stopPropagation();
  } else {
    router.push(`/storeDetail?storeId=${cardStoreId}&commentId=${cardCommentId}`);
    isDetailOpen.value = true;
  }
};

// route to open detail modal
const route = useRoute();
if (route.params.id) {
  storeId.value = route.params.id;
} else if (route.query.storeId && route.query.commentId) {
  storeId.value = route.query.storeId;
  isDetailOpen.value = true;
}

// change page
const handleCurrentChange = async (page) => {
  await pageSorter(sorterInfo.value.nowType, page, sorterInfo.value.nowSorter);
};

// onMounted
onMounted(async () => {
  await getStore();
  await pageSorter('createDate', 1, 'desc');
  await getStoreInfo();
});
</script>
