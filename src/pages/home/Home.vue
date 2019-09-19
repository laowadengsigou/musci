<config>
    {
    "backgroundTextStyle": 'light',
    "navigationBarBackgroundColor": '#FF0000',
    "navigationBarTitleText": '音乐馆',
    "navigationBarTextStyle": 'black'
    }
</config>

<template>
    <div>
        <div v-if="flag === false">
            <div class="header">
                <div style="margin-top: 20rpx;margin-left: 20rpx">音乐馆</div>
                <div>
                    <input type="text" placeholder="搜索" v-model="value" class="int" @click="int">
                </div>
                <div style="margin-top: 20rpx;margin-left: 20rpx">搜索</div>
                <div><img src="../../native/tabbar/top音乐.png" alt="" class="img"></div>
            </div>
            <div class="swiper">
                <swiper :autoplay="true" indicator-dots="true">
                    <div v-for="(item,index) in banners" :key="index">
                        <swiper-item>
                            <img :src="item.imageUrl" class="slide-image"/>
                        </swiper-item>
                    </div>
                </swiper>
            </div>
            <div>
                <div class="fl">
                    <div class="body">
                        <div>每日推荐</div>
                        <div><img src="../../native/tabbar/推荐报表.png" alt="" class="image"></div>
                    </div>
                    <div class="body">
                        <div style="text-align: center">歌单</div>
                        <div><img src="../../native/tabbar/音乐.png" alt="" class="image"></div>
                    </div>
                    <div class="body">
                        <div>排行榜</div>
                        <div><img src="../../native/tabbar/营业排行.png" alt="" class="image"></div>
                    </div>
                    <div class="body">
                        <div>电台</div>
                        <div><img src="../../native/tabbar/蚂蚁-电台.png" alt="" class="image"></div>
                    </div>
                    <div class="body">
                        <div>直播</div>
                        <div><img src="../../native/tabbar/直播.png" alt="" class="image"></div>
                    </div>
                </div>
            </div>
            <recommend :result="result" :title="title[0]" :title1="title1[0]"></recommend>
            <dish></dish>
            <recommend :result="neww"  :title="title[1]" :title1="title1[1]"></recommend>
            <recommend :result="radio" :title="title[2]" :title1="title1[2]"></recommend>
            <recommend :result="programs" :title="title[3]" :title1="title1[3]"></recommend>
        </div>
<!--        搜索-->
        <div v-else>
            <div style="display: flex">
                <div>
                    <input type="text" placeholder="搜索" v-model="value" class="ints">
                </div>
                <div style="margin-top: 20rpx;margin-left: 20rpx">搜索</div>
                <div style="margin-top: 20rpx;margin-left: 20rpx" @click="go">取消</div>
            </div>
            <div v-if="value === '' ">
                <div style="margin-top: 5%;margin-left: 3%">热搜榜</div>
                <div v-for="(item,index) in hots">
                    <div style="display: flex;margin-top: 5%">
                        <div class="so" :class="{sou: index === 0 || index === 1 || index === 2}">{{index+1}}</div>
                        <div class="first">{{item.first}}</div>
                        <div v-if="index === 0 || index === 1" class="hot">hot</div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div @click="jupe">
                    <div class="val">搜索"{{value}}"</div>
                    <div v-for="(item,index) in allMatch">
                        <div class="keyword">{{item.keyword}}</div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import recommend from "./recommend"
    import dish from "./dish"
    import search from './search'
    export default {
        name: "home",
        components: {
            recommend,
            dish,
            search
        },
        props: {},
        data() {
            return {
                value:"",
                flag:false,
                banners:[],//轮播图数据
                result:[],//推荐歌单
                neww:[],//新音乐
                radio:[],//推荐电台
                programs:[],//推荐节目
                title:["推荐歌单","音乐新势力","推荐电台",'推荐节目'],
                title1:["歌单广场","新音乐","电台广场","更多节目"],
                hots:[],//热搜
                allMatch:[]//搜索建议
            }
        },
        methods: {
            int(){
                this.flag = true
            },
            go() {
                this.flag = false
            },
            //热搜
            hot(){
                this.$fly.get("/search/hot").then(res=>{
                    this.hots = res.data.result.hots
                    // console.log(this.hots);
                }).catch(e=>{
                    console.log(e);
                })
            },
            jupe(){
                wx.navigateTo({
                  url: `../SearchDetails/SearchDetails?value=${this.value}`
                })
            }
        },
        mounted() {
            //轮播图接口
            this.$fly.get("/banner").then(res=>{
                this.banners = res.data.banners
                // console.log(this.banners);
            }).catch(e=>{
                console.log(e);
            })
            //推荐歌单接口
            this.$fly.get("/personalized").then(res=>{
                this.result = res.data.result.slice(0,6)
                // console.log(this.result);
            }).catch(e=>{
                console.log(e);
            })
            //新音乐
            this.$fly.get("/personalized/newsong").then(res=>{
                this.neww = res.data.result.slice(0,6)
                // console.log(this.neww);
            }).catch(e=>{
                console.log(e);
            })
            //推荐电台
            this.$fly.get("/personalized/djprogram").then(res=>{
                this.radio = res.data.result
                // console.log(this.radio);
            }).catch(e=>{
                console.log(e);
            })
            //推荐节目
            this.$fly.get("/program/recommend").then(res=>{
                this.programs = res.data.programs.slice(0,6)
                //
            }).catch(e=>{
                console.log(e);
            })
            //热搜
            this.hot()
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {
            value(val){
                if(val !== ""){
                    this.$fly.get("/search/suggest?keywords= "+val+"&type=mobile").then(res=>{
                        this.allMatch = res.data.result.allMatch
                        // console.log(this.allMatch);
                    }).catch(e=>{
                        console.log(e);
                    })
                }else {
                    val = ""
                }
            }
        },
        directives: {}
    }
</script>

<style scoped lang="scss">
.int{
    border:black solid 1rpx;
    border-radius: 50rpx;
    width: 400rpx;
    margin-top: 20rpx;
margin-left: 20rpx
}
.ints{
    border:black solid 1rpx;
    border-radius: 50rpx;
    width: 550rpx;
    margin-top: 20rpx;
    margin-left: 20rpx
}
    .img{
        width: 50rpx;
        height: 50rpx;
        margin-top: 20rpx;
    margin-left: 20rpx
    }
    .header{
        display: flex;
    }
    .swiper{
        margin-top: 30rpx;
    }
    .slide-image{
        width: 96%;
        height: 400rpx;
        margin-left: 2%;
        border-radius: 10rpx;
    }
    .fl{
        display: flex;
        margin-top: 5%;
    }
    .image{
        width: 50rpx;
        height: 50rpx;
    }
    .body{
        width: 250rpx;
        text-align: center;
    }
    .sou{
        color: red;
    }
    .so{
        margin-left: 5%;
    }
    .hot{
        color: red;
        margin-left: 5%;
        font-size: 40rpx;
    }
    .first{
        margin-left: 5%;
        font-size: 30rpx;
    }
    .keyword{
        padding-left: 8%;
        border-bottom:gainsboro solid 1rpx;
        font-size: 40rpx;
        height: 70rpx;
    }
    .val{
        color: royalblue;
        font-size: 40rpx;
        border-bottom:gainsboro solid 1rpx;
        height: 70rpx;
        padding-left: 5%;
        margin-top: 3%;
    }
</style>
