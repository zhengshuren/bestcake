;const flyCarts = (function($){
    function flay(img, e){
        // console.log(e,$);
        var flyer=$(`<img style="width:20vw;height:20vw;" class="flyer-img" src="${img}">`);
        var top=$(window).scrollTop();
        var dh=event.pageY;
        var newh=dh-top;
        //  购物车节点位置,决定图片飘的位置
        var oBtn=$(".circ").offset();
        var newdh=oBtn.top-top; 
        //  console.dir(flyer);
      
        flyer.fly({   
          start: {   
            left: event.pageX,//抛物体起点横坐标   
            top:newh //抛物体起点纵坐标   
            },   
            end: {   
              left: oBtn.left - 45,//抛物体终点横坐标   
                top: newdh  //抛物体终点纵坐标   
              },   
            onEnd: function() {   
              this.destory(); //销毁抛物体   
            }   
        });   
      }
})($);