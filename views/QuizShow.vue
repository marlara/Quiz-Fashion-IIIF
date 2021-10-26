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
                        <li v-for="(response, index) in question.responses"
                            :key = index
                        >
                        <label>
                            <!-- The radio button has three new directives -->
                            <!-- v-bind:value sets "value" to "true" if the response is correct -->
                            <!-- v-bind:name sets "name" to question index to group answers by question -->
                            <!-- v-model creates binding with userResponses -->
                            <input type="radio" 
                                :value="[response.res_value === question.solution]"
                                :name="index" 
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
                </div>
            </div>
            <div v-if="questionIndex === quiz.questions.length">
                <h2> Quiz finished</h2>
            </div>
        </div>

        <div class="quizImage">
           <img :src="imageCrop(quiz.iiif)">
           <!--{{ imageCrop(quiz.iiif) }}-->
        </div>
    </div>
</template>

<script>
import sourceData from '@/data.json'
import GoBackButton from '@/components/GoBackButton.vue'

export default {
    components: {
        GoBackButton,
        },
    props:{
        id: {type: String, required: true}
    },
    data(){
        return {
            questionIndex: 0
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
      this.questionIndex++;
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    },

    imageCrop: function(iiif) { 
        let image = new Image(); //create an HTMLImageElement, see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
        image.src = iiif; //set the source of image as the iiif
        let width =  Math.floor(image.width/3); //get width and height and divide them
        let height = Math.floor(image.height/2);
        //return "this is width " + width + " and this is height " + height
        
        let cropped = iiif.replace("full", "0,0," + width + "," + height);
        return cropped
    }
  }
}
</script>
