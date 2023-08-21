<template>
  <el-card
    class="mb-2 cursor-pointer"
    @click="commentEventHandler(comment.comment.store.id, comment.comment.id, $event)"
  >
    <div class="d-flex mb-2" style="justify-content: space-between">
      <div class="d-flex">
        <div v-if="type === 'userComment'" class="d-flex">
          <img :src="comment.comment.user.imgUrl" class="me-2 profileImg" />
          <div>
            <h4>{{ comment.comment.user.name }}</h4>
            <p class="text-grey">
              {{ moment(comment.comment.createDate).format('YYYY-MM-DD') }}
            </p>
          </div>
        </div>
        <div v-else>
          <h4>{{ comment.comment.store.name }}</h4>
          <p class="text-grey">
            {{ moment(comment.comment.createDate).format('YYYY-MM-DD') }}
          </p>
        </div>
      </div>
      <div class="card-light-tag" style="align-self: flex-start">
        <h5 style="margin-bottom: 0px">
          <font-awesome-icon :icon="['fas', 'star']" class="me-1" />
          {{ comment.comment.score }} 分
        </h5>
      </div>
    </div>
    <div>
      <p class="text-grey">
        <span class="mb-1 me-1">
          <font-awesome-icon :icon="['fas', 'clock']" class="me-1" />日工時：
          {{ comment.comment.workHours }}
          <span>小時</span>
        </span>
        <span class="me-1">·</span>
        <span class="mb-1">
          <font-awesome-icon :icon="['fas', 'calendar-days']" class="me-1" />換宿：
          {{ comment.comment.workDays }}
          <span>周</span>
        </span>
      </p>
    </div>
    <p class="mb-2 multiline-ellipsis">
      {{ comment.comment.description }}
    </p>

    <span v-for="tag in comment.comment.advantages" :key="tag">
      <span v-if="tag.status">
        <el-tag class="me-1" type="info" disable-transitions>{{ tag.value }}</el-tag>
      </span>
    </span>

    <span v-for="tag in comment.comment.disAdvantages" :key="tag">
      <span v-if="tag.status">
        <el-tag class="me-1" type="info" disable-transitions style="margin-top: 4px">{{
          tag.value
        }}</el-tag>
      </span>
    </span>
    <ActionBar :comment="comment.comment" v-if="isAction"></ActionBar>
  </el-card>
</template>

<script setup>
import moment from 'moment';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCommentDetailStore } from '@/stores/useCommentDetailStore';
import ActionBar from './ActionBar.vue';

const comment = defineProps({
  comment: Object,
  isAction: Boolean,
  type: { default: 'userComment' },
});

// open detail modal
const commentDetailStore = useCommentDetailStore();
const { isDetailOpen } = storeToRefs(commentDetailStore);

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
</script>
