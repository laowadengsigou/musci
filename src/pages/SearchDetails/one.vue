<template>
    <div>
        <div v-for="(item,index) in singer">
            <div class="dv">
                <div>
                    <img :src="item.blurPicUrl" alt="" class="img">
                </div>
                <div class="text">
                    <div>
                        {{item.name}}
                    </div>
                    <div class="text1">
                        {{item.artists[0].name}} {{item.publishTime}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "one",
        components: {},
        props: {
            singer:{
                type:Array
            }
        },
        data() {
            return {}
        },
        methods: {
        },
        mounted() {
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.img{
    width: 150rpx;
    height: 150rpx;
}
    .dv{
        display: flex;
        margin-left: 3%;
        margin-top: 5%;
    }
    .text{
        margin-left: 3%;
        margin-top: 5%;
    }
    .text1{
        color: gainsboro;
    }
</style>
