<template>
  <div id="Multicheckbox">
      <span v-for='item in source' class="check-item">
          <input ref='tt' type="checkbox" :value="item.value" name="tt" @click='updateValue($event.target.value)'>{{item.label}}
      </span>
  </div>
</template>
<style scoped type="text/css">
  .check-item{
    display:inline-block;
    padding-right:14px;
    font-size:14px;
  }
</style>
<script>
  export default{
    name:"Multicheckbox",
    props:{
      source:{
        type:Array
      },
      busValue:{
        type:String
      }
    },
    data(){
      return{
        ttVal :this.busValue
      }
    },
    computed:{
    },
    methods:{
      busToArr(str){
        if(str!=''){
          if(str.indexOf(',')==-1){
            return [str];
          }else{
            return str.split(',');
          }
        }else{
          return [];
        }
      },
      busToStr(arr){
        return arr.join(',');
      },
      isInAarrayIndex(arr,e){
        var haveAindex={
          isHave:false,
          index:-1
        };
        if(arr.length==0){
          haveAindex.isHave = false;
          haveAindex.index = -1;
          return JSON.stringify(haveAindex);
        }else{
          for(var i=0;i<arr.length;i++){
            if(arr[i]==e){
              haveAindex.isHave = true;
              haveAindex.index = i;
              break;
            }
          }
          return JSON.stringify(haveAindex);
        }
      },
      updateValue(value){
        var busCurtArr = this.busToArr(this.ttVal);
        var haveIndex = JSON.parse(this.isInAarrayIndex(busCurtArr,value))
        if(haveIndex.isHave){
          busCurtArr.splice(haveIndex.index,1);
        }else{
          busCurtArr.push(value);
        }
        busCurtArr.sort();
        this.ttVal = this.busToStr(busCurtArr);
        this.$emit('getTt', this.busToStr(busCurtArr));
      }
    },
    mounted:function(){
      if(this.ttVal!=''){
        var busArr = this.busToArr(this.ttVal);
        for(var i =0 ;i<busArr.length;i++){
          this.$refs.tt.forEach(function(item){
            if(item.value == busArr[i]){
              item.checked = true;
            }
          });
        }
      }
    }
  }
</script>
