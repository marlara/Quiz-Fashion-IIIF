<template>
  <header>
      <h1>1972. Moda, design, storia</h1>
      <div class="router">
        <a href="https://mostra1972.unipr.it">Torna alla mostra</a>
        <!--<router-link id="logo" to="/">Scegli il quiz</router-link> -->
        <router-link 
        v-for="quiz in quizzes"
        :key="quiz.id"
        :to="{name: 'quiz.show', params:{id: quiz.id}}" 
      >
      <!-- insert slug in params, see this lesson https://vueschool.io/lessons/named-routes -->
      {{quiz.name}}
      </router-link> 
      </div>
  </header>
</template>

<script>
import sourceData from '@/data.json'

export default{
  data(){
    return{
      quizzes: sourceData.quizzes
    }
  }
}
</script>
