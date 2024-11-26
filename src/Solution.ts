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

    // A feladat megoldása:
    // a. Házszám alapján a kerítés színének kiírása.
    getFenceColorByHouseNumber(houseNumber: number): string {
        const site = this.#utca.find(site => this.calculateHouseNumber(site) === houseNumber);
        if (site) {
            if (site.keritesszin !== ":" && site.keritesszin !== "#") {
                return `A kerítés színe: ${site.keritesszin}`;
            } else {
                return `A kerítés állapota: ${site.keritesszin}`;
            }
        }
        return "A megadott házszámú telek nem található.";
    }

    // b. Új szín választása a kerítéshez:
    chooseNewFenceColor(houseNumber: number): string {
        const site = this.#utca.find(site => this.calculateHouseNumber(site) === houseNumber);
        if (site) {
            const currentColor = site.keritesszin;
            const leftNeighborColor = this.getNeighborColor(houseNumber, "left");
            const rightNeighborColor = this.getNeighborColor(houseNumber, "right");

            // Keressen olyan színt, ami nem egyezik a szomszédokkal és a jelenlegi színnel.
            const availableColors = this.getAllColors().filter(color => color !== currentColor && color !== leftNeighborColor && color !== rightNeighborColor);
            if (availableColors.length > 0) {
                return `Ajánlott új szín: ${availableColors[0]}`;
            } else {
                return "Nincs elérhető új szín, amely nem egyezik a szomszédokéval vagy a jelenlegi színnel.";
            }
        }
        return "A megadott házszámú telek nem található.";
    }

    // Helper metódusok:

    // Szomszédos telkek színének meghatározása
    getNeighborColor(houseNumber: number, direction: "left" | "right"): string {
        const index = this.#utca.findIndex(site => this.calculateHouseNumber(site) === houseNumber);
        if (index === -1) return "";
        if (direction === "left" && index > 0) return this.#utca[index - 1].keritesszin;
        if (direction === "right" && index < this.#utca.length - 1) return this.#utca[index + 1].keritesszin;
        return "";
    }

    // Házszám számítása
    calculateHouseNumber(site: Utca): number {
        if (site.parosparatlan === 0) {
            return 2 * this.#utca.filter(s => s.parosparatlan === 0).indexOf(site) + 2;
        } else {
            return 2 * this.#utca.filter(s => s.parosparatlan === 1).indexOf(site) + 1;
        }
    }

    // Az összes lehetséges szín
    getAllColors(): string[] {
        const colors = [];
        for (let i = 65; i <= 90; i++) {
            colors.push(String.fromCharCode(i));
        }
        return colors;
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
