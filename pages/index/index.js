//index.js
import https from '../../service/net.js'
import sysConfig from '../../service/path.js'
const app = getApp()

Page({
  data: {
    goodsList:[
      {tag:"正品",
      price:"10.00",
      desc:"商品1",
      title:"商品1标题"
    },
    {tag:"正品",
    price:"110.00",
    desc:"商品2",
    title:"商品2标题"
  },
  {tag:"正品",
  price:"1.00",
  desc:"商品3",
  title:"商品3标题"
}
    ]
  },
  selectGoods(event){
    console.log("eeeadasdasdasf",event)
  },
  search(){
    
https.requestGet('https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18475999672').then(
  (res)=>{
    // console.log(sysConfig.baseUrl)
    // console.log('sysConfig',sysConfig)
    console.log('ress')
     console.log(res)
  }
).catch(err=>{
  console.log('err->>>')
  console.log(err)
})
  },
  
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
   
  },
  onReachBottom:()=>{
    console.log("giugiug")
  }

})
