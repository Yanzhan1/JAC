/**
 * Created by ningning.zhang on 2018/7/24.
 */
/*原声方法库说明*/
/*android*/
//getToken  android:获取token方法
//getUid  android:获取clubberId
//gotoBindCar  android:跳转到绑车页面
//isOrder(boolen)  android:清除缓存  参数 ture:清除 ;false:不清楚
//share(url, title)  android:分享  参数 url:地址 ;title:不清楚
//跳转原声页面gotoPage(number) number 101-绑车页面  102--个人中心  103文件调查 104 预约维修  105-维修履历
/*IOS*/
//shareAction
function getCookie(c_name){
  if (document.cookie.length>0){
    let c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1){
      c_start=c_start + c_name.length+1
      let c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
}
function setCookie(c_name,value,expire) {
  var date=new Date()
  date.setSeconds(date.getSeconds()+expire)
  document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
}
/*原声方法*/
var IOSAndAndroid={
  //js判断手机操作系统(ios或者是Android)
  isIOSOrAndroid:function(){
    var u = navigator.userAgent,
      app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid) {
      return "Android"
    }else if(isIOS) {
      return "IOS"
    }
  },
  /*原声中获取token*/
  getToken:function(){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      return window.TimanetWorkAndroid.getToken()
    }else if(system=="IOS"){
      return getCookie('token')
    }else {
      return ""
    }
  },
  /*原声中获取clubberId*/
  getUid:function(){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      return window.TimanetWorkAndroid.getUid()
    }else if(system=="IOS"){
      return ""
    }else {
      return ""
    }
  },
  /*原声中获取mobile*/
  getMobile:function(){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      return window.TimanetWorkAndroid.getMobile()
    }else if(system=="IOS"){
      return getCookie('mobile')
    }else {
      return ""
    }
  },
  /*跳转原声页面gotoPage(number) number 101-绑车页面  102--个人中心  103文件调查 104 预约维修  105-维修履历*/
  gotoPage:function(number){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      window.TimanetWorkAndroid.gotoPage(parseInt(number))
    }else if(system=="IOS"){
      window.webkit.messageHandlers.gotoPage.postMessage({"number":parseInt(number)});
    }
  },
  /*原生方法是否清楚缓存:true:是；false:否*/
  isOrder:function(flag,url){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      window.TimanetWorkAndroid.isOrder(flag)
    }else if(system=="IOS"){
      window.webkit.messageHandlers.isOrder.postMessage({"flag":flag,"url":url});
    }
  },
  /*原生方法跳转登录注册页面*/
  gotoLogin:function(){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      window.TimanetWorkAndroid.gotoLogin();
    }else if(system=="IOS"){
      window.webkit.messageHandlers.presentLoginViewController.postMessage({});
    }
  },
  //判断是否安装了app，认识则直接跳转，不认识就在这里下载app
  isApp:function(){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      window.location.href = JMCApp; /***打开app的协议，有安卓同事提供***/
      window.setTimeout(function(){
        window.location.href = downloadJMCApp+"?newDate="+new Date().getTime(); /***打开app的协议，有安卓同事提供***/
      },1000);
    }else if(system=="IOS"){
      var ifr = document.createElement("iframe");
      ifr.src = JMCApp; /***打开app的协议，有ios同事提供***/
      ifr.style.display = "none";
      document.body.appendChild(ifr);
      window.setTimeout(function(){
        document.body.removeChild(ifr);
        window.location.href = downloadJMCApp+"?newDate="+new Date().getTime(); /***下载app的地址***/
      },1000)
    }
  },
  /*原生方法分享功能:url:分享的页面地址;title:页面标题*/
  shareSpace:function(url,title){
    //js判断手机操作系统(ios或者是Android)
    var system=IOSAndAndroid.isIOSOrAndroid();
    if(system=="Android"){
      window.TimanetWorkAndroid.share(url, title);;
    }else if(system=="IOS"){
      window.webkit.messageHandlers.shareAction.postMessage({"url":url,"title":title});
    }
  },
}

