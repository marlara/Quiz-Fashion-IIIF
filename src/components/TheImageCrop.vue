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
                <img :src="imageParts">
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
            imageParts: null,
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
            this.imagePartsCreate();

        },
        created() {
            this.getManifest();
            this.imageCreate();
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        unmounted() {
            window.removeEventListener('resize', this.handleResize);
        },

        methods: {
        imageCreate: function() { 
            const iiif = this.iiif.replace("full/full", "full/,550");
            let image = new Image(); //create an HTMLImageElement, see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
            image.onload = (event) => {
            //this.width = event.target.width;
            //this.height = event.target.height;
            this.src = event.target.src;
            }
            image.src = iiif; 
        },
        
        getManifest: function() {
            var axios = require('axios').default; //use the default, see https://github.com/axios/axios/issues/3012

            axios.get(this.iiif.replace("f1/full/full/0/native.jpg", "manifest.json"))
            .then(response => (
                this.canvas = response.data.sequences[0].canvases[0].images[0].resource,
                this.width = this.canvas.width,
                this.height = this.canvas.height
                ))
            .catch(error => 
                console.log(error)
                );
        },

         handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },

        imagePartsCreate: function(){
            var gridSize = 3;
            var maxWidth = this.window.width / 2;
            var maxHeight = this.window.height - 100;
            if ( (this.height / this.width) > (maxHeight / maxWidth) ) {
                this.scalePct = Math.min(maxHeight / this.height, 1);
            } else {
                this.scalePct = Math.min(maxWidth / this.width, 1);
            }
            
            var regionWidth = Math.floor(this.width / gridSize);
            var regionHeight = Math.floor(this.height / gridSize);
            var tileWidth = Math.ceil(this.width * this.scalePct / gridSize);
            var tileHeight = Math.ceil(this.height * this.scalePct / gridSize);

            var xywh = [regionWidth, regionHeight].join(',');
            var size = tileWidth + "," + tileHeight;
            this.imageParts = this.iiif.replace("full/full", "0,0,"+xywh + "/" + size);

        }
    }
}
</script>
