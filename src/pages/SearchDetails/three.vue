<template>
    <div>
        <div v-for="(item,index) in playLists">
            <div class="dv">
                <div><img :src="item.coverImgUrl" alt="" class="img"></div>
                <div>
                    <div class="text">{{item.name}}</div>
                    <div class="texts">
                        <span>{{item.trackCount}}首音乐</span>
                        <span style="margin-left: 3%">by{{item.creator.nickname}}</span>
                        <span style="margin-left: 3%">播放{{item.playCount}}次</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "three",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {},
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {
            playLists(){
                return this.$store.state.playLists
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.img{
    width: 120rpx;
    height: 120rpx;
}
    .dv{
        display: flex;
        margin-left: 3%;
        margin-top: 3%;
    }
    .text{
        margin-top: 3%;
        margin-left: 3%;
    }
    .texts{
        margin-top: 3%;
        margin-left: 3%;
        width: 590rpx;
    }
</style>
