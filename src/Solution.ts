import fs from "fs";
import Utca from "./Utca";

export default class Solution {
    #utca: Utca[] = [];

    get SoldSiteCount(): number {
        return this.#utca.length;
    }

    get oneSiteNumber() {
        for (let i = 0; i < this.#utca.length; i++) {
            const currentSite = this.#utca[i];

            if (currentSite.parosparatlan === 1 && currentSite.keritesszin !== ":" && currentSite.keritesszin !== "#") {
                if (i + 1 < this.#utca.length) {
                    const nextSite = this.#utca[i + 1];

                    if (nextSite.parosparatlan === 0 && nextSite.keritesszin === currentSite.keritesszin) {
                        const houseNumber = 2 * (i + 1) - 1;
                        return houseNumber;
                    }
                }
            }
        }

        return -1;
    }

    constructor(forrás: string) {
        const sorok = fs.readFileSync(forrás, "utf-8").split("\n");
        sorok.forEach(sor => {
            const aktSor: string = sor.trim();
            if (aktSor.length > 0) {
                this.#utca.push(new Utca(aktSor));
            }
        });
    }
}
