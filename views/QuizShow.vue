<template>
    <h1>{{quiz.name}}</h1>
    <p>{{quiz.description}}</p>

    <GoBack />

</template>

<script>
import sourceData from '@/data.json'
import GoBack from '@/components/GoBack.vue'

export default {
    components: {GoBack},
    props:{
        id: {type: String, required: true}
    },
    computed:{
        quiz(){
            return sourceData.quizzes.find(quiz =>quiz.id === parseInt(this.id))
        }
    }
}
</script>
