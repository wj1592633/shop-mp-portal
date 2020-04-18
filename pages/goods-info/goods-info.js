Page({
  data: {
    goods:{title:"三至松鼠"},
    sku:{
      pictrue:[{p1:1},{p2:2},{p3:3}],
      
    },
    isLoading:false
  },
  onSubmit(){
    this.setData({isLoading:true})
    setTimeout(()=>{
      this.setData({isLoading:false})
    },1000)
  }
  
})