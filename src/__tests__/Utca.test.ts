import Utca from "../Utca";

describe("Utca osztály tesztek", () => {
    test("Utca osztálypédány ellenőrzése", () => {
        const sor = "10 20 P";
        const utcaInstance = new Utca(sor);

        expect(utcaInstance).toBeInstanceOf(Utca);
        expect(utcaInstance.parosparatlan).toBe(10);
        expect(utcaInstance.telekszel).toBe(20);
        expect(utcaInstance.keritesszin).toBe("P");
    });

    test("Input string helyes feldolgozása", () => {
        const sor = "15 25 G";
        const utcaInstance = new Utca(sor);

        expect(utcaInstance.parosparatlan).toBe(15);
        expect(utcaInstance.telekszel).toBe(25);
        expect(utcaInstance.keritesszin).toBe("G");
    });

    test("Edge case: string with no spaces between fields", () => {
        const sor = "12 24 B";
        const utcaInstance = new Utca(sor);

        expect(utcaInstance.parosparatlan).toBe(12);
        expect(utcaInstance.telekszel).toBe(24);
        expect(utcaInstance.keritesszin).toBe("B");
    });

    test("Hibás bemenet: hiányzó érték", () => {
        const sor = "10 20";
        const utcaInstance = new Utca(sor);
    });
});
