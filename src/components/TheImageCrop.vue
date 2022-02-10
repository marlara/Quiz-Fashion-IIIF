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
        </div>
</template>

<script>

export default {
    name: 'ImageCrop',
    props: {
        quizId: {type: String, required: true},
        iiif: {type: String, required: true},
        correctAnswers: {type: Array, required: false},
        manifest: {type: String, required: true}
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
            }
        }
    },
    

    //THIS IS NOT NEEDED WITH THE <router-view :key="$route.path"> IN APP MAIN (and is lighter)
    /*watch: { //changes the imageParts if the iiif prop changes 
        iiif: {
            handler(){
                this.sequence = [];
                this.imagePartsCreate();
            },
            immediate: false, //if true gets doubled on refresh
        },
    },*/

    computed:{
        get(){
            return this.quizId;
            },
        },
        mounted(){
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
            this.imagePartsCreate();
        },
        unmounted() {
            window.removeEventListener('resize', this.handleResize);
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
                const axios = require('axios').default; //use the default, see https://github.com/axios/axios/issues/3012

                await axios.get(this.manifest)
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
                const gridSize = 3;
                let imageParts = {};

                
                //sets the maximum width and height, based on the window size
                let maxWidth = this.window.width / 2;
                let maxHeight = this.window.height - 200;
                if ( (this.height / this.width) > (maxHeight / maxWidth) ) {
                    this.scalePct = Math.min(maxHeight / this.height, 1);
                } else {
                    this.scalePct = Math.min(maxWidth / this.width, 1);
                }

                //composes the region
                let regionWidth = Math.floor(this.width / gridSize);
                let regionHeight = Math.floor(this.height / gridSize);
                
                //composes the size of the files
                let tileWidth = Math.ceil(this.width * this.scalePct / gridSize);
                let tileHeight = Math.ceil(this.height * this.scalePct / gridSize);

                let seq = 0;
                for (let row = 0; row < gridSize; row++){
                    for (let col = 0; col < gridSize; col++){
                        //sets the manifest with the composed elements
                        let xywh = [col * regionWidth, row * regionHeight, regionWidth, regionHeight].join(',');
                        let size = tileWidth + "," + tileHeight;
                        imageParts[seq] = this.iiif.replace("full/max", xywh + "/" + size);
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
