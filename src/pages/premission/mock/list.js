import Mock from 'mockjs'
Mock.mock('/role/list.json','get',function(options){
  return Mock.mock({
    "code": 0,
    "result": {
      "page": 1,
      "page_size": 10,
      "total_count": 25,
      "page_count": 3,
      "item_list|7": [{
        "id|+1": 1,
        "role_name": /(管理人员)|(客服专员)|(财务专员)|(市场专员)|(人力专员)|(研发)|(测试)|(系统管理员)/,
        "status|0-1": 1,
        "authorize_user_name": "@cname",
        "authorize_time": 1521270166000,
        "create_time": 1499305790000,
        "menus": ["/home", "/ui/buttons", "/ui/modals", "/ui/loadings", "/ui/notification", "/ui/messages", "/ui/tabs", "/ui/gallery", "/ui/carousel", "/ui"]
      }]
    }
  })
})