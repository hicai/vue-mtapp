<template>
   <div id="mapWrap">
     <div
   :id="id"
  :style="{width:width+'px',height:height+'px'}"
   class="m-map"
  ></div>
   </div>
  
 
 
</template>

<script>
export default {
  props: {
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
        return [116.46,39.92]
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
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this;
    self.id = `map${Math.random().toString().slice(2,4)}`  //随机生成一个数值并转成字符串取两位数。
    //异步加载地图
    window.onLoad = function(){
      var map = new AMap.Map(self.id,{
        center:self.point,
        zoom:11
      })
      self.map = map
      //拖动条
      map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
      });
      //标记点
      var m1 = new AMap.Marker({
      position: self.point
      });
      map.add(m1);
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
   #mapWrap{
      margin-top:34px;
      margin-left: 10px;
   }
  .m-map{
    position:fixed;
  }
</style>