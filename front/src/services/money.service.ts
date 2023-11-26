import server from "./server";
import { Money } from "@/store/reducers/money";

class MoneyService {
    static async getMoney(): Promise<Money> {
        return new Promise<any>(async (resolve, reject) => {
            server("money", 'GET').then((response) => {
                resolve(response);
            }).catch((error) => {
                reject("Failed to get money");
            })
        })
    }

    static async transfer(amount: string, number: string, type: '$' | '₽' | '€') {
        return new Promise<any>(async (resolve, reject) => {
            server("transfer", 'POST', undefined, {
                amount,
                number,
                type
            }).then((response) => {
                resolve(response)
            }).catch(async (error) => {
                reject(await error.json())
            })
        })
    }

    static async rate() {
        return new Promise<any>(async (resolve, reject) => {
            server("rate", 'GET').then((response) => {
                resolve(response)
            }).catch(async (error) => {
                reject(await error.json())
            })
        })
    }

    static async exchange(amount: string, currencyFrom: '$' | '₽' | '€', currencyTo: '$' | '₽' | '€') {
        return new Promise<any>(async (resolve, reject) => {
            server("exchange", 'PUT', undefined, {
                amount,
                currencyFrom,
                currencyTo
            }).then((response) => {
                resolve(response)
            }).catch(async (error) => {
                reject(await error.json())
            })
        })
    }
}

export default MoneyService;