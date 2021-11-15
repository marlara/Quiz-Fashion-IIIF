<template>
    <div class="quizImage">
            <div class="ImageArea">
                <img :src="src">
                <br/>
                {{ src }} this is width {{ width }} and this is height {{ height }}
                <br />

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
            height: 0
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
        },

        methods: {
        imageCreate: function() { 
            const iiif = this.iiif;
            let image = new Image(); //create an HTMLImageElement, see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
            image.onload = (event) => {
            this.width = event.target.width;
            this.height = event.target.height;
            this.src = event.target.src;
            }
            image.src = iiif; 
        },

    /*imageCrop: function(){
        let imageParts = [];

        let height = this.width;
        let width = this.width;
        let tileDimension = (width/6) + ","//+ (height/6)
        let tileWidth = width / 3;
        let tileHeight = height / 2;
        for (let y = 0; y < 2; y++) {
            let offsetY = y * height / 2; 
            for (let x = 0; x < 3; x++) { 
                let offsetX = x * width / 3;
                imageParts.push(.replace("full/,550", offsetX +","+ offsetY +","+ tileWidth +","+ tileHeight + "/" + tileDimension));
            }
        }
      }*/
    }
    }
</script>
