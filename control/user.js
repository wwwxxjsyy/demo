const userModel = require("../model/user");
//1、引入node核心模块 加密
const crypto = require('crypto');
//引入jsonwebtoken
// const jwt = require("jsonwebtoken");


const utils = require("../utils/token")

const register = (req,res)=>{
    const {username,password} = req.body;
    //查用户名称是否存在
    userModel.findUser({username},(result)=>{
        if(result){
            res.json({
                state:false,
                info:"用户名以存在"
            })
        }else{
            //创建sha256算法
            const hash = crypto.createHash('sha256');
            
            //需要加密的文件
            hash.update(password);

            //得到加密的文件
            //hash.digest('hex')

            userModel.saveUser({username,password:hash.digest('hex')},()=>{
                res.json({
                    state:true,
                    info:"注册成功"
                })
            })
        }
    })
    
}




const login = (req,res)=>{
    const {username,password} = req.body;
    userModel.findUser({username},(result)=>{
        if(result){
            //创建sha256算法
            const hash = crypto.createHash('sha256');
            
            //需要加密的文件
            hash.update(password);

            //得到加密的文件
            //hash.digest('hex')

            
           



            if(result.password == hash.digest('hex')){
                
                const token = utils.createToken({user:username},"1901")
                res.cookie("token",token);


                res.json({
                    state:true,
                    info:"登陆成功"
                })
            }else{
                res.json({
                    state:false,
                    info:"密码错误"
                })
            }
        }else{
            res.json({
                state:false,
                info:"用户名不存在"
            })
        }
    })

}




module.exports ={
    register,
    login
}

/* 
    MD5加密  解密

    sha256加密  没有解密


    123    


    算法(123 + new Date().getTime() +　秘钥）== 加密过后的密码



    //创建一个token
    jwt.sign(信息,秘钥,过期时间)  返回值一般情况下都会当做cookie存储到客户端

*/


