export default function (that, title, summary, pic, url) {

  // Array.prototype.mySort = function (callback) {
  //   var that = this,
  //     len = that.length

  //   for (var i = 0; i < len - 1; i++) {
  //     for (var j = i + 1; j < len; j++) {
  //       if (callback(that[i], that[j])) {
  //         var temp = that[i]

  //         that[i] = that[j]
  //         that[j] = temp
  //       }
  //     }
  //   }
  //   return that
  // }

  // var arr = [3, 2, 1]
  // var newArr = arr.mySort(function(a, b){
  //   return a > b
  // })

  // console.log(newArr)

  // url = url.split('#')[0]
  that.$http.post(DISCOVERMESSAGE.weiSignGetWeiSign, {
      url
    })
    .then(({data}) => {
      if(data.status != 1){
        return
      }
      var {appid, noncestr, signature, timestamp} = data.data

      setShareInfo({
        title,
        summary,
        pic,
        url,
        // 微信权限验证配置信息，若不在微信传播，可忽略
        WXconfig: {
          swapTitleInWX: true, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
          appId: appid, // 公众号的唯一标识
          timestamp: timestamp, // 生成签名的时间戳
          nonceStr: noncestr, // 生成签名的随机串
          signature: signature // 签名
        }
      })
    })
}
