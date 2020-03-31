<template>
   <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px 0 0 10px'}"
    class="m-map"
    :class="BarFixed==true?'isFixed':''"
    ></div>
</template>

<script>
export default {
  props: {
    BarFixed:{
       type:Boolean,
       default(){
         return false
      }
    },
    width:{
      type:Number,
      default:200
    },
    height:{
      type:Number,
      default:200
    },
    point:{
      type:Array,
      default(){
        return [117.000923,36.675807]
      }
    }
    
  },
  data() {
    return {
      id:`map`,
      key:'5184dfc3a9de5128108b70c4d6006f1f'
    };
  },
   watch: {
    point: function (val, old) {
       this.map.setCenter(val)
       this.marker.setPosition(val) //更新点标记位置
    }
  },
  mounted() {
    let self = this
    self.id = `map${Math.random().toString().slice(2,4)}`  //随机生成一个数值并转成字符串取两位数。
    //异步加载地图
    window.onLoad = function(){
      let map = new AMap.Map(self.id,{
         resizeEnable: true,
         zoom: 11,
          center: self.point
      })
       self.map = map
      //拖动条
      map.plugin("AMap.ToolBar", function() {
         var toolbar = new AMap.ToolBar();
         map.addControl(toolbar);
         let marker = new AMap.Marker({
           position: self.point,
          });
          self.marker = marker
          marker.setMap(map)
      });

    }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=${self.key}&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
   
    
  }
};
</script>
<style lang="scss" scoped>
  .isFixed{
    position: fixed!important;
    top:0;
    margin-top:0px!important;
    margin-left:10px!important;
  }
</style>
 