<config>
    {
    "backgroundTextStyle": 'light',
    "navigationBarBackgroundColor": '#FF0000',
    "navigationBarTitleText": '歌手详情',
    "navigationBarTextStyle": 'black',
    "usingComponents": {
    "van-icon": "../../native/vant/icon/index"
    }
    }
</config>
<template>
    <div>
        <div style="text-align: center">{{name}}</div>
        <div style="position: relative">
            <img :src="picUrl" alt="" class="img">
            <div class="dv">
                <div style="margin-left: 10%;margin-top: 1%">
                    <img src="../../native/tabbar/播放.png" alt="" style="width: 50rpx;height: 50rpx;">
                </div>
                <div style="margin-left: 20%;line-height: 60rpx">随机播放全部</div>
            </div>
        </div>
        <div v-for="(item,index) in hotSongs" class="box" @click="click(item,index)">
            <div>{{index+1}}</div>
            <div class="text">
                <div class="text1">{{item.name}}</div>
                <div class="text2">{{item.ar[0].name}}•{{item.al.name}}</div>
            </div>
            <div>
                <van-icon name="play-circle-o" class="ima" size="50rpx"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "singerX",
        components: {},
        props: {},
        data() {
            return {
                name:"",
                id:{},//传过来的id
                hotSongs:[],
                picUrl:"",
                song: {}
            }
        },
        methods: {
            click(item,index){
                // console.log(item.id);
                // console.log(index);
                wx.navigateTo({
                  url: `../play/play?cid=${item.id}&id=${this.id}&index=${index}`
                })
            }
        },
        mounted() {

        },
        onLoad(options){
            this.id = options.id
            this.$fly.get(`/artists?id=${this.id}`).then(res=>{
                // console.log(res)
                this.song = res.data.artist
                this.name = this.song.name
                this.picUrl = this.song.picUrl
                this.hotSongs = res.data.hotSongs
            })
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
    width: 100%;
    margin-top: 3%;

}
    .dv{
        width: 50%;
        height: 60rpx;
        background-color: white;
        position: absolute;
        display: flex;
        top: 70%;
        left: 25%;
        border-radius: 30% 30%;
    }
    .box{
        display: flex;
        margin-top: 3%;
        margin-left: 3%;
    }
    .text{
        margin-left: 3%;
        width: 80%;
    }
    .text1{
        font-size: 30rpx;
    }
    .text2{
        color: gainsboro;
    }
</style>
