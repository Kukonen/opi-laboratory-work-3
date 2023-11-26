import { User } from "@/store/reducers/user";
import server from "./server";

class UserService {
    static async getUserInformation() : Promise<User | Error>{
        return new Promise<any>((resolve, reject) => {
            server('user', 'GET').then((response) => {
                resolve(response)
            }).catch((error) => {
                console.log(error)
                reject(new Error(error))
            })
        })
        
    }
}

export default UserService;