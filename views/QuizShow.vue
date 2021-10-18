<template>
    <h1>{{quiz.name}}</h1>
    <p>{{quiz.description}}</p>

</template>

<script>
import sourceData from '@/data.json'

export default {
    computed:{
        quizId(){
            return parseInt(this.$route.params.id)
        },
        quiz(){
            return sourceData.quizzes.find(quiz =>quiz.id === this.quizId)
        }
    }
}
</script>
