import fs from "fs";
import Utca from "./Utca";

export default class Solution {
    #utca: Utca[] = [];

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                if (aktSor.length > 0) {
                    this.#utca.push(new Utca(aktSor));
                }
            });
    }
}
