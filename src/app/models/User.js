import Sequelize ,{ Model } from 'sequelize';
import bcrypt from 'bcryptjs';
class User extends Model{
    static init(sequelize){
        super.init(
        {
                name:Sequelize.STRING,
                email:Sequelize.STRING,
                password:Sequelize.VIRTUAL,
                password_hash:Sequelize.STRING,
                provider:Sequelize.BOOLEAN,
            },{
                sequelize
            });
        this.addHook('beforeSave',async user=>{
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password,8);
            }
        });

        return this;
    };

    checkPassword(password){
        return bcrypt.compare(password,this.password_hash); // Compara a hash do password se bate com oque tem no banco
    }
}

export  default User;