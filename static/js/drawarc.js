class Createarc{
  constructor(options){
    //判断需要左边或者右边的圆弧滑动条
    if(options.type == 'left'){
      this.type = -1
    }else if(options.type == 'right'){
      this.type = 1
    }
    this.can = document.getElementById(options.el)
    this.can.width = parseInt(options.ratio*document.body.offsetWidth);//宽度
    this.can.height = this.can.width;//高度
    this.ctx = this.can.getContext('2d');
    this.tempdel = options.tempdel || 17//总温度差
    this.movepoint = options.movepoint || parseInt(this.can.width/20)//滑动块大小
    this.arcr = this.can.width-3*this.movepoint //圆弧r半径
    this.smallx = null;
    this.smally = null;//滑动块坐标
    this.touchflag = false;
    this.touchlarge = options.touchlarge || parseInt(this.can.width/13) //触碰范围大小
    this.betweenarc = options.betweenarc || parseInt(this.can.width/25);//圆弧两侧圆点大小
    this.canwcenter = this.type == 1?0+2*this.betweenarc:this.can.width-2*this.betweenarc
    this.canhcenter = this.can.height-2*this.betweenarc
    this.vuethis = options.vuethis;//获取vue的this指向
    this.num = options.num//圆弧点所在位置的变量的
    this.colornum = options.color.num || 2;
    this.colorstart = options.color.start
    this.colorcenter = options.color.center
    this.colorend = options.color.end
    this.iscontrol = options.iscontrol
    if(this.iscontrol){
      this.init()
      this.inits('','first');
    }else{
      this.initsfalse()
    }


  }
  init(){
    this.can.ontouchstart = (e)=>{
      document.body.style.height = '100vh'
      document.body.style['overflow-y'] = 'hidden'
      var e = e || event;
      var place = this.getplace(e);

      //判断触点是否在滑动块上
      if(place.x > (this.smallx-this.movepoint-10)&&place.x < (this.smallx+this.movepoint+10)&&place.y > (this.smally-this.movepoint-10)&&place.y < (this.smally+this.movepoint+10)){
        this.touchflag = true;
        this.can.ontouchmove = (e)=>{
          if(this.touchflag == true){
            var e = e || event;
            var moveplace = this.getplace(e)
            if(this.type == 1){
              var moveplacex = moveplace.x-this.canwcenter
            }else if(this.type == -1){
              var moveplacex =this.canwcenter - moveplace.x
            }

            var moveplacey = this.canhcenter - moveplace.y
            //判断触点需要在正确的区域内
            /*if(moveplace.x > this.canwcenter &&moveplace.x < this.canwcenter+this.arcr&&moveplace.y < this.canhcenter &&moveplace.y > this.canhcenter-this.arcr ){
                              var localr = Math.sqrt(Math.pow(moveplace.x-this.canwcenter,2)+Math.pow(this.canhcenter - moveplace.y,2));
                              if(localr > (this.arcr-this.movepoint-this.touchlarge) &&localr < (this.arcr+this.movepoint+this.touchlarge)){
                                  //获取触点所在部分具体区域
                                  this.vuethis[this.num] = Math.atan2(moveplacey,moveplacex)*180/Math.PI/90*this.tempdel;
                                  this.inits(this.vuethis[this.num])
                              }
                          }*/
            if(this.type == 1){
              if(moveplace.x > this.canwcenter &&moveplace.y < this.canhcenter ){
                var localr = Math.sqrt(Math.pow(moveplace.x-this.canwcenter,2)+Math.pow(this.canhcenter - moveplace.y,2));
                if(localr > (this.arcr-this.movepoint-this.touchlarge) &&localr < (this.arcr+this.movepoint+this.touchlarge)){
                  //获取触点所在部分具体区域
                  this.vuethis[this.num] = Math.atan2(moveplacey,moveplacex)*180/Math.PI/90*this.tempdel;
                  this.inits(this.vuethis[this.num])
                }
              }
            }else if(this.type == -1){
              if(moveplace.x < this.canwcenter &&moveplace.y < this.canhcenter ){
                var localr = Math.sqrt(Math.pow(this.canwcenter-moveplace.x,2)+Math.pow(this.canhcenter - moveplace.y,2));
                if(localr > (this.arcr-this.movepoint-this.touchlarge) &&localr < (this.arcr+this.movepoint+this.touchlarge)){
                  //获取触点所在部分具体区域
                  // this.vuethis[this.num] = Math.atan2(moveplacey,moveplacex)*180/Math.PI/90*this.tempdel;
                  this.inits(Math.atan2(moveplacey,moveplacex)*180/Math.PI/90*this.tempdel)
                }
              }
            }


          }
        }
      }
    }
    this.can.ontouchend = (e)=>{
      document.body.style.height = 'unset'
      document.body.style['overflow-y'] = 'auto'
      this.touchflag = false;
    }

  }
  inits(angle,isfirst){
    this.ctx.clearRect(0,0,this.can.width,this.can.height);//每次绘制前先清除之前绘制的图形
    this.drawarc(this.canwcenter,this.canhcenter,this.arcr)
    this.drawfillarc(this.canwcenter+this.type*this.arcr,this.canhcenter,this.betweenarc,this.colorend)//圆弧下方的圆点
    this.drawfillarc(this.canwcenter,this.canhcenter-this.arcr,this.betweenarc,this.colorstart)//圆弧上方的圆点
    this.drawmovearc(this.canwcenter,this.canhcenter,this.arcr,angle,this.movepoint,isfirst)
  }
  initsfalse(){
    this.ctx.clearRect(0,0,this.can.width,this.can.height);//每次绘制前先清除之前绘制的图形
    this.drawarc(this.canwcenter,this.canhcenter,this.arcr)
    this.drawfillarc(this.canwcenter+this.type*this.arcr,this.canhcenter,this.betweenarc,this.colorend)//圆弧下方的圆点
    this.drawfillarc(this.canwcenter,this.canhcenter-this.arcr,this.betweenarc,this.colorstart)//圆弧上方的圆点
  }
  getplace(e){
    var bbox = this.can.getBoundingClientRect();/* 获取canvas的包围盒对象*/
    return {x:e.touches[0].clientX-bbox.left,y:e.touches[0].clientY-bbox.top}
  }
  drawarc(x,y,r){//输入x,y绘制圆弧
    this.ctx.save();
    this.ctx.beginPath();
    var gr = this.ctx.createLinearGradient(0,0,this.can.width,0);
    //添加颜色端点ctx
    if(this.type == 1){
      gr.addColorStop(0,this.colorstart);
      if(this.colornum == 3){
        gr.addColorStop(0.5,this.colorcenter);
      }
      gr.addColorStop(1,this.colorend);
    }else{
      gr.addColorStop(0,this.colorend);
      if(this.colornum == 3){
        gr.addColorStop(0.5,this.colorcenter);
      }
      gr.addColorStop(1,this.colorstart);
    }

    this.ctx.strokeStyle=gr;
//			this.ctx.strokeStyle = 'red'
    this.ctx.lineWidth  = '5'
    if(this.type == 1){
      this.ctx.arc(x,y,r,1.5*Math.PI,2*Math.PI)
    }else if(this.type == -1){
      this.ctx.arc(x,y,r,Math.PI,1.5*Math.PI)
    }

    this.ctx.stroke();
    this.ctx.restore()
  }
  drawfillarc(x,y,r,color){//绘制圆点
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = color
    this.ctx.arc(x,y,r,0,2*Math.PI)

    this.ctx.fill();
    this.ctx.restore()
  }
  drawmovearc(x,y,r,angle,smallr,isfirst){//绘制移动块 x为圆点所在圆弧的圆的x，y一样，r
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#222";
    this.ctx.fillStyle = '#fff'
    //获取圆点xy
    //Math.atan2(moveplacey,moveplacex)*180/Math.PI/90*this.tempdel
//			this.smallx = x+r*Math.cos(angle/this.tempdel*90*(Math.PI)/180)*this.type
//			this.smally = y-r*Math.sin(angle/this.tempdel*90*(Math.PI)/180)
    this.smallx = x+r*Math.cos(Math.PI/2*this.getxy(angle/this.tempdel*90*(Math.PI)/180,isfirst)/(this.tempdel-1))*this.type
    this.smally = y-r*Math.sin(Math.PI/2*this.getxy(angle/this.tempdel*90*(Math.PI)/180,isfirst)/(this.tempdel-1))


    this.ctx.arc(this.smallx,this.smally,smallr,0,2*Math.PI)
    this.ctx.fill();
    this.ctx.restore()
  }
  getxy(angle,isfirst){
    var arr = []
    for(var i = 0; i < this.tempdel; i++){
      arr.push(Math.abs(angle-Math.PI/2/(this.tempdel-1)*i))
    }
    var min = null;
    var num = 0;
    arr.forEach((item,index)=>{
      if(min==null){
        min = item
        num = index
      }else{
        if(min > item){
          min = item
          num = index
        }
      }
    })
    if(isfirst == 'first'){
      num = this.vuethis[this.num];
    }else{
      this.vuethis[this.num] = num;
    }

    return num;
  }
}
export {
  Createarc
}
