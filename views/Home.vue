<template>
  <div class="rectangle_title">
    <h1 style="margin-left: 20px">Quanto conosci la storia della moda e del design?</h1>
  </div>

  <img class="home_image" src="@/assets/versace_logo_ritagliato_nero.png" />

  <div class="homeDescription">
    <p>Hai letto tutta la mostra? Allora sei pronto per questo quiz!<br/> Clicca sul bottone sotto e inizia.<br/>Ad ogni risposta corretta si comporrà un pezzo del puzzle. Se risponderai correttamente a tutto avrai la figura intera!</p>
    <div class="quizzes">
    <router-link 
      v-for="quiz in quizzes"
      :key="quiz.id"
      :to="{name: 'quiz.show', params:{id: quiz.id}}"
    >
    <h2 class="highlight-quiz"><!--{{quiz.name}}-->Inizia</h2>
    </router-link>
    </div>
  </div>
  <div class="clear"></div>

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
