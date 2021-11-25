<template>
    <div class="quizImage">
            <div class="ImageArea" >
                <div :class="`row-${index+1}`" v-for="(imagePart, index) in this.sequence"  
                :key="index"
                >
                    <img v-for="(imgValue, imgKey) in imagePart" :class="[`imagePart-${imgKey}`, changeClass(imgKey)]"
                    :key="imgKey" 
                    :src="imgValue"
                    > 
                </div>
            </div>
            <br/>
            <br/>
            this is width {{ width }} and this is height {{ height }}
            <br />
            window width: {{ window.width }}; window height: {{ window.height }}
            <br />
        </div>
</template>

<script>
//import { forEach } from 'lodash';

export default {
    name: 'ImageCrop',
    props: {
        quizId: {type: String, required: true},
        iiif: {type: String, required: true},
        correctAnswers: {type: Array, required: false}
    },

    data(){
        return {
            src: "",
            width: 0,
            height: 0,
            sequence: [],
            window: {
                width: 0,
                height: 0
            },
            answers: [0,3]
        }
    },

    computed:{
        get(){
            return this.quizId;
            },
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        mounted(){
            this.imagePartsCreate();
        },

        unmounted() {
            window.removeEventListener('resize', this.handleResize);
        },
        watch: { //changes the imageParts if the iiif prop changes
            iiif: {
                handler(){
                    this.sequence = [];
                    this.imagePartsCreate();
                },
                immediate: false, //if true gets doubled on refresh
            },
        },
       
        

        methods: {
            handleResize() { 
                //gets the window size
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
        
            async getManifest() {
                //the async wait is important here and in the imagePartsCreate because it waits for the data to be fetched
                //gets the manifest and the native width and height from it
                var axios = require('axios').default; //use the default, see https://github.com/axios/axios/issues/3012

                await axios.get(this.iiif.replace("f1/full/full/0/native.jpg", "manifest.json"))
                .then(response => (
                    this.canvas = response.data.sequences[0].canvases[0].images[0].resource,
                    this.width = this.canvas.width,
                    this.height = this.canvas.height
                    ))
                .catch(error => 
                    console.log(error)
                    );
                    return [this.width, this.height]
            },
        
            async imagePartsCreate(){
                [this.width, this.height] = await this.getManifest();
                var gridSize = 3;
                var imageParts = {};

                
                //sets the maximum width and height, based on the window size
                var maxWidth = this.window.width / 2;
                var maxHeight = this.window.height - 100;
                if ( (this.height / this.width) > (maxHeight / maxWidth) ) {
                    this.scalePct = Math.min(maxHeight / this.height, 1);
                } else {
                    this.scalePct = Math.min(maxWidth / this.width, 1);
                }

                //composes the region
                var regionWidth = Math.floor(this.width / gridSize);
                var regionHeight = Math.floor(this.height / gridSize);
                
                //composes the size of the files
                var tileWidth = Math.ceil(this.width * this.scalePct / gridSize);
                var tileHeight = Math.ceil(this.height * this.scalePct / gridSize);

                var seq = 0;
                for (let row = 0; row < gridSize; row++){
                    for (let col = 0; col < gridSize; col++){
                        //sets the manifest with the composed elements
                        var xywh = [col * regionWidth, row * regionHeight, regionWidth, regionHeight].join(',');
                        var size = tileWidth + "," + tileHeight;
                        imageParts[seq] = this.iiif.replace("full/full", xywh + "/" + size);
                        seq++;
                        if (seq % gridSize === 0) { //create the sequence array
                            this.sequence.push(imageParts);
                            imageParts = {};
                        }
                    }
                }
            },

             changeClass(imgKey){
                for (let el of this.correctAnswers) {
                    if (imgKey == el){ //with === doesn't work
                        return "active"
                    }
                }
             }
        

    }
}
</script>
