import priceHistoryRouter from "./routes/priceHistoryRouter"
import searchRouter from "./routes/searchRouter"
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db/connection/pool'
import errorHandler from './middlewares/errorHandler'
import express from 'express'
import routes from './routes/initialsetup'
import storesRouter from './routes/storesRouter'
import categoryRouter from './routes/categoryRouter'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Grocery Comparison API",
			version: "1.0.0",
			description: "API documentation for the Grocery Comparison server",
		},
	},
	apis: ["./src/routes/*"],
}

const specs = swaggerJsdoc(options)

app.use(cors())
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

db.execute("SELECT NOW()")
	.then(() => console.log("Database connection is successful"))
	.catch((err) => console.error("Database connection check failed:", err))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.use("/",
	routes,
	storesRouter,
	categoryRouter,
	searchRouter,
	priceHistoryRouter
)

app.use(errorHandler)

export default app
