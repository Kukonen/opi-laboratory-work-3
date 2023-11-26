import server from "./server";
// @ts-ignore
import sha256 from 'crypto-js/sha256';

class AuthService {
    // static async login(login: string, password: string) {
    //     server('auth/login', 'POST', undefined, {
    //         "login": login,
    //         "password": password
    //     }).then((response) => {
    //         const { token, refresh} = response;

    //         localStorage.setItem("token", token);
    //         localStorage.setItem("refresh", refresh);
    //     })
    // }

    static async login(login: string, password: string) {
        server('auth/login', 'POST', undefined, {
            "login": login
        }).then(response => {
            // @ts-ignore
            const { databaseSalt, onceSalt } = response;

            if (!(databaseSalt && onceSalt)) {
                return;
            }

            server('auth/password', 'POST', undefined, {
                "password": sha256(sha256(password + databaseSalt) + onceSalt)
            }).then((response) => {
                // @ts-ignore
                const { access, refresh} = response;

                if (!(access && refresh)) {
                    return;
                }
    
                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);

                window.location.replace("/");
            })
        })
    }

    static async register(name: string, surname: string, telephone: string, email: string, password: string) {
        server('auth/register', 'POST', undefined, {
            name,
            surname,
            telephone,
            email,
            password
        }).then(result => {
            
        }).catch(err => {

        })
    }

    static async refresh() {
        return new Promise<string>((resolve, reject) => {
            server("auth/refresh", 'POST', undefined, {
                "refresh": localStorage.getItem("refresh")
            }).then(response => {
                // @ts-ignore
                const { access, refresh} = response;
                
                resolve("ok")
    
                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);
            
            }).catch(() => {

                reject("not refresh");

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            })
        })
    }
}

export default AuthService;