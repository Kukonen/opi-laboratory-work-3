import { Offer } from "@/store/reducers/suggestion";
import server from "./server";

class SuggestionService {
    static async getSuggestions(): Promise<Offer[]> {
        return new Promise<any>((resolve, reject) => {
            server("suggestion", 'GET').then((response) => {
                resolve(response);
            }).catch((error) => {
                reject("Failed to get suggestion");
            })
        });
    }
}

export default SuggestionService;