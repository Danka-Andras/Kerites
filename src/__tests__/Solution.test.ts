import Solution from "../Solution";
import fs from "fs";

const testFileName = "test-data.txt";

describe("Solution Class Tests", () => {
    beforeEach(() => {
        const testData = `
      1: 1010, páratlan, zöld
      2: 1011, páros, piros
      3: 1012, páratlan, kék
    `;
        fs.writeFileSync(testFileName, testData.trim());
    });

    afterEach(() => {
        fs.unlinkSync(testFileName);
    });

    it("should initialize with correct number of sites", () => {
        const solution = new Solution(testFileName);

        expect(solution.SoldSiteCount).toBe(3);
    });
});
