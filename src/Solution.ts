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

    get LastSoldSideSite() {
        // Az utolsó eladott telek
        const lastSite = this.#utca[this.#utca.length - 1];

        // Oldal meghatározása (páros / páratlan)
        const side = lastSite.parosparatlan === 0 ? "páros" : "páratlan";

        // Házszám kiszámítása
        let houseNumber = 0;
        if (lastSite.parosparatlan === 0) {
            // Páros oldalon: 2, 4, 6, ...
            houseNumber = 2 * this.#utca.filter(site => site.parosparatlan === 0).length;
        } else {
            // Páratlan oldalon: 1, 3, 5, ...
            houseNumber = 2 * this.#utca.filter(site => site.parosparatlan === 1).length - 1;
        }

        // Visszatérés a kívánt formátumban
        return `A ${side} oldalon adták el az utolsó telket. \nAz utolsó telek házszáma: ${houseNumber} \n`;
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
