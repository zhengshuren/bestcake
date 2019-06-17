<template>
  <div class="hello">
    <ul>
        <li v-for="(item, index) in commentList" :key="index">
            <div class="img">
                <img v-if="item.HeadImgPath" :src="item.HeadImgPath" alt="">
                <img v-else src="http://m.bestcake.com/images/icon_user.jpg" alt="">
            </div>
            <div class="msg">
                <div class="user">{{item.name}}</div>
                <div class="content">{{item.cmt}}</div>
                <div class="score" >
                    <img v-for="(item, index) in images" :key="index" src="https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1" alt="">
                </div>
            </div>
            <div class="dataTime">
                {{item.CmtTime}}
            </div>
        </li>
    </ul>
    
    <div v-if="commentList.length === 0">暂无评论~</div>
    <div v-else style="color: #0e90d2;font-size:4vw;line-height:8vw;text-align:center;">加载完成~</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        commentList: [],
        images: [
            {url: 'https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1'},
            {url: 'https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1'},
            {url: 'https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1'},
            {url: 'https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1'},
            {url: 'https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1'}
        ]
    }
  },
  mounted () {
    this.$apis.getCakeCmtList(this.$route.query.id).then(res => {
        this.commentList = res.data.Tag;
        this.commentList.forEach((item, index) => {
            let str = this.commentList[index].CmtTime.substring(this.commentList[index].CmtTime.indexOf('(') + 1, this.commentList[index].CmtTime.indexOf(')'))
            let time = new Date(Number.parseInt(str));
            // console.log(time);
            item.CmtTime = this.timestampToTime(time);
            // item.CmtTime = formatDate(time, 'yyyy-MM-dd hh:mm');
        })
4    });
  },
  methods: {
    //   时间戳转日期
    timestampToTime (date) {
        var Y = date.getFullYear() - 1 + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        return Y+M+D
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    ul {
        li {
            margin-left: 4vw;
            padding-right: 4vw;
            border-bottom: 0.26vw solid #ddd;
            padding-top: 4vw;
            padding-bottom: 4vw;
            display: flex;
            justify-content: space-between; 
        }
    }
    .img {
        margin-right: 4vw;
        img {
            width: 9.373vw;
            height: 9.373vw;
        }
    }
    .user, .content {
        line-height: 5.6vw;
        color: #333;
        font-size: 4vw;
        margin-bottom: 2vw;
    }
    .score img {
        margin-right: 3vw;
        width: 5.333vw;
        height: 5.333vw;
    }
    .msg {
        width: 60vw;
    }
</style>
