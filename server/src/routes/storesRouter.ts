import { Router } from "express";
import db from "../db/connection/pool";
import { get_chain, get_stores } from '../query/storesQuery';

const storesRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: API for managing stores and chains
 */

/**
 * @swagger
 * /chains:
 *   get:
 *     tags: [Stores]
 *     summary: Retrieve chains data
 *     responses:
 *       200:
 *         description: A list of chains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The chain ID.
 *                   name:
 *                     type: string
 *                     description: The name of the chain.
 *                   image_logo:
 *                     type: string
 *                     description: URL of the chain's logo.
 */
storesRouter.get('/chains', async (_, res) => {
    const result = await get_chain(db);
    res.send(result);
});

/**
 * @swagger
 * /stores:
 *   get:
 *     tags: [Stores]
 *     summary: Retrieve stores data
 *     responses:
 *       200:
 *         description: A list of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The store ID.
 *                   name:
 *                     type: string
 *                     description: The name of the store.
 *                   chainID:
 *                     type: integer
 *                     description: The ID of the chain the store belongs to.
 */
storesRouter.get('/stores', async (_, res) => {
    const result = await get_stores(db);
    res.send(result);
});

export default storesRouter;
