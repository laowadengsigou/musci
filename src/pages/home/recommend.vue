<config>
    {
    "usingComponents": {
    "van-row": "../../native/vant/row/index",
    "van-col": "../../native/vant/col/index"
    }
    }
</config>
<template>
    <div class="dv">
        <div class="fl">
            <div style="width: 350rpx;margin-left: 5%">{{title}}</div>
            <div class="title1">{{title1}}</div>
        </div>
            <div class="row">
                <div v-for="(item,index) in result" class="big">
                        <img :src="item.picUrl" alt="" v-if="item.picUrl" class="tu">
                    <img :src="item.song.album.blurPicUrl" alt="" class="tu" v-if="item.picUrl === null && item.song.album.blurPicUrl">
                    <img :src="item.coverUrl" alt="" v-if="item.coverUrl" class="tu">
                    <div class="text">{{item.name}}</div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: "recommend",
        components: {},
        props: {
            result:{
                type:Array
            },
            // neww:{
            //     type:Array
            // },
            // radio:{
            //     type:Array
            // },
            // programs:{
            //     type:Array
            // },
            title:{
                type: String
            },
            title1:{
                type:String
            }
        },
        data() {
            return {

            }
        },
        methods: {},
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
    .dv{
        margin-top:5%;
    }
.title1{
    margin-left: 25%;
    width: 150rpx;
    border-radius:20rpx;
    background-color:gainsboro;
    text-align: center;
}
    .fl{
        display: flex;
    }
    .box{
        margin-top:1%;
    }
    .text{
        width:100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;

    }
    .row{
        display: flex;
        flex-wrap: wrap;
    }
    .big {
        width: 30%;
        margin:5rpx 8rpx;
        height: 270rpx;
        &:first-child{
            margin-left: 8rpx;
        }
    }
    .tu{
        width:100%;
        height:80%;
        padding: 0 15rpx;
        border-radius:15%
    }
</style>
