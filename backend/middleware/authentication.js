
const jwt = require('jsonwebtoken')
class AuthJwt{

    async auth(req,res,next){
        
        const token = req.body.token || req.headers['authorization'] || req.params.token
         
     
        if(token){
            console.log('inside token');
            jwt.verify(token,process.env.SECRET_KEY,(err,data)=>{
                if(err){
                    console.log('error present',err);
                    res.status(403).json({
                        message:'Please login',
                        status: 0
                    })
                }
                else{
                    // console.log('inside else');
                    console.log('data',data);
                    req.user_name = data.user_name
                    next()
                }
                
            })
        }
        else{
            console.log('Token not found');
            res.status(400).json({
                message:'Session Expired,Please Login',
                status:-1
            })
        }
    }
}
module.exports = new AuthJwt()
