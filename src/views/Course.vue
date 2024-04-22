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
          <el-menu-item v-for="lesson in item.lessonViewList" :key="lesson.name" :index="lesson.name" @click="startLesson(lesson.id)">
            <el-icon><document v-if="lesson.type === 'text'"/></el-icon>
            <el-icon><Monitor v-if="lesson.type === 'playground'"/></el-icon>
            <el-text truncated>{{ lesson.name }}</el-text>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </section>
  <section class="lesson">
    <el-container class="sql-area">
      <el-aside width="20vw" style="background-color: azure">
        <el-text>{{currentQuiz.question}}</el-text>
      </el-aside>
      <el-main>
        <div class="input-area">
        <el-input
            v-model="textarea"
            :rows="2"
            :autosize="{ minRows: 20, maxRows: 40 }"
            type="textarea"
            placeholder="Please input your sql here"
        />
        <el-button-group style="margin-top: 0.5rem">
          <el-button @click="executeSql" style="margin-right: 0.5rem" type="primary">Run</el-button>
          <el-button @click="submit" style="margin-right: 0.5rem" type="success">Submit answer</el-button>
          <el-button @click="nextQuiz" style="margin-right: 0.5rem" type="warning">Next</el-button>
          <el-button @click="endPlayground" type="danger">End the lab</el-button>
        </el-button-group>
      </div>
        <el-container class="result">
          <el-header>Result</el-header>
          <el-main>
            <table>
              <tr v-for="row in resultTable">
                <td v-for="column in row">{{ column }}</td>
              </tr>
            </table>
          </el-main>
        </el-container>
      </el-main>
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

const isCollapse = ref(false)
let directory = ref([])
service.get('/courses').then(
  (res) => {
    directory.value = res.data
    // console.log(res.data)
  },
  (err) => {
    ElMessage.error(err)
  }
)

let currentQuiz = ref(0)
const startLesson = (id: number) => {
  service.post('/playground/new/' + id).then(
    (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data)
      }
      currentQuiz.value = res.data
      // console.log(currentQuiz.value);
    },
    (err) => {
      ElMessage.error(err.response.data)
    }
  )
}

const textarea = ref('')
const resultTable = ref([])
const executeSql = () => {
  service.put('/playground/sql?sql='.concat(textarea.value)).then(
    (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data)
      }
      resultTable.value = res.data
      console.log(res.data)
    },
    (err) => {
      ElMessage.error(err.response.data)
    }
  )
}

const submit = () => {
  service.post('/playground/check?answer='+ textarea.value).then(
    (res) => {
      ElMessage.success(res.data)
      console.log(textarea.value)
      nextQuiz()
    },
    (err) => {
      ElMessage.error(err.response.data)
    }
  )
}

const nextQuiz = () => {
  if (currentQuiz.question === 'You have finished the playground'){
    endPlayground();
    startLesson(currentQuiz.value.lessonId + 1)
    return
  }
  service.post('/playground/continue').then(
    (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data)
      }
      currentQuiz.value = res.data

    },
    (err) => {
      ElMessage.error(err.response.data)
    }
  )
}

const endPlayground = () => {
  service.delete('/playground').then(
    (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data)
      }
      // ElMessage.success(res.data)
      textarea.value = ''
      currentQuiz.question = ''
    },
    (err) => {
      ElMessage.error(err.response.data)
    }
  )
}
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
  width: 60vw;
}

.sql-area {
  display: flex;
  flex-wrap: wrap;
}

.result {
  height: 40vh;
}
</style>
