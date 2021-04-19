import Mock from 'mockjs'
export default Mock.mock("/city_list?page=1","post",function(options){
    return Mock.mock({
        "result":{
            "page":1,
            "page_size":10,
            "total_count":60,
            "page_count":6,
            "list|10":[{
                "id|+1":1,
                "name":"@city",
                "mode|1-2":1,
                "op_mode|1-2":1,
                "franchisee_id":77,
                "franchisee_name":"松果自营",
                "city_admins|1-2":[{
                    "user_name":"@cname",
                    "user_id|+1":10001
                }],
             "open_time":"@datetime",
             "syc_user_name":"@cname",
             "update_time":1225877629500
            }]
        }
    })
})