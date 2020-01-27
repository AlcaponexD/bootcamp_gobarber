/**
 * Created by Jeison Pedroso on 24/01/2020.
 */
import jwt from 'jsonwebtoken';
import AuthConfig from '../../config/auth';
import User from '../models/User';
import * as Yup from 'yup';
class Session{
    async store(req,res){

        const schema = Yup.object().shape({
            email:Yup.string()
                .required()
                .email(),
            password:Yup.string()
                .required()
        });
        if (!(await schema.isValid(req.body)))
        {
            return res.status(400).json({
                error:'Validations fails'
            });
        }

        const { email , password} = req.body;
        const user = await User.findOne({
            where:{email}
        });
        if(!user){
            return res.status(401).json({error:'Usuário não encontrado'});
        }
        if(!(await user.checkPassword(password))){
            return res.status(401).json({error:'Senha incorreta'});
        }

        const {id,name} = user;

        return res.json({
            user:{
                id,
                name,
                email
            },
            token:jwt.sign(
                {id} //Payload
                ,AuthConfig.secret,{ //Hash unica string
                expiresIn:AuthConfig.expires //Duração token
            })
        })
    }
}
export default new Session();