<template>
  <el-dialog v-model="isOpen"    style="width: 90%; max-width: 600px;
  overflow: hidden " :before-close="handleClose" >

  <div>
    <h2 class="text-dark">
      評論撰寫 <span class="text-grey">({{ modalPage }}/2)</span>
    </h2>
    <div v-if="modalPage === 1">
      <h5 class="mb-4">填寫基本資訊</h5>
      <el-form label-position="top" label-width="100px" :model="form" ref="formRef1" :rules="rule1">
        <el-form-item label="評論身份" prop="anonymous">
          <el-radio-group v-model="anonymous">
            <el-radio-button label="匿名" />
            <el-radio-button label="本人" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="換宿年份" prop="hoildayYear">
          <el-select v-model="form.hoildayYear" placeholder="選擇年份" style="width: 240px">
            <el-option v-for="year in lastYears" :key="year" :label="year" :value="year" />
          </el-select>
        </el-form-item>

        <el-form-item label="換宿周數" prop="workDays">
          <el-input-number v-model.number="form.workDays" style="width: 240px" :min="0" />
        </el-form-item>

        <el-form-item label=" 換宿日工時" prop="workHours">
          <el-input-number v-model.number="form.workHours" style="width: 240px" :min="0" />
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <h5 class="mb-4">心得分享</h5>
      <el-form label-position="top" label-width="100px" :model="form" ref="formRef2" :rules="rule2">
        <el-form-item label="優點福利">
          <el-check-tag
            :checked="advantage.status"
            @change="changeAdvantage(advantage)"
            v-for="advantage in form.advantages"
            :key="advantage.value"
            class="me-1 mb-1 check-tag"
            >{{ advantage.value }}</el-check-tag
          >
        </el-form-item>
        <el-form-item label="有待改善">
          <el-check-tag
            :checked="disAdvantage.status"
            @change="changeDisadvantage(disAdvantage)"
            v-for="disAdvantage in form.disAdvantages"
            :key="disAdvantage.value"
            class="me-1 mb-1 check-tag"
            >{{ disAdvantage.value }}</el-check-tag
          >
        </el-form-item>
        <el-form-item label="整體評分" prop="score">
          <el-rate v-model="form.score" size="large"
        /></el-form-item>
        <el-form-item label="換宿內容分享" prop="description">
          <el-input
            v-model="form.description"
            :rows="5"
            type="textarea"
            placeholder="分享你的換宿生活，有關店家環境、工作狀況和換宿生活等"
        /></el-form-item>
      </el-form>
    </div>
  </div>

    <template #footer>
      <div v-if="modalPage === 1">
        <el-button type="primary" @click="toNextPage"> 下一頁 </el-button>
      </div>
      <div v-else>
        <el-button @click="modalPage = 1"> 上一頁 </el-button>
        <el-button type="primary" @click="submit"> 送出</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '@/stores/useCommentStore';
import { useUserStore } from '@/stores/useUserStore';

// userStore
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// commentStore
const commentStore = useCommentStore();
const { modalPage, form, isOpen } = storeToRefs(commentStore);
const { submitComment, closeModal } = commentStore;

// anonymous
const anonymous = ref('匿名');
watch(anonymous, async () => {
  if (anonymous.value === '匿名') {
    form.value.userId = 0;
  } else if (anonymous.value === '本人') {
    if (user.value.id === 0) {
      ElMessageBox.confirm(
        '尚未登入',
        '請先登入帳號',
        {
          confirmButtonText: 'OK',
          cancelButtonText: '取消',
          type: 'warning',
        },
      ).then(
        () => { anonymous.value = '匿名'; },
      );
    } else {
      form.value.userId = user.value.id;
    }
  }
});

// year selection
const nowYear = new Date().getFullYear();
const lastYears = [];
for (let i = 0; i < 50; i += 1) {
  lastYears.push(nowYear - i);
}

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

// form rule
const formRef1 = ref(null);
const rule1 = reactive({
  anonymous: [
    {
      required: true,
      message: '請輸入必填內容',
      trigger: 'blur',
    },
  ],
  hoildayYear: [
    {
      required: true,
      message: '請輸入必填內容',
      trigger: 'change',
    },
  ],

  workDays: [
    {
      required: true,
      message: '請輸入必填內容',
      trigger: 'blur',
    },
    {
      type: 'number',
      message: '請輸入數字',
      trigger: 'blur',
    },
    {
      type: 'number',
      min: 1,
      message: '必須大於0',
      trigger: 'blur',
    },
  ],
  workHours: [
    {
      required: true,
      message: '請輸入必填內容',
      trigger: 'blur',
    },
    {
      type: 'number',
      message: '請輸入數字',
      trigger: 'blur',
    },
    {
      type: 'number',
      min: 1,
      message: '必須大於0',
      trigger: 'blur',
    },
  ],
});

const formRef2 = ref(null);
const rule2 = reactive({
  score: [
    {
      required: true,
      message: '請輸入必填內容',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '請輸入必填內容',
      trigger: 'blur',
    },
  ],
});

// toNextPage
const toNextPage = () => {
  formRef1.value.validate((valid) => {
    if (!valid) return;
    modalPage.value = 2;
  });
};

// submit
const submit = async () => {
  formRef2.value.validate((valid) => {
    if (!valid) return;
    if (formRef2.value) {
      formRef2.value.clearValidate();
    }
  });
  await submitComment();
};

// close modal
const handleClose = (done) => {
  ElMessageBox.confirm('資料將不會保留，確定離開嗎？').then(() => {
    done();
    if (formRef1.value) {
      formRef1.value.clearValidate();
    }
    if (formRef2.value) {
      formRef2.value.clearValidate();
    }
    closeModal();
  });
};
</script>
