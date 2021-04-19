import Mock from 'mockjs'

Mock.mock('mock.php','get',function(options){
    return Mock.mock({
        "code":0,
        "msg":"",
        "result|10":[{
            "id|+1":0,
            "username":"@cname",
            "userPwd|1":["123456","aini1998","55578","663528"],
            "sex:|1":["男","女"],
            "state|1":["success","fail"],
            "address|":"@address",
            "birthday":"2021-03-29"
        }]
    })
})