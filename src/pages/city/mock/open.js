import Mock from 'mockjs'
export default Mock.mock("open.cjs","get",function(options){
    return Mock.mock({
        "code":0,
        "result":"开通成功"
    })
})