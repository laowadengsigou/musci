<config>
    {
    "backgroundTextStyle": 'light',
    "navigationBarBackgroundColor": '#FF0000',
    "navigationBarTitleText": '歌手',
    "navigationBarTextStyle": 'black',
    "usingComponents": {
    "van-tab": "../../native/vant/tab/index",
    "van-tabs": "../../native/vant/tabs/index"
    }
    }
</config>
<template>
    <div>
        <div>
            <van-tabs active="active" @change="change">
                <van-tab v-for="(item,index) in list" :title="item.title">
                    <scroll-view scroll-x v-if="index !== 0" style="width: 100%;padding-right: 20rpx">
                        <div class="box">
                            <div v-for="(item1,index1) in alphabetArr"
                                 class="dv"
                                 :class="{one:index1 === 0}"
                                 @click="sou(item1)"
                            >
                                {{item1}}
                            </div>
                        </div>
                    </scroll-view>
                    <one :singer="singer"></one>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import one from "./one"
    export default {
        name: "singer",
        components: {
            one,
        },
        props: {},
        data() {
            return {
                alphabetArr: ['热','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
                list:[
                    {title:"入驻歌手"},
                    {title:"华语男歌手"},
                    {title:"华语女歌手"},
                    {title:"华语组合/乐队"},
                    {title:"欧美男歌手"},
                    {title:"欧美女歌手"},
                    {title:"欧美组合/乐队"},
                    {title:"日本男歌手"},
                    {title:"日本女歌手"},
                    {title:"日本组合/乐队"},
                    {title:"韩国男歌手"},
                    {title:"韩国女歌手"},
                    {title:"韩国组合/乐队"},
                    {title:"其他男歌手 "},
                    {title:"其他女歌手"},
                    {title:"其他组合/乐队"},
                ],
                active:0,
                cat:5001,
                singer:[],//歌手
            }
        },
        methods: {
            sou(item){
                if(item === "热"){
                    this.$fly.get(`/artist/list?cat=${this.cat}&initial=${''}`).then(res=>{
                        this.singer = res.data.artists
                        // console.log(res);
                    })
                }else {
                    this.$fly.get(`/artist/list?cat=${this.cat}&initial=${item}`).then(res=>{
                        this.singer = res.data.artists
                        // console.log(res);
                    })
                }
            },
            singerInterface(){
                this.$fly.get(`/artist/list?cat=${this.cat}`).then(res=>{
                    this.singer = res.data.artists
                    // console.log(this.singer);
                })
            },
            change(title){
                let index = title.detail.index
                if(index === 1){
                    this.cat = 1001
                    this.singerInterface()
                }else if(index === 2){
                    this.cat = 1002
                    this.singerInterface()
                }else if(index === 3){
                    this.cat = 1003
                    this.singerInterface()
                }else if(index === 4){
                    this.cat =2001
                    this.singerInterface()
                }else if(index === 5){
                    this.cat = 2002
                    this.singerInterface()
                }else if(index === 6){
                    this.cat = 2003
                    this.singerInterface()
                }else if(index === 7){
                    this.cat = 6001
                    this.singerInterface()
                }else if(index === 8){
                    this.cat = 6002
                    this.singerInterface()
                }else if(index === 9){
                    this.cat = 6003
                    this.singerInterface()
                }else if(index === 10){
                    this.cat = 7001
                    this.singerInterface()
                }else if(index === 11){
                    this.cat = 7002
                    this.singerInterface()
                }else if(index === 12){
                    this.cat = 7003
                    this.singerInterface()
                }else if(index === 13){
                    this.cat = 4001
                    this.singerInterface()
                }else if(index === 14){
                    this.cat = 4002
                    this.singerInterface()
                }else if(index === 15){
                    this.cat = 4003
                    this.singerInterface()
                }else if(index === 0){
                    this.cat = 5001
                    this.singerInterface()
                }
            }
        },
        mounted() {
            this.singerInterface()
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
.box{
    display: flex;
    margin-left:5%;
}
    .dv{
        margin-left: 5%;
    }
    .one{
        background-color: red;
        color: white;
    }
</style>
