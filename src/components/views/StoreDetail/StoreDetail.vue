<template>
  <div>
    <CommentDetailModal></CommentDetailModal>
    <CommentModal></CommentModal>
    <WrapContainer>
      <router-link :to="{ name: 'searchStore' }" class="text-primary bold router-link mb-1"
        ><font-awesome-icon :icon="['fas', 'arrow-left']" class="me-1" />返回搜尋</router-link
      >

      <el-row :gutter="20" class="mt-2">
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="d-flex align-center mb-2">
              <div class="me-2">
                <div class="rounded block">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="store.imgUrl"
                    fit="cover"
                    class="rounded"
                  />
                </div>
              </div>

              <div>
                <h3>{{ store.name }}</h3>

                <div class="d-flex align-center">
                  <h2 class="me-2 text-accent">{{ averageScore }}</h2>
                  <el-rate
                    v-model="averageScore"
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
                {{ averageWorkHours}}
                <span>小時</span>
              </p>
              <p class="mb-1">
                <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />平均換宿：
                {{ averageWorkDays }}
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
          <div class="d-flex align-center" style="justify-content: space-between; ;height: 64px;">
            <p class="text-grey bold" style="margin: 0">{{ allComments.length }} 則評論</p>
              <FilterSelection v-if="allComments.length"></FilterSelection>
          </div>
          <template v-if=" allComments.length ">
            <div  v-for="comment in comments" :key="comment.id">
              <CommentCard :comment="comment" :isAction="true"></CommentCard>
            </div>
          </template>
          <div v-if=" allComments.length===0 " class="text-center text-grey py-3">
            <font-awesome-icon :icon="['fas', 'face-sad-tear']"
            style="width: 80;height: 80" class="mb-1"/>
            <h5>尚無評論</h5>
          </div>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="allComments.length"
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '@/stores/useCommentStore';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import CommentCard from '@/components/global/CommentCard.vue';
import { getStore } from '@/apis/store';
import { useLoadingStore } from '@/stores/useLoadingStore';
import WrapContainer from '../../global/WrapContainer.vue';
import FilterSelection from './components/FilterSelection.vue';
import CommentModal from './components/CommentModal.vue';
import CommentDetailModal from './components/CommentDetailModal.vue';

const loadingStore = useLoadingStore();
loadingStore.setIsLoading();

// commentStore
const commentStore = useCommentStore();
const {
  comments, allComments, storeId, sorterInfo, form, type, isOpen,
  averageWorkDays, averageWorkHours, averageScore,
} = storeToRefs(commentStore);
const { pageSorter, fetchAllComments } = commentStore;

// commentDetailStore
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen } = storeToRefs(commentDetailStore);

// store info
const store = ref({});
const fetchStore = async () => {
  const { data } = await getStore(storeId.value);
  store.value = data;
};

// comment action
const createComment = () => {
  isOpen.value = true;
  type.value = 'create';
  form.value.storeId = storeId.value;
};

// route to open detail modal
const route = useRoute();
if (route.params.id) {
  storeId.value = parseInt(route.params.id, 10);
} else if (route.query.storeId && route.query.commentId) {
  storeId.value = parseInt(route.query.storeId, 10);
  isDetailOpen.value = true;
}

// change page
const handleCurrentChange = async (page) => {
  await pageSorter(sorterInfo.value.nowType, page, sorterInfo.value.nowSorter);
};

// onMounted
onMounted(async () => {
  await fetchStore();
  await fetchAllComments(storeId.value);
  await pageSorter('createDate', 1, 'desc');
  loadingStore.setIsLoading();
});

</script>
