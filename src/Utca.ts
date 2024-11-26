export default class Utca {
    #parosparatlan: number;
    #telekszel: number;
    #keritesszin: string;

    get parosparatlan(): number {
        return this.#parosparatlan;
    }

    get telekszel(): number {
        return this.#telekszel;
    }

    get keritesszin(): string {
        return this.#keritesszin;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#parosparatlan = parseInt(m[0], 10);
        this.#telekszel = parseInt(m[1], 10);
        this.#keritesszin = m[2];
    }
}
