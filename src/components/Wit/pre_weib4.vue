<template>
  
   

     <div>
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
    </div>
   
    
  
 
</template>

<style>
  
</style>

<script type="text/babel">
  const address = {
  '江西': ['南昌', '吉安', '宜春', '抚州', '上饶'],
    '广东': ['广州',  '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '湖南': ['长沙',  '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
   };

  export default {
    methods: {
    
       onAddressChange(picker, values) {
        picker.setSlotValues(1, address[values[0]]);
        this.addressProvince = values[0];
        this.addressCity = values[1];
      }
    },

    data() {
      return {
      
       addressSlots: [
          {
            flex: 1,
            values: Object.keys(address),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['南昌'],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        addressProvince: '北京1',
        addressCity: '北京1'
      };
    },

    mounted() {
      
    }
  };
</script>