<template>
    {{ dialogVisible }}
    <el-dialog v-model="dialogVisible" width="60%" :before-close="closeModal">
      <h2 class="text-dark">
        評論撰寫 <span class="text-grey">({{ nowPage }}/2)</span>
      </h2>
      <div v-if="nowPage === 1">
        <h5 class="mb-4">填寫基本資訊</h5>
        <el-form label-position="top" label-width="100px" :model="form">
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
              @change="onChange(advantage)"
              v-for="advantage in advantageArr"
              :key="advantage.value"
              class="me-1 mb-1"
              >{{ advantage.value }}</el-check-tag
            >
          </el-form-item>
          <el-form-item label="有待改善">
            <el-check-tag
              :checked="disAdvantage.status"
              @change="changeDisAdvantage(disAdvantage)"
              v-for="disAdvantage in disAdvantageArr"
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
        <div v-if="nowPage === 1">
          <el-button type="primary" @click="nowPage = 2"> 下一頁 </el-button>
        </div>
        <div v-else>
          <el-button @click="nowPage = 1"> 上一頁 </el-button>
          <el-button type="primary" @click="submitComment"> 送出</el-button>
        </div>
      </template>
    </el-dialog>
  </template>

<script setup>
import { watch, reactive, ref } from 'vue';
import axios from 'axios';

// "comments": [
//     {
//       "storeId": 1,
//       "userId": 1,
//       "anonymous": false,
//       "createDate": 1684831753,
//       "workHours": 3,
//       "workDays": 14,
//       "advantages": ["店家環境佳", "居住環境佳"],
//       "disadvantages": ["換宿制度不完整"],
//       "score": 1,
//       "description": "在換宿旅行中，我認識了許多來自世界各地的旅人，和他們分享了不同文化。",
//       "like": [],
//       "dislike": [],
//       "replies": []
//     },

// form
const form = reactive({
  storeId: 1,
  userId: null,
  anonymous: true,
  createDate: 0,
  workHours: 0,
  workDays: '',
  otherworkDays: 0,
  advantages: [],
  disadvantages: [],
  score: 0,
  description: '',
  like: [],
  dislike: [],
  replies: [],
});

//
const anonymous = ref('匿名');
watch(anonymous, () => { form.anonymous = anonymous.value === '匿名'; });

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
const advantages = [
  '店家環境佳',
  '交通位置佳',
  '職員友善',
  '換宿制度完整',
  '居住環境佳',
  '免費供餐',
  '補助餐費 / 零用金',
  '考取證照',
  '體驗課程',
];
const advantageArr = reactive([]);
for (let i = 0; i < advantages.length; i += 1) {
  const advantageObject = {
    value: advantages[i],
    status: false,
  };
  advantageArr.push(advantageObject);
}
const onChange = (advantage) => {
  advantageArr.forEach((item, index) => {
    if (item.value === advantage.value) {
      advantageArr[index].status = !advantageArr[index].status;
    }
  });
};
watch(advantageArr, () => {
  form.advantages = [];
  for (let i = 0; i < advantageArr.length; i += 1) {
    if (advantageArr[i].status === true) {
      form.advantages.push(advantageArr[i].value);
    }
  }
});

// disSdvantage tag
const disAdvantages = [
  '店家環境差',
  '交通位置不便',
  '職員不友善',
  '換宿制度不完整',
  '居住環境差',
  '換宿狀況與描述不符',
  '工時過長',
  '性騷擾',
];
const disAdvantageArr = reactive([]);
for (let i = 0; i < disAdvantages.length; i += 1) {
  const disAdvantageObject = {
    value: disAdvantages[i],
    status: false,
  };
  disAdvantageArr.push(disAdvantageObject);
}
const changeDisAdvantage = (disAdvantage) => {
  disAdvantageArr.forEach((item, index) => {
    if (item.value === disAdvantage.value) {
      disAdvantageArr[index].status = !disAdvantageArr[index].status;
    }
  });
};
watch(disAdvantageArr, () => {
  form.disAdvantages = [];
  for (let i = 0; i < disAdvantageArr.length; i += 1) {
    if (disAdvantageArr[i].status === true) {
      form.disAdvantages.push(disAdvantageArr[i].value);
    }
  }
});

// modal page
const nowPage = ref(1);

// close modal
const props = defineProps({
  modalVisible: Boolean,
});
const emits = defineEmits(['closeModal']);
const dialogVisible = ref(false);
watch(props, (prop) => {
  dialogVisible.value = prop.modalVisible;
});
const closeModal = () => {
  dialogVisible.value = false;
  emits('closeModal', false);
};

// submitComment
const submitComment = () => {
  form.createDate = new Date().getTime();
  axios.post('http://localhost:3000/comments', JSON.parse(JSON.stringify(form))).then((res) => res.data);
};
</script>
