const jwt = require('jsonwebtoken');
exports.createToken = (id)=>{   
    return jwt.sign({id},'this is a secret key');
}

// const requireAuth = (req,res,next)=>{
// 	const token = req.cookies.jwt;

// 	//check does jsonwebtoken exists or not
// 	if(token){
// 	jwt.verify(token,'secret key or signeture',(err,decodedToken)=>{
// 		if(err){
// 			res.redirect('/login');
// 		}else{
// 			next();
// 		}
		
// 		})
// 	}else{
// 		res.redirect('/login');
// 	}

// }

