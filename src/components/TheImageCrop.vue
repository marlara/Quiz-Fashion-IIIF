<template>
    <div class="quizImage">
            <div class="ImageArea">
                <img :src="src">
                <br/>
                {{ src }} this is width {{ width }} and this is height {{ height }}
                <br />
                window width: {{ window.width }}; window height: {{ window.height }}
                <br />
                {{imageParts}}
                <br />
                <img v-for="(imagePart, index) in imageParts" :key=index
                    :src="imagePart">
            </div>

        </div>
</template>

<script>

export default {
    name: 'ImageCrop',
    props: {
        quizId: {type: String, required: true},
        iiif: {type: String, required: true}
    },

    data(){
        return {
            src: "",
            width: 0,
            height: 0,
            imageParts: [],
            window: {
                width: 0,
                height: 0
            }
        }
    },

    computed:{
        get(){
            return this.quizId;
            },
        },
        updated() {
            this.imageCreate();
        },
        created() {
            this.imageCreate();
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },

        mounted(){
            this.imagePartsCreate();
        },

        unmounted() {
            window.removeEventListener('resize', this.handleResize);
        },

        methods: {
        imageCreate: function() {
            //just loads the  
            const iiif = this.iiif.replace("full/full", "full/,550");
            let image = new Image(); //create an HTMLImageElement, see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
            image.onload = (event) => {
                this.src = event.target.src;
            }
            image.src = iiif; 
        },

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

            //sets the manifest with the new elements
            var xywh = [regionWidth, regionHeight].join(',');
            var size = tileWidth + "," + tileHeight;
            this.imageParts.push(this.iiif.replace("full/full", "0,0,"+xywh + "/" + size));

        }
    }
}
</script>
