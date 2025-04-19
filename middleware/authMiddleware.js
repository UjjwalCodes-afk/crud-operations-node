import jwt from "jsonwebtoken";

export default async(req,res,next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, process.env.SECRETKEY, (err,decode) => {
            if(err){
                return res.status(401).send({
                    success : false,
                    message : 'Unauthorized access'
                })
            }
            else{
                req.body.id = decode.id;
                next();
            }
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : 'Internal server error'
        })
    }
}