import { Router } from 'express';


const router = Router()

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome message
 *     responses:
 *       200:
 *         description: Welcome to the Grocery Comparison
 */
router.get('/', (_, res) => {
    res.send('Welcome to the Grocery Comparison from server!');
});

/**
 * @swagger
 * /initialSetup:
 *   get:
 *     description: Test GET request
 *     responses:
 *       200:
 *         description: GET is working.
 */
router.get('/initialSetup', (_, res) => {
    res.send('GET is working.');
});

/**
 * @swagger
 * /initialSetup:
 *   post:
 *     description: Test POST request
 *     responses:
 *       200:
 *         description: POST is working.
 */
router.post('/initialSetup', (_, res) => {
    res.send('POST is working.');
});

/**
 * @swagger
 * /initialSetup/{id}:
 *   put:
 *     description: Update a resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PUT is working for the specified ID
 */
router.put('/initialSetup/:id', (req, res) => {
    res.send(`PUT is working for ID: ${req.params.id} `);
});

/**
 * @swagger
 * /initialSetup/{id}:
 *   delete:
 *     description: Delete a resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: DELETE is working for the specified ID
 */
router.delete('/initialSetup/:id', (req, res) => {
    res.send(`DELETE is working for ID: ${req.params.id} `);
});


export default router;
