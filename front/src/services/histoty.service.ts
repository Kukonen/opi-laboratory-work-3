import { Story } from "@/store/reducers/history";
import server from "./server";

class HistoryService {
    static async getHistory(): Promise<Story[]> {
        return new Promise<any>((resolve, reject) => {
            server("history", 'GET').then((response) => {
                resolve(response);
            }).catch((error) => {
                reject("Failed to get history");
            })
        });
    }
}

export default HistoryService;