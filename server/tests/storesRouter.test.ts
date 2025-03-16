import app from "../src/app"
import request from "supertest"
import { test_db, test_pool } from "./test_utils"
import { get_chain, get_stores } from "../src/query/storesQuery"


afterAll(async () => {
    await test_pool.end()
})

describe('test chains', () => {
    const result = [
        { id: 1, image_logo: "TWE6QX3hhNxoyXL", name: "Super Value" },
        { id: 2, image_logo: "8JydW9QLevHg5wajZ", name: "New World" },
        { id: 3, image_logo: "m2gBdfTbdeqp", name: "Pak'n Save" },
        { id: 4, image_logo: "hoDHhpizHswPBSbVUqiQ", name: "Fresh Choice" },
        { id: 5, image_logo: "VTHMQeGOjgTZyMI", name: "The Warehouse" },
        { id: 6, image_logo: "EkD4NpUAjCBr41MVX6S2", name: "Wools Worth" }
    ]

    test('Function test get_chain', async () => {
        const data = await get_chain(test_db)

        return expect(data).toStrictEqual(result)
    })

    // API test
    test("GET /chains", async () => {
        const { body } = await request(app).get("/chains")

        return expect(body).toStrictEqual(result)
    })
})

describe('test stores', () => {
    const result = [
        { id: 1, name: "PAK'nSAVE Dunedin", chainID: 2 },
        { id: 2, name: 'Fresh Choice Geraldine', chainID: 6 },
        { id: 3, name: 'Super Value Pauanui', chainID: 5 },
        { id: 4, name: 'Super Value Reefton', chainID: 6 },
        { id: 5, name: 'Fresh Choice Half Moon Bay', chainID: 5 },
        { id: 6, name: 'Woolworths Auckland Airport', chainID: 1 },
        { id: 7, name: 'Super Value Wanganuik', chainID: 4 },
        { id: 8, name: 'Woolworths Ashburton', chainID: 1 },
        { id: 9, name: 'Woolworths Andersons Bay', chainID: 4 },
        { id: 10, name: 'Super Value Bell Block', chainID: 5 },
        { id: 11, name: 'Woolworths Aotea', chainID: 5 },
        { id: 12, name: 'New World Blenheim', chainID: 5 },
        { id: 13, name: "PAK'nSAVE Glen Innes", chainID: 4 },
        { id: 14, name: 'Fresh Choice Green Island', chainID: 4 },
        { id: 15, name: 'Super Value Plaza', chainID: 1 },
        { id: 16, name: 'Fresh Choice Huntly', chainID: 6 },
        { id: 17, name: 'Fresh Choice Kelly Road', chainID: 3 },
        { id: 18, name: 'Woolworths Auckland Victoria Street West', chainID: 6 },
        { id: 19, name: 'Woolworths Amberley', chainID: 1 },
        { id: 20, name: 'Fresh Choice Glen Eden', chainID: 3 },
        { id: 21, name: 'Woolworths Auckland Quay Street', chainID: 6 },
        { id: 22, name: 'Super Value Milton', chainID: 6 },
        { id: 23, name: 'Fresh Choice Greytown', chainID: 3 },
        { id: 24, name: 'Fresh Choice Avondale', chainID: 5 },
        { id: 25, name: 'Super Value Tinwald', chainID: 2 },
        { id: 26, name: 'Fresh Choice Greerton', chainID: 2 },
        { id: 27, name: "PAK'nSAVE Clendon", chainID: 1 },
        { id: 28, name: "PAK'nSAVE Hastings", chainID: 4 },
        { id: 29, name: 'Woolworths Awapuni', chainID: 3 },
        { id: 30, name: "PAK'nSAVE Cameron Road", chainID: 4 },
        { id: 31, name: "PAK'nSAVE Clarence St", chainID: 2 },
        { id: 32, name: 'Woolworths Ashburton South', chainID: 6 },
        { id: 33, name: 'Fresh Choice Flat Bush', chainID: 1 },
        { id: 34, name: 'Woolworths Avonhead', chainID: 3 },
        { id: 35, name: 'New World Ashburton', chainID: 3 },
        { id: 36, name: 'New World Botany', chainID: 4 },
        { id: 37, name: 'New World Bishopdale', chainID: 1 },
        { id: 38, name: 'New World Birkenhead', chainID: 5 },
        { id: 39, name: 'New World Aokautere', chainID: 3 },
        { id: 40, name: "PAK'nSAVE Botany", chainID: 5 },
        { id: 41, name: "PAK'nSAVE Alderman Dr Hen", chainID: 4 },
        { id: 42, name: 'New World Balclutha', chainID: 2 },
        { id: 43, name: "PAK'nSAVE Hawera", chainID: 2 },
        { id: 44, name: "PAK'nSAVE Albany", chainID: 3 },
        { id: 45, name: 'New World Alexandra', chainID: 3 },
        { id: 46, name: "PAK'nSAVE Blenheim", chainID: 6 },
        { id: 47, name: 'The Warehouse', chainID: 5 }
    ]

    test('Function test get_stores', async () => {
        const data = await get_stores(test_db)

        return expect(data).toStrictEqual(result)
    })

    // API test
    test("GET /stores", async () => {
        const { body } = await request(app).get("/stores")

        return expect(body).toStrictEqual(result)
    })
})
