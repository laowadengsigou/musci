<template>
    <div>
        <div style="margin-top: 3%">
            <div class="name">{{name}}</div>
            <div class="names">{{names}}</div>
        </div>
        <div v-if="songs.al" class="box">
            <img :src="songs.al.picUrl" alt="" class="img" :class="{img_hide1:flag === true}">
        </div>
        <div class="fl">
            <div>{{showtime1}}</div>
            <div>
                <slider @change="change" step="1" :value="value" :max="max" class="sli"/>
            </div>
            <div>{{showtime2}}</div>
        </div>
        <div class="box1">
            <div class="le">
                <img src="../../native/tabbar/top音乐.png" alt="" class="ima" v-if="num === 1" @click="sun">
                <img src="../../native/tabbar/erji.png" alt="" class="ima" v-else-if="num === 2" @click="dan">
                <img src="../../native/tabbar/home.png" alt="" class="ima" v-else-if="num === 3" @click="sui">
            </div>
            <div class="le">
                <img src="../../native/tabbar/上一曲1-01.png" alt="" class="ima" @click="shang">
            </div>
            <div class="le">
                <img src="../../native/tabbar/暂停.png" alt="" class="ima" v-if="flag === true" @click="click">
                <img src="../../native/tabbar/播放.png" alt="" class="ima" v-else @click="clicks">
            </div>
            <div class="le">
                <img src="../../native/tabbar/下一曲1-01.png" alt="" class="ima" @click="xia">
            </div>
            <div class="le">
                <img src="../../native/tabbar/收藏.png" alt="" class="ima">
            </div>
        </div>
    </div>
</template>

