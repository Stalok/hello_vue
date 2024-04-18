<template>
  <main>
  <section class="directory">
    <el-col :span="12">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="!isCollapse"><el-icon><View /></el-icon>Directory</el-radio-button>
      </el-radio-group>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
      >
        <el-sub-menu v-for="item in directory" :key="item.name" :index="item.name" >
          <template #title>
            <el-icon><location /></el-icon>
            <el-text truncated>{{ item.name }}</el-text>
          </template>
          <el-menu-item v-for="lesson in item.lessonViewList" :key="lesson.name" :index="lesson.name" @click="startLesson(lesson.id, lesson.name)">
            <el-icon><document v-if="lesson.type === 'text'"/></el-icon>
            <el-icon><Monitor v-if="lesson.type === 'playground'"/></el-icon>
            <el-text truncated>{{ lesson.name }}</el-text>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </section>
  <section class="lesson">
    <el-text size="large">{{ currentLesson }}</el-text>

    <div class="input-area">
      <el-input
          v-model="textarea"
          :rows="2"
          :autosize="{ minRows: 20, maxRows: 40 }"
          type="textarea"
          placeholder="Please input your sql here"
      />
      <el-button-group style="margin-top: 0.5rem">
        <el-button @click="run" style="margin-right: 0.5rem" type="primary">Run</el-button>
        <el-button @click="submit"type="success">Run and submit answer</el-button>
      </el-button-group>
    </div>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </section>
  </main>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Monitor, View,
} from '@element-plus/icons-vue'
import service from '@/utils/request.ts';
import {ref, toRefs} from "vue";
import {ElMessage} from "element-plus";

const isCollapse = ref(true)
let directory = ref([])
service.get('/courses').then(
  (res) => {
    directory.value = res.data
    console.log(res.data)
  },
  (err) => {
    ElMessage.error(err)
  }
)

let currentLesson = ref("")
let currentQuiz = ref(0)
const startLesson = (id: number, name: string) => {
  service.post('/playground/new/' + id).then(
    (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data)
      }
      currentQuiz.value = res.data
      currentLesson.value = name
      console.log(currentQuiz.value);
    },
    (err) => {
      ElMessage.error(err.response.data)
    }
  )
}

const textarea = ref('')
</script>

<style scoped lang="scss">

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 20rem;
}
main {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  background-color: #c5fffa;
}
.input-area {
  margin-top: 3rem;
  margin-left: 1rem;
  width: 80vw;
}
</style>
