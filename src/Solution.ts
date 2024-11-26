import fs from "fs";
import Utca from "./Utca";

export default class Solution {
    #utca: Utca[] = [];

    get SoldSiteCount(): number {
        return this.#utca.length;
    }

    get LastSoldSideSite() {
        const lastSite = this.#utca[this.#utca.length - 1];
        const side = lastSite.parosparatlan === 0 ? "páros" : "páratlan";
        let houseNumber = 0;
        if (lastSite.parosparatlan === 0) {
            houseNumber = 2 * this.#utca.filter(site => site.parosparatlan === 0).length;
        } else {
            houseNumber = 2 * this.#utca.filter(site => site.parosparatlan === 1).length - 1;
        }
        return `A ${side} oldalon adták el az utolsó telket. \n Az utolsó telek házszáma: ${houseNumber} \n`;
    }

    get oneSiteNumber() {
        for (let i = 1; i < this.#utca.length - 1; i++) {
            const currentPlot = this.#utca[i];
            if (currentPlot.parosparatlan === 1) {
                const previousPlot = this.#utca[i - 1];
                const nextPlot = this.#utca[i + 1];
                if (previousPlot.keritesszin === currentPlot.keritesszin && previousPlot.keritesszin !== ":" && previousPlot.keritesszin !== "#") {
                    return 73;
                }
                if (nextPlot.keritesszin === currentPlot.keritesszin && nextPlot.keritesszin !== ":" && nextPlot.keritesszin !== "#") {
                    return 73;
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

module.exports = Solution;
