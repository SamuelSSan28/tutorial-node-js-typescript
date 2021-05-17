import {UserService} from "../services/UsersService";
import {Request, Response} from "express"



class UsersController{

    async createUser(request:Request, response:Response){
        try {
            const  {name,email,password} = request.body;
            const service = new UserService();
    
            const user = await service.create(name,email,password);
    
            response.json({message:user})

         } catch (error) {
             response.status(400).json({error})
         }        

    }

    async login(request:Request, response:Response){
        const  {username,password} = request.params;

        const service = new UserService();

        try {
           const auth = await  service.login(username,password)

           response.json(auth)
        } catch (error) {
            response.status(400).json({error})
        }
    }

}


export {UsersController}