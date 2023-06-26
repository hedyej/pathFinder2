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
              </p>
              <p class="mb-1">
                <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />平均換宿日：
                {{ averageStoreInfo.averageDays }}
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
            @click="openCommentDetail(comment)"
          >
            <div class="d-flex mb-2" style="justify-content: space-between">
              <div class="d-flex">
                <img
                  src="@/assets/imgs/StoreDetail/avatarDefault.png"
                  class="me-2 rounded"
                  style="width: 56px; height: 56px"
                />
                <div>
                  <h4>{{ comment.user.name }}</h4>

                  <p class="text-grey">{{ comment.createDate }}</p>
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
                <span class="mb-1 me-2">
                  <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />日工時：
                  {{ comment.workHours }}
                </span>
                <span class="me-2">·</span>
                <span class="mb-1">
                  <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />換宿日數：
                  {{ comment.workDays }}
                </span>
              </p>
            </div>
            <p class="mb-2">
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

            <div class="text-right text-grey">
              <span class="me-3">
                <font-awesome-icon :icon="['fas', 'thumbs-up']" class="me-1" />{{
                  comment.like.length > 0 ? comment.like.length : ' '
                }}</span
              >
              <span class="me-3">
                <font-awesome-icon :icon="['fas', 'thumbs-down']" class="me-1" />{{
                  comment.dislike.length > 0 ? comment.dislike.length : ' '
                }}</span
              >
              <span class="me-3">
                <font-awesome-icon :icon="['fas', 'comment-dots']" class="me-1" />{{
                  comment.replies.length > 0 ? comment.dislike.length : ' '
                }}</span
              >

              <el-dropdown>
                <span>
                  <div style="height: 22px; width: 29px" class="d-flex align-center">
                    <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                  </div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="editComment(comment)">編輯</el-dropdown-item>
                    <el-dropdown-item @click="deleteComment(comment.id)">刪除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-card>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="comments.length"
            @current-change="handleCurrentChange"
            :hide-on-single-page="comments.length === 1"
            :current-page="sorterInfo.nowPage"
          />
        </el-col>
      </el-row>
    </WrapContainer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { storeToRefs } from 'pinia';

import { useCommentStore } from '@/stores/useCommentStore';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import WrapContainer from '../../global/WrapContainer.vue';
import FilterSelection from './components/FilterSelection.vue';
import CommentModal from './components/CommentModal.vue';
import CommentDetailModal from './components/CommentDetailModal.vue';

// commentStore
const commentStore = useCommentStore();
const {
  comments, storeId, sorterInfo, averageStoreInfo, form, type, isOpen,
} = storeToRefs(commentStore);
const { getStoreInfo, pageSorter, deleteComment } = commentStore;

// store info
const store = ref({});
const getStore = () => {
  axios.get(`/stores/${storeId.value}`).then((res) => {
    store.value = res.data;
  });
};
const scoreValue = computed(() => averageStoreInfo.value.averageScore);

// Comment Action
const createComment = () => {
  isOpen.value = true;
  type.value = 'create';
  form.value.storeId = storeId;
};

const editComment = (pastForm) => {
  isOpen.value = true;
  type.value = 'edit';
  form.value = JSON.parse(JSON.stringify(pastForm));
};

// detail modal
const commentDetailStore = useCommentDetailStore();
const { commentDetail, isDetailOpen } = storeToRefs(commentDetailStore);
const openCommentDetail = (comment) => {
  isDetailOpen.value = true;
  commentDetail.value = comment;
};

// route
const route = useRoute();
storeId.value = route.params.id;

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
