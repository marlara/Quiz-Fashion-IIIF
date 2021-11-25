<template>
    <div>
        <h1>{{quiz.name}}</h1>
        <GoBackButton />
        <p>{{quiz.description}}</p>
    </div>
    <div class="quizForm">
        <div class="quizQuestContainer">
            <div class="quizQuestions" v-for="(question, index) in quiz.questions"
                :key = index
            >
                <!-- Hide all questions, show only the one with index === to current question index -->
                <div v-if="index === questionIndex">
                    <h2>{{ question.text }}</h2>
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
                    <button v-if="questionIndex > 0" v-on:click="prev">
                        prev
                    </button>
                    <button v-on:click="next">
                        next
                    </button>
                     {{userResponse}}
                     {{correctAnswers}}
                </div>
            </div>
            <div v-if="questionIndex === quiz.questions.length">
                <h2> Quiz finished</h2>
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
        }
        this.questionIndex++;
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
      this.correctAnswers.pop()
    }

  }
}
</script>


