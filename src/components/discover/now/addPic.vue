<template>
  <div class="all">
    <header class="header">
      <img  src="../../../../static/images/discover/backfff.png" @click="$router.go(-1)">
      <span style="font-size: 0.32rem;color: #FC3846">圈子</span>
      <span @click="send" style="font-size: 0.28rem;color: #ffffff">发布</span>
    </header>

    <div class="box">
        <textarea v-model="message" name="" rows="4" cols="60" class="msg" placeholder="请输入你想表达的心情话语..."></textarea>
    </div>
    <div @click="checkPic" class="p_04" style="padding: 0.3rem;border-radius: 0.16rem;width: 1.04rem;height: 1.04rem;margin-left: 4%;margin-bottom:100%">
      <!--<img src="../../../static/images/discover/fabu2@2x.png"  style="width: 0.48rem;background-color: #f8f8f8;"/>-->
    </div>
    <!--<div class="form-group" style="margin-bottom: 2rem;">
      &lt;!&ndash;<input type="file" class="form-control" @change="onFileChange">&ndash;&gt;
      <input id="browse" type="file" @change="previewFiles()" multiple>
      <div id="preview"></div>
    </div>-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
  import { Actionsheet } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    name: "publish",
    data(){
      return{
        actions:[{name:'拍照',method:this.getCamera},{name:'从相册中选择',method:this.getLibrary}],
        sheetVisible:false,
        message:'',
        fileName:'',
        imgs:[],
        userId:this.$store.state.userId
      }
    },
    methods: {
      checkPic() {
        this.sheetVisible = true;
      },
      getCamera() {
        console.log("拍照");
      },
      getLibrary: function () {
        console.log("相册");
      },


      previewFiles() {
        var _this = this;
        var preview = document.querySelector('#preview');
        var files   = document.querySelector('input[type=file]').files;
        function readAndPreview(file) {
          var fileObj = new Object();
          if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
              var image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              preview.appendChild( image );
            }, false);
            reader.readAsDataURL(file);
            var vm = _this;
            reader.onload = (e) => {
              vm.image = e.target.result;
              fileObj.name = file.name;
              fileObj.url = e.target.result;
              _this.imgs.push(fileObj);
            };
          }
        }
        if (files) {
          [].forEach.call(files, readAndPreview);
        }
      },


      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
        this.fileName = file.name;
      },
      send(){
        var _this = this;
        var imgStr = _this.image;
        console.log(_this.message.length)
        if(_this.message.length>400){
          MessageBox('提示', "字数不得超过400");
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.addMoment, {"uid": _this.userId,"message":_this.message, "img":_this.imgs}).then(function (res) {
          if (res.data.status) {
            _this.$router.push({path:"/my/mystart"});
          } else {
            console.log(res.data.errorMsg);
          }
        });
      }
    }


  }
</script>

<style scoped>
  .p_01{
    background-color: #FFFFFF;height: 2.4rem;
  }
  .p_02{
    background-color: #FFFFFF;height:0.2rem;border-width: 1px;border-style: none none solid none;border-color: #f5f5f5;
  }
  .p_03{
    background-color: #FFFFFF;height: 0.2rem;
  }
  .p_04{
    height: 2.4rem;background-color: #f8f8f8;
  }
  .back{
    padding-left:0.4rem;
  }
  .box{
    width: 100%;
    margin: 0 auto;
    margin-top: 1.4rem;
    text-align: center;
  }
  .msg{
    font-size: 0.3rem;
    color: #888888;
    border: none;
    height: 2.56rem;
    padding: 0.3rem;
    background: #f8f8f8;
    border-radius: 0.16rem;
    width: 92%;
    line-height: 0.4rem
  }
  .header{
    background-color: #1A1D23;
  }
</style>
