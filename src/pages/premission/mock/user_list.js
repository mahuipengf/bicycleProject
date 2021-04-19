import Mock from 'mockjs'
Mock.mock('ads/api/role/user_list.json','get',function(options){
  return Mock.mock({
    "code": 0,
    "result|20": [{
      "status|0-1": 0,
      "user_id|+1": 1,
      "user_name": "@cname"
    }]
  })
})