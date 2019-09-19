<template>
    <div>
        <div v-for="(item,index) in userprofiles">
            <div class="dv">
                <div><img :src="item.avatarUrl" alt="" class="img"></div>
                <div class="text">
                    <div>{{item.nickname}}</div>
                    <div class="text1">{{item.signature}}</div>
                </div>
                <div class="text2">+关注</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "four",
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
            userprofiles(){
                return this.$store.state.userprofiles
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.dv{
    display: flex;
    margin-left: 3%;
    margin-top: 3%;
}
    .img{
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
    }
    .text{
        margin-top: 3%;
        width: 500rpx;
    }
    .text1{
        color: gainsboro;
        font-size: 25rpx;
        margin-top: 1%;
    }
    .text2{
        margin-top: 5%;
        background-color: red;
        width: 100rpx;
        height: 40rpx;
        border-radius: 50% 50%;
        text-align: center;
    }
</style>
