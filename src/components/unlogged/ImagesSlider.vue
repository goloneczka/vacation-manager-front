<template>
    <div>
        <transition-group name="fade" tag="div">
            <div v-for="i in [currentIndex]" :key="i">
                <img v-bind:src="require(`../../assets/${currentImg}.png`)" />
            </div>
        </transition-group>
        <a class="prev" @click="change(-1)" href="#">&#10094; </a>
        <a class="next" @click="change(1)" href="#">&#10095; </a>
        <div id="slider">
            <form>
                <label class="radio-inline" >
                    <input type="radio" checked value="0" v-model="radio" @click="setCurrent" >
                </label>
                <label class="radio-inline" >
                    <input type="radio" v-model="radio" value="1" @click="setCurrent">
                </label>
                <label class="radio-inline" >
                    <input type="radio" v-model="radio" value="2" @click="setCurrent">
                </label>
                <label class="radio-inline" >
                    <input type="radio" v-model="radio" value="3" @click="setCurrent">
                </label>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImagesSlider",
        data() {
            return {
                images: [
                    's1',
                    's2',
                    's3',
                    's4'
                ],
                timer: null,
                currentIndex: 0,
                radio: 0
            };
        },

        mounted: function() {
            this.startSlide();
        },

        methods: {
            startSlide: function() {
                clearInterval(this.timer)
                this.timer = setInterval(this.change.bind(null, 1), 7000)
            },

            change: function(n) {
                if(this.currentIndex + n === this.images.length)
                    this.currentIndex = 0;
                else if (this.currentIndex + n === -1)
                    this.currentIndex = this.images.length -1;
                else
                    this.currentIndex += n
                this.radio = this.currentIndex;
                this.startSlide()
            },

            setCurrent: function (e) {
                this.currentIndex = parseInt(e.target.value)
                this.startSlide()
            }
        },

        computed: {
            currentImg: function() {
                return this.images[this.currentIndex];
            }
        },

    }
</script>

<style scoped>

    #slider {
        max-width: 600px;
        text-align: center;
        margin: 0 auto;
    }

    img {
        height:100%;
        width:100%
    }

    .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 40%;
        width: auto;
        padding: 16px;
        font-weight: bold;
        font-size: 18px;
        transition: 0.7s ease;
        border-radius: 0 4px 4px 0;
        text-decoration: none;
        user-select: none;
    }

    .next {
        right: 0;
    }

    .prev {
        left: 0;
    }

    .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.9);
    }
</style>