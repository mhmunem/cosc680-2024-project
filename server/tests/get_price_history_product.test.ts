import app from "../src/app"
import request from "supertest"
import { get_price_history_product } from "../src/query/priceHistory"
import { test_db, test_pool } from "./test_utils"


describe('test get_price_history_product', () => {
    const result_length = 31

    afterAll(async () => {
        await test_pool.end()
    })

    test('Function test', async () => {
        const data = await get_price_history_product(test_db, 1, 31)

        return expect(data.length).toStrictEqual(result_length)
    })

    // API test
    test("GET /price_history", async () => {
        const { body } = await request(app).get("/price_history?product_id=1&past_n_days=31")

        return expect(body.length).toStrictEqual(result_length)
    })
})
