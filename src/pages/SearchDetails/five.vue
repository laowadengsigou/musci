<template>
    <div>
        <div v-for="(item,index) in videos" class="dv">
            <div>
                <div><img :src="item.coverUrl" alt="" class="img"></div>
            </div>
            <div class="text">
                <div>
                {{item.title}}
                </div>
                <div class="text1">
                    by{{item.creator[0].userName}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "five",
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
            videos(){
                return this.$store.state.videos
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.dv{
    display: flex;
    margin-top: 3%;
    margin-left: 3%;
}
    .img{
        width: 180rpx;
        height: 150rpx;
    }
    .text{
        margin-top: 3%;
        margin-left: 3%;
    }
    .text1{
        color: gainsboro;
        margin-top: 1%;
    }
</style>
