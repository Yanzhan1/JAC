<template>
    <div>
        <header class="header">
            <img class="header-left" src="../../../static/images/back@2x.png" @click="$route.meta.keepAlive = false;$router.go(-1)">
            <span class="header-title">地址管理</span>
            <div></div>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:.2rem .4rem">
            <li class="flex column maincenter" v-for='(item,index) in this.alladdress' :key='index' style="height:2.21rem;border-bottom:1px solid #f1f1f1;">
                <div class="flex row between">
                    <span class="names">{{item.receiveName}}</span>
                    <span class="tell">{{item.receiveMobile}}</span>
                </div>
                <div class="address">{{item.provinceName}} {{item.address}}</div>
                <div class="flex row between">
                    <div>
                        <span class="mor" v-if="item.isDefault==1">默认</span>
                    </div>
                    <div class="flex row">
                        <div class="flex row maincenter cocenter" style="margin-right:.4rem">
                            <img src="../../../static/images/my/address_write.png" alt="" style="width:.28rem;height:.28rem">
                            <router-link class="edict" :to="{name:'changeaddress',params:item}" tag="span">
                                编辑
                            </router-link>
                        </div>
                        <div class="flex row maincenter cocenter" @click="confirmRevise(item.no)">
                            <img src="../../../static/images/my/address_delete.png" alt="" style="width:.26rem;height:.28rem">
                            <span class="delte">删除</span>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
        <div style="height:1rem;"></div>
        <button class="bottom-btn" style="outline:none" @click="toadd()">添加新地址</button>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
        alladdress:{}
    };
  },
  methods: {
    toadd() {
      this.$router.push("/addmydress");
    },
    educt() {
      this.$router.push("/edictdress");
    },
    getaddress(){
         this.$http.post(My.Address,{ userNo:this.$store.state.userId}).then((res)=>{
         this.alladdress=res.data.data
       
        //  alert(JSON.stringify(this.alladdress))
      })
    },
    confirmRevise(num) {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要删除吗？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      }).then(action => {
          if (action == "confirm") {

              this.$http.post(My.RemoveAddress,{no:num}).then((res)=>{
                  
                  this.getaddress()
              })
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    }
  },
  mounted(){
      //获取所有的地址
     this.getaddress()
  }
};
</script>
<style scoped>
.names {
  font-size: 0.31rem;
  color: #222;
}
.tell {
  font-size: 0.24rem;
  color: #222;
}
.address {
  font-size: 0.27rem;
  color: #555;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
}
.mor {
  font-size: 0.22rem;
  color: #fff;
  background-color: #49bbff;
  width: 0.72rem;
  display: block;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 0.36rem;
}
.edict {
  color: #49bbff;
  font-size: 0.25rem;
  margin-left: 0.1rem;
  margin-top:.1rem
}
.delte {
  color: #49bbff;
  font-size: 0.25rem;
  margin-left: 0.1rem;
  margin-top:.1rem
}
 

</style>
