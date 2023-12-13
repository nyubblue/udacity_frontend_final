import { validatePlace, validateTripDate } from "../client/js/weather/validate";

const inputPlaces = ['', 'da nang', '&', 'Ha nang 1'];
const outputPlace = [{ code: 1 }, { code: 0 }, { code: 2 }, { code: 0 }];
describe("Check empty", () => {
    test(`Input : ${JSON.stringify(inputPlaces)}`, () => {
        inputPlaces.forEach((data, idx) => {
            let rtnData = validatePlace(data);
            expect(rtnData).toMatchObject(outputPlace[idx]);
        })


    });
});

const inputDates = ['', '1234/23838/28', '&', '2023/13/20', '2023/12/35', '2022/11/10', '2024/12/14'];
const outputDates = [{ code: 1 }, { code: 2 }, { code: 2 }, { code: 3 }, { code: 4 }, { code: 5 }, { code: 0 }];
describe("Check empty", () => {
    test(`Input : ${JSON.stringify(inputDates)}`, () => {
        inputDates.forEach((data, idx) => {
            let rtnData = validateTripDate(data);
            expect(rtnData).toMatchObject(outputDates[idx]);
        })


    });
});
