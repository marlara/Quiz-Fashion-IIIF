<template>
    <div class="quizTitle">
        <h1>{{quiz.name}}</h1>
    </div>
    <div class="quizDescription">
        <GoBackButton />
        <!--<p>{{quiz.description}}</p> -->
        <p>Rispondi alle domande. Ad ogni risposta corretta si comporrà un pezzo dell'immagine. Se risponderai correttamente a tutto, avrai una figura intera!</p>
    </div>
    <div class="quizForm" :key="componentKey"> <!--how to force re-render https://michaelnthiessen.com/force-re-render/-->
        <div class="quizQuestContainer">
            <div v-for="(question, index) in quiz.questions"
                :key = index
            >
                <!-- Hide all questions, show only the one with index === to current question index -->
                <div class="quizQuestion" v-if="index === questionIndex">
                    <h2> Domanda {{ questionIndex+1 }}</h2>
                    <p class="question"> {{ question.text }} </p>
                    <ol>
                        <!-- The radio button has three new directives -->
                            <!-- v-bind:value sets "value" to "true" if the response is correct -->
                            <!-- v-bind:name sets "name" to question index to group answers by question. The radio group must have share the same name (the value of the name attribute) to be treated as a group. Once the radio group is created, selecting any radio button in that group automatically deselects any other selected radio button in the same group. You can have as many radio groups on a page as you want, as long as each group has its own name. -->
                            <!-- v-model creates binding with userResponses -->
                        <li v-for="(response, index) in question.responses"
                            :key = index
                        >
                        <label>
                            <input type="radio"
                                :value="[response.res_value === true]"
                                :name="response.res_number" 
                                v-model="userResponse"
                            > {{response.res_text}}
                        </label>
                        </li>
                    </ol>
                    <!-- The two navigation buttons -->
                    <!-- Note: prev is hidden on first question -->
                    <button :disabled="questionIndex < 1" aria-label="go to previous" @click="prev">
                        prev
                    </button>
                    <button :disabled="!userResponse" aria-label="go to next" @click="next">
                        next
                    </button>
                     {{userResponse}}
                     {{correctAnswers}}
                </div>
            </div>
            <div class="quizQuestion" v-if="questionIndex === quiz.questions.length">
                <h2>Hai finito il quiz!</h2>
                <p>Le risposte corrette sono state: {{this.correctAnswers.length}} / {{ quiz.questions.length }} </p>
                <button @click="restart"> 
                    Voglio riprovare!
                </button>
            </div>
        </div>
        <ImageCrop 
            :quiz-id="this.id" 
            :iiif ="this.quiz.iiif"
            :correct-answers="this.correctAnswers"
        />
    </div>
</template>

<script>
import sourceData from '@/data.json'
import GoBackButton from '@/components/TheGoBackButton.vue'
import ImageCrop from '@/components/TheImageCrop.vue'

export default {
    components: {
        GoBackButton,
        ImageCrop
        },
    props:{
        id: {type: String, required: true}
    },

    data(){
        return {
            componentKey: 0,
            questionIndex: 0,
            userResponse: null, //this is the present radio selection
            correctAnswers: [] //this is the array of selected answers
        }
    },

    computed:{
        quiz(){
            return sourceData.quizzes.find(quiz =>quiz.id === parseInt(this.id))
            },
        },

    methods: {
    // Go to next question
    next: function() {
        if (this.userResponse[0] == true) { //if the selected answer is true then append to the array the index number
            this.correctAnswers.push(this.questionIndex)
            alert("Risposta corretta! :)");
        }
        else{
            alert("Risposta errata :(")
        }
        this.questionIndex++;
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
      this.correctAnswers.pop()
    },
    //Restart quiz
    restart:function(){
        this.componentKey += 1;
        this.questionIndex = 0,
        this.userResponse = null, //this is the present radio selection
        this.correctAnswers = [] //this is the array of selected answers
    }

  }
}
</script>


