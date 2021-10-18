<template>
  <h1>Home Page</h1>

  <div class="quizzes">
    <router-link 
      v-for="quiz in quizzes"
      :key="quiz.id"
      :to="{name: 'quiz.show', params:{id: quiz.id}}"
    >
    <h2>{{quiz.name}}</h2>
    <img :src="`/images/${quiz.image}`" :alt="quiz.name">
    </router-link>
  </div>

</template>

<script>
import sourceData from '@/data.json'

export default {
  data() {
    return{
      quizzes: sourceData.quizzes
    }
  },
}

</script>
