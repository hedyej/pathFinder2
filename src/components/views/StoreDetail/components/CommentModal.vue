<template>
  <el-dialog v-model="isOpen" width="600" :before-close="handleClose">
    <h2 class="text-dark">
      評論撰寫 <span class="text-grey">({{ modalPage }}/2)</span>
    </h2>
    <div v-if="modalPage === 1">
      <h5 class="mb-4">填寫基本資訊</h5>
      <el-form label-position="top" label-width="100px" :model="form" ref="formRef">
        <el-form-item label="評論身份">
          <el-radio-group v-model="anonymous">
            <el-radio-button label="匿名" />
            <el-radio-button label="本人" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="換宿年份">
          <el-select v-model="form.hoildayYear" placeholder="選擇年份" style="width: 240px">
            <el-option v-for="year in lastYears" :key="year" :label="year" :value="year" />
          </el-select>
        </el-form-item>

        <el-form-item label="換宿天數">
          <el-select
            v-model="form.workDays"
            placeholder="選擇天數"
            class="me-2"
            style="width: 240px"
          >
            <el-option
              v-for="item in workDays"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-input-number
            v-if="form.workDays === '其他'"
            v-model="form.otherworkDays"
            style="width: 240px"
          />
        </el-form-item>

        <el-form-item label=" 換宿日工時">
          <el-input-number v-model="form.workHours" style="width: 240px" />
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <h5 class="mb-4">心得分享</h5>
      <el-form label-position="top" label-width="100px" :model="form">
        <el-form-item label="優點福利">
          <el-check-tag
            :checked="advantage.status"
            @change="changeAdvantage(advantage)"
            v-for="advantage in form.advantages"
            :key="advantage.value"
            class="me-1 mb-1"
            >{{ advantage.value }}</el-check-tag
          >
        </el-form-item>
        <el-form-item label="有待改善">
          <el-check-tag
            :checked="disAdvantage.status"
            @change="changeDisadvantage(disAdvantage)"
            v-for="disAdvantage in form.disAdvantages"
            :key="disAdvantage.value"
            class="me-1 mb-1"
            >{{ disAdvantage.value }}</el-check-tag
          >
        </el-form-item>
        <el-form-item label="整體評分"> <el-rate v-model="form.score" size="large" /></el-form-item>
        <el-form-item label="換宿內容分享">
          <el-input
            v-model="form.description"
            :rows="5"
            type="textarea"
            placeholder="分享你的換宿生活，有關店家環境、工作狀況和換宿生活等"
        /></el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div v-if="modalPage === 1">
        <el-button type="primary" @click="modalPage = 2"> 下一頁 </el-button>
      </div>
      <div v-else>
        <el-button @click="modalPage = 1"> 上一頁 </el-button>
        <el-button type="primary" @click="submitComment"> 送出</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '@/stores/useCommentStore';

// commentStore
const commentStore = useCommentStore();
const { modalPage, form, isOpen } = storeToRefs(commentStore);
const { submitComment, closeModal } = commentStore;

// anonymous
const anonymous = ref('匿名');
watch(anonymous, () => {
  form.anonymous = anonymous.value === '匿名';
});

// year selection
const nowYear = new Date().getFullYear();
const lastYears = [];
for (let i = 0; i < 50; i += 1) {
  lastYears.push(nowYear - i);
}
const workDays = [
  {
    value: '一週',
    label: '一週',
  },
  {
    value: '二週',
    label: '二週',
  },
  {
    value: '三週',
    label: '三週',
  },
  {
    value: '一個月',
    label: '一個月',
  },
  {
    value: '三個月',
    label: '三個月',
  },
  {
    value: '半年',
    label: '半年',
  },
  {
    value: '一年',
    label: '一年',
  },
  {
    value: '其他',
    label: '其他',
  },
];

// advantage tag
const changeAdvantage = (newAdvantage) => {
  form.value.advantages.forEach((item, index) => {
    if (newAdvantage.value === item.value) {
      form.value.advantages[index].status = !form.value.advantages[index].status;
    }
  });
};

// disAdvantage tag
const changeDisadvantage = (newDisadvantage) => {
  form.value.disAdvantages.forEach((item, index) => {
    if (newDisadvantage.value === item.value) {
      form.value.disAdvantages[index].status = !form.value.disAdvantages[index].status;
    }
  });
};

// submitComment
// const submit = async () => {
//   await submitComment(form.value, form.value.id);
//   closeModal(storeId.value);
// };

const handleClose = (done) => {
  ElMessageBox.confirm('資料將不會保留，確定離開嗎？').then(() => {
    done();
    closeModal();
  });
};
</script>
