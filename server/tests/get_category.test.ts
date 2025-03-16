import app from "../src/app"
import request from "supertest"
import { get_category } from "../src/query/categoryQuery"
import { test_db, test_pool } from "./test_utils"


describe('get_category function tests', () => {
    afterAll(async () => {
        await test_pool.end()
    })

    const results = [
        "Fruit & Veg",
        "Meat",
        "Fish",
        "Deli",
        "Bakery",
        "Frozen",
        "Pantry",
        "Beer & Wine",
        "Drinks",
        "Household",
        "Baby & Child",
        "Health & Body",
    ]

    test('all results', async () => {
        return await get_category(test_db).then(data => {
            expect(data.length).toEqual(results.length)
        })
    })

    // API test
    test("GET /category", async () => {
        const { body: data } = await request(app).get("/category")
        return expect(data.length).toStrictEqual(results.length)
    })
})


