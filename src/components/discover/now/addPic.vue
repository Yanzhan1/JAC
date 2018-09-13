<template>
  <div>
    <header class="head">
      <img class="header-left" src="../../../../static/images/back@2x.png" @click="$router.go(-1)">
      <p class="header-title-fff">社区</p>
      <span @click="send">发布</span>
    </header>
    <div class="addNowBox wrap_92">
        <textarea v-model="message" name="" rows="4" cols="60" class="msg" placeholder="分享美好瞬间..."></textarea>
    </div>
    <div @click="checkPic" class="p_04 cameraBg">
      <img src="../../../../static/images/discover/camera.png"  style="width: 0.4rem;"/>
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
            _this.$router.push({path:"/mystart"});
          } else {
            console.log(res.data.errorMsg);
          }
        });
      }
    }


  }
</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";
</style>