<script>
    const innerAudioContext = wx.createInnerAudioContext()
    export default {
        name: "play",
        components: {},
        props: {},
        data() {
            return {
                cid:"",//接收单独歌曲id，获取歌曲播放路径
                IdArr:[],//存储所有歌曲的id
                songs:[],//歌曲详情
                name:"",//歌曲名字
                names:"",//歌手名字
                flag:true,
                value:0,
                max:0,
                showtime1:'00:00',
                showtime2:"00:00",
                url:"",//音频路径
                index:"",
                num:1,
            }
        },
        methods: {
            sun(){
              this.num = 2
              wx.showToast({
                title: '单曲循环'

              })
            },
            dan(){
                this.num = 3
                wx.showToast({
                    title: '随机播放'

                })
            },
            sui(){
              this.num = 1
                wx.showToast({
                    title: '顺序播放'

                })
            },
            change(e){
                innerAudioContext.seek(e.detail.value)
                console.log(e.detail.value);
                innerAudioContext.play()
            },
            click(){
                this.flag = false
                innerAudioContext.pause()
            },
            clicks(){
                this.flag = true
                innerAudioContext.play()
            },
            xia(){
                // console.log(typeof this.IdArr.length);
                // console.log(typeof this.index);
                if(this.num === 1 || this.num === 2){
                    if(Number(this.index )=== this.IdArr.length-1){
                        this.index = 0
                        this.cid = this.IdArr[this.index]
                        this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                            this.songs = res.data.songs[0]
                            this.name = res.data.songs[0].name
                            this.names = res.data.songs[0].ar[0].name
                            // console.log(this.songs);
                        })
                        this.times()
                        this.zi()
                    }else {
                        this.index = Number(this.index)+1
                        // console.log(this.index);
                        this.cid = this.IdArr[this.index]
                        this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                            this.songs = res.data.songs[0]
                            this.name = res.data.songs[0].name
                            this.names = res.data.songs[0].ar[0].name
                            // console.log(this.songs);
                        })
                        this.times()
                        this.zi()
                    }
                }else {
                    this.index = Math.floor(Math.random()*this.IdArr.length)
                    this.cid = this.IdArr[this.index]
                    this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                        this.songs = res.data.songs[0]
                        this.name = res.data.songs[0].name
                        this.names = res.data.songs[0].ar[0].name
                        // console.log(this.songs);
                    })
                    this.times()
                    this.zi()
                    // console.log(this.index);
                }
                // console.log(Array.from(this.IdArr).indexOf(this.cid));
            },
            shang(){
                if(Number(this.index) === 0){
                    this.index = this.IdArr.length-1
                    // console.log(this.index);
                    this.cid = this.IdArr[this.index]
                    this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                        this.songs = res.data.songs[0]
                        this.name = res.data.songs[0].name
                        this.names = res.data.songs[0].ar[0].name
                        // console.log(this.songs);
                    })
                    this.times()
                    this.zi()
                }
                else {
                    this.index = Number(this.index)-1
                    this.cid = this.IdArr[this.index]
                    this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                        this.songs = res.data.songs[0]
                        this.name = res.data.songs[0].name
                        this.names = res.data.songs[0].ar[0].name
                        // console.log(this.songs);
                    })
                    this.times()
                    this.zi()
                }

            },
            times(){
                this.$fly.get(`/song/url?id=${this.cid}`).then(res=>{
                    this.url = res.data.data[0].url
                    innerAudioContext.autoplay = true
                    innerAudioContext.src = this.url
                    innerAudioContext.onPlay(() => {
                        console.log('开始播放')
                    })
                    innerAudioContext.onError((res) => {
                        console.log(res.errMsg)
                        console.log(res.errCode)
                    })
                    innerAudioContext.onTimeUpdate(() => {
                        // console.log(innerAudioContext.duration);//进度条最大值
                        this.max = parseInt(innerAudioContext.duration)
                        let timeMax = parseInt(innerAudioContext.duration)
                        let min = parseInt(timeMax / 60)
                        let sec = parseInt(timeMax % 60)
                        if (min.toString().length === 1) {
                            min = `0${min}`
                        }
                        if (sec.toString().length === 1){
                            sec = `0${sec}`
                        }
                        this.showtime2 = `${min}:${sec}`
                        // console.log(innerAudioContext.currentTime);//进度条当前进度
                        this.value = parseInt(innerAudioContext.currentTime)
                        let timeMin = parseInt(innerAudioContext.currentTime)
                        let min1 = parseInt(timeMin / 60)
                        let sec1 = parseInt(timeMin % 60)
                        if (min1.toString().length === 1){
                            min1 = `0${min1}`
                        }
                        if(sec1.toString().length === 1){
                            sec1 = `0${sec1}`
                        }
                        this.showtime1 = `${min1}:${sec1}`
                    })

                    // console.log(this.url);
                })
            },
            zi(){
                innerAudioContext.onEnded(()=>{
                    if (this.num === 1){
                        if(Number(this.index) === this.IdArr.length-1){
                            this.index = 0
                            this.cid = this.IdArr[this.index]
                            console.log(this.cid);
                            this.times()
                            this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                                this.songs = res.data.songs[0]
                                this.name = res.data.songs[0].name
                                this.names = res.data.songs[0].ar[0].name
                                // console.log(this.songs);
                            })
                        }else {
                            this.index = Number(this.index)+1
                            this.cid = this.IdArr[this.index]
                            this.times()
                            this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                                this.songs = res.data.songs[0]
                                this.name = res.data.songs[0].name
                                this.names = res.data.songs[0].ar[0].name
                                // console.log(this.songs);
                            })
                        }
                    }
                })


            }
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {},
        onLoad(options){
            console.log(options);
            this.index = options.index
            this.cid = options.cid
            this.$fly.get(`/artists?id=${options.id}`).then(res=>{
                console.log(res.data.hotSongs)
                res.data.hotSongs.forEach(item => {
                    this.IdArr.push(item.id)
                })
                console.log(this.IdArr);
            })
            this.$fly.get(`/song/detail?ids=${this.cid}`).then(res=>{
                this.songs = res.data.songs[0]
                this.name = res.data.songs[0].name
                this.names = res.data.songs[0].ar[0].name
                // console.log(this.songs);
            })
            this.times()
            this.zi()
        }
    }
</script>

<style scoped lang="scss">
.name{
    text-align: center;
    font-size: 30rpx;
}
    .names{
        text-align: center;
        color: gainsboro;
    }
    .box{
        margin-top: 10%;
        text-align: center;
    }
    .img{
        border-radius: 50%;
        width: 600rpx;
        height: 600rpx;
        -webkit-animation:circleRoate 10s infinite linear ;
        animation-play-state: paused
    }
@keyframes circleRoate{
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg);}
}
.img_hide1{
    -webkit-animation:circleRoate 10s infinite linear ;
    animation-play-state: running;
}
    .sli{
        width: 400rpx;
    }
    .fl{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 10%;
    }
    .ima{
        width: 40px;
        height: 40px;
    }
    .box1{
        margin-top:10%;
        display: flex;
    }
    .le{
        margin-left: 9%;
    }
</style>

