<template>
    <div>
        <div v-for="(item,index) in djRadios" class="dv">
            <div><img :src="item.picUrl" alt="" class="img"></div>
            <div class="text">
                <div>{{item.name}}</div>
                <div class="text1">{{item.dj.nickname}}</div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "six",
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
            djRadios(){
                return this.$store.state.djRadios
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
        width: 100rpx;
        height: 100rpx;
    }
    .text{
        margin-top: 2%;
        margin-left: 3%;
    }
    .text1{
        color: gainsboro;
        margin-top: 1%;
    }
</style>
