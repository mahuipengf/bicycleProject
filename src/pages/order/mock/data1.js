import Mock from 'mockjs'
Mock.mock("order.php","post",function(options){
    return Mock.mock({
        "result":{
            "page":1,
            "page_size":10,
            "total_count":85,
            "page_count":0,
            "item_list|11":[{
                "id|+1":1,
                "order_sn":/T180[0-9]{6}/,
                "bike_sn":80016908352,
                "user_id":908352,
                "user_name":"@cname",
                "mobile":/1[0-9]{10}/,
                "distance":2000,
                "toal_time":4000,
                "status|1-2":1,
                "start_time":"@datetime",
                "end_time":"@datetime",
                "total_fee":1000,
                "user_pay":300,
                "total_time|1":["9h","18h","66m","2h 33m","99m"]

            }]
        }
    })
})