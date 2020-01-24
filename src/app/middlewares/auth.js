/**
 * Created by Jeison Pedroso on 24/01/2020.
 */
import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req,res,next)=>{
    const authHeader = req.headers.authorization;


    if(!authHeader){
        return res.status(401).json({error: 'nenhum token encontrado'});
    }
    const [,token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token,authConfig.secret);

        req.userId = decoded.id;
        console.log()
    }catch(err){
        return res.status(401).json({error: 'token inválido'});
    }
    return next();
}