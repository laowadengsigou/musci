<template>
    <div>
        <div class="fl">
            <div class="box1">
                <div class="zhu" :class="{fu : flag === true}" @click="die">新碟</div>
            </div>
            <div class="box2">
                <div class="zhu" :class="{fu : flags === true}" @click="ge">新歌</div>
            </div>
            <div class="box3">
                <div>更多新碟</div>
            </div>
        </div>
        <div>
            <div class="row">
                <div v-for="(item,index) in list" :key="item.id" class="big">
                    <img :src="item.blurPicUrl" alt="" v-if="item.blurPicUrl" style="width:100%;height:80%;padding: 0 15rpx;border-radius:15%">
                    <img :src="item.album.blurPicUrl" alt="" v-else style="width:100%;height:80%;padding: 0 15rpx;border-radius:15%">
                    <div class="text">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "new",
        components: {},
        props: {},
        data() {
            return {
                flag:false,
                flags:false,
                list:[]//新歌新碟
            }
        },
        methods: {
            die(){
                this.flag = true
                this.flags = false
                this.list = this.$store.state.die
            },
            ge(){
                this.flag = false
                this.flags = true
                this.list = this.$store.state.ge
            }
        },
        mounted() {
            this.flag = true
            //新碟
            this.$fly.get("/album/newest").then(res=>{
                this.$store.state.die = res.data.albums.slice(0,6)
                this.list = this.$store.state.die
                // console.log(this.albums);
            }).catch(e=>{
                console.log(e);
            })

            //新歌
            this.$fly.get("/top/song?type=7").then(res=>{
                this.$store.state.ge = res.data.data.slice(0,6)
                // console.log(this.list);
            }).catch(e=>{
                console.log(e);
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
.zhu{
    font-size: 30rpx;
    color: gray;
}
    .fu{
        font-size: 40rpx;
        font-weight: 700;
        color: black;
    }
    .fl{
        display: flex;
        margin-top: 5%;
    }
    .box1{
        margin-left: 3%;
    }
    .box2{
        margin-left: 3%;
    }
    .box3{
        margin-left: 50%;
        width: 150rpx;
        border-radius:20rpx;
        background-color:gainsboro;
        text-align: center;
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
    margin: 5rpx 8rpx;
    height: 270rpx;

    &:first-child {
        margin-left: 8rpx;
    }
}
</style>
