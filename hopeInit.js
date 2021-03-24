
var  $_arrowFunction ="var t = () => {};" ;
var $_HOPE = {};
try{
  let $_fv = new Function($_arrowFunction);
   $_HOPE = {
    web: "Five",
    Design: "LZP",
    Plan: "XXX"
  }
  console.log("%c   http://www.hopeedu.com/   ","font-size: 18px;line-height: 25px;height:30px; padding-top:30px ; color:red;background: url('http://www.hopeedu.com/Content/pc_ch/img/logo.png') no-repeat top; padding-top:60px;margin-top:6px; margin-bottom:6px;text-shadow:2px 1px 3px #9e9e9ee2;")
  console.log("  %c 本页面由 %c希望教育集团-网站建设部 %c提供 ", "color:red;background:#999;text-shadow:2px 2px 4px #DA251De2; padding: 5px 2px","color:#005CE6;font-weight:bold;background:#999;font-size:14px; text-shadow:2px 2px 3px #005CE6e2; padding: 4px 0","color:red; background:#999; padding: 5px 0;text-shadow:2px 2px 4px #DA251De2;","");
}catch (e){
  console.log("不支持es6")
}

