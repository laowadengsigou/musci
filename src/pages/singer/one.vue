<template>
    <div>
        <div v-for="(item,index) in singer" class="dv" :key="item.name" @click="click(item, index)">
            <div>
                <img :src="item.picUrl" alt="" class="img">
            </div>
            <div class="text">
                {{item.name}}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "one",
        components: {

        },
        props: {
            singer:{
                type:Array
            }
            },
        data() {
            return {
            }
        },
        methods: {
            click(item, index){
                // console.log(id);
                wx.navigateTo({
                  url: `../singerX/singerX?id=${item.id}`
                })
            }
        },
        mounted() {
        },
        created() {

        },
        filters: {},
        computed: {
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
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
    }
    .text{
        margin-left: 5%;
        margin-top: 3%;
    }
</style>
