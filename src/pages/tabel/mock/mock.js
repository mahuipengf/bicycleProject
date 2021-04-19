import Mock from 'mockjs'

export default Mock.mock('/mock.js','get',function(options){
    return Mock.mock({
        "code":0,
        "status":200,
        "msg":'请求数据错误，请检查数据信息',
        "result|20":[{
            "id|+1":1,
            "userName|1":"@cname",
            // "userPwd|1":["123456","aini1998","55578","663528"],
            "userPwd|1-5":[1,2,3,4,5,6,7,8,9,10],
            "age|18-35":20,
            "sex|1-2":1,
            "state|1-8":1,
            "address|":"@city",
            "birthday":"2021-03-29"
        }]
    })
})