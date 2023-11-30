import { postData } from "../client/js/connectUtil";

const inputArr = ['hello', '123', '&&w#'];
import fetch, { Response } from 'node-fetch';
global.fetch = fetch;

describe("Call API function (Normal)", () => {
    test(`Enter a "${inputArr[0]}"`, () => {
        return postData('http://localhost:8081/sentiment', { txt: inputArr[0] })
            .then(data => {
                expect(data).toMatchObject({ status: { code: "0" } });
            });
    });
});

describe("Call API function (Number)", () => {
    test(`Enter a "${inputArr[0]}"`, () => {
        return postData('http://localhost:8081/sentiment', { txt: inputArr[1] })
            .then(data => {
                expect(data).toMatchObject({ status: { code: expect.stringMatching(/[0]/) } });
            });
    });
});

describe("Call API function (Special)", () => {
    test(`Enter a "${inputArr[0]}"`, () => {
        return postData('http://localhost:8081/sentiment', { txt: inputArr[2] })
            .then(data => {
                expect(data).toMatchObject({ status: { code: expect.stringMatching(/[^0]/) } });
            });
    });
});