const actualValue = 5
const expectValue = 5

describe("1st Test Suite", ()=>{
    test("1st test case", ()=>{
        expect(actualValue).toBe(expectValue)
    })

    test("2nd test case", ()=>{
        expect(process.env.BASE_URL).toBe("https://qauto.forstudy.space/api")
    })
})

