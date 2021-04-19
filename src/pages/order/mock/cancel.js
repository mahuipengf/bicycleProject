import Mock from 'mockjs'
Mock.mock("cancel.php","post",function(options){
    return Mock.mock({
        "code":"0",
        "result":{
            "id":27985,
            "bike_sn":"800011658",
            "battery":100,
            "start_time":"@datetime",
            "location":"北京市海淀区奥林匹克公园"
        }
    })
})