import { Router } from 'express';
import db from "../db/connection/pool";
import { get_category } from '../query/categoryQuery';



const router = Router()

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API for managing product category
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Category]
 *     summary: Retrieve product category data
 *     responses:
 *       200:
 *         description: A list of product category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product category ID.
 *                   name:
 *                     type: string
 *                     description: The name of the product category.
 */
router.get('/category', async (_, res) => {
    const result = await get_category(db);
    res.send(result);
});

export default router;