import { User } from "../entities/UsersEntitie";
import { getRepository,Repository } from "typeorm";

class UserService {

    private usersRepository:Repository<User>;

    constructor(){
        this.usersRepository = getRepository(User);
    }


    async create(name:string,email:string,password:string){

        const user = await this.usersRepository.create({name,email,password})

        this.usersRepository.save(user);

        return "Usuário criado com sucesso!"
    }


    async login(username:string,password:string){
        const user = await this.usersRepository.findOne({name:username});

        if( user.password !== password){
            throw new Error("Usuário ou senha incorretos!")
        }

        return {auth:true}

    }

}

export {UserService}