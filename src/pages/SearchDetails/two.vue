<template>
    <div>
        <div v-for="(item,index) in artists">
            <div class="dv">
                <div>
                    <img :src="item.img1v1Url" alt="" class="img">
                </div>
                <div class="text">{{item.name}} ({{item.alia[0]}})</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "two",
        components: {
            // artists:{
            //     type:Array
            // }
        },
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
            artists(){
                return this.$store.state.artists
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
    border-radius: 50%;
}
    .dv{
        display: flex;
        margin-top:5%;
        margin-left: 5%;
    }
    .text{
        margin-top: 5%;
        margin-left: 3%;
    }
</style>
