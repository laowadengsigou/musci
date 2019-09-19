<config>
    {
    "usingComponents": {
    "van-tab": "../../native/vant/tab/index",
    "van-tabs": "../../native/vant/tabs/index"
    }
    }
</config>
<template>
    <div>
        <div>
            <van-tabs :active="active" @change="change">
                <van-tab title="单曲">
                    <div style="display: flex;margin-top: 3%;margin-left: 3%">
                        <div><img src="../../native/tabbar/播放.png" alt="" class="img"></div>
                        <div>播放全部</div>
                    </div>
                    <div v-for="(item,index) in songs" @click="play(item)">
                        <div style="display: flex">
                            <div class="text">
                                <div class="text1">{{item.name}}</div>
                                <div class="text2">{{item.artists[0].name}} - {{item.album.name}}</div>
                            </div>
                            <div class="imgs"><img src="../../native/tabbar/播放.png" alt="" class="img"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="专辑"><one :singer="albums"></one></van-tab>
                <van-tab title="歌手"><two></two></van-tab>
                <van-tab title="歌单"><three></three></van-tab>
                <van-tab title="用户"><four></four></van-tab>
                <van-tab title="视频"><five></five></van-tab>
                <van-tab title="电台"><six></six></van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import one from "./one"
    import two from "./two"
    import three from  "./three"
    import four from "./four"
    import five from "./five"
    import six from "./six"
    export default {
        name: "SearchDetails",
        components: {
            one,
            two,
            three,
            four,
            five,
            six,
        },
        props: {},
        data() {
            return {
                active:0,
                value:"",
                type:1,
                songs:[],//单曲
                albums:[],//专辑
                artists:[],//歌手
                playLists:[],//歌单
                userprofiles:[],//用户
                videos:[],//视频
                djRadios:[],//电台
            }
        },
        methods: {
            play(item){
                wx.navigateTo({
                  url: `../play/play?cid=${item.id}`
                })
            },
            change(title){
                let index = title.detail.index
                if(index === 0){
                    this.type = 1
                }
                if(index === 1){
                    wx.showLoading({
                        title:'加载中...'
                    })
                    this.type = 10
                    this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                        if(res.data){
                            wx.hideLoading()
                            this.$store.state.albums = res.data.result.albums
                            this.albums = this.$store.state.albums
                            res.data.result.albums.map(item => {
                                item.publishTime = this.$moment(item.publishTime).format('YYYY-MM-DD')
                            })
                            // console.log(this.albums);
                        }
                    })
                }
                if(index === 2){
                    this.type = 100
                    this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                        this.$store.state.artists = res.data.result.artists
                        this.artists = this.$store.state.artists
                        // console.log(this.artists);
                    })
                }
                if(index === 3){
                    this.type = 1000
                    this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                        this.$store.state.playLists = res.data.result.playlists
                        this.playLists = this.$store.state.playLists
                        // console.log(this.playLists);
                    })
                }
                if(index === 4){
                    this.type = 1002
                    this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                        this.$store.state.userprofiles = res.data.result.userprofiles
                        this.userprofiles = this.$store.state.userprofiles
                        // console.log(this.userprofiles);
                    })

                }
                if(index === 5){
                    this.type = 1014
                    this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                        this.$store.state.videos = res.data.result.videos
                        this.videos = this.$store.state.videos
                        // console.log(this.videos);
                    })
                }
                if(index === 6){
                    this.type = 1009
                    this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                        this.$store.state.djRadios = res.data.result.djRadios
                        this.djRadios = this.$store.state.djRadios
                        // console.log(this.djRadios);
                    })
                }
                // console.log(title);
            },
        },
        mounted() {
            this.$fly.get("/search?keywords="+this.value+`&type=${this.type}`).then(res=>{
                this.$store.state.songs = res.data.result.songs
                this.songs = this.$store.state.songs
                // console.log(this.songs);
            })
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {},
        onLoad(options) {
            this.value = options.value
            console.log(options);
        },
    }
</script>

<style scoped lang="scss">
.img{
    width: 40rpx;
    height: 40rpx;
}
.imgs{
    margin-top: 6%;
}
    .text{
        margin-top: 3%;
        width: 600rpx;
        margin-left: 2%;
    }
    .text1{
        font-size:30rpx ;
    }
   .text2{
       color: gainsboro;
   }
</style>
