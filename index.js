import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(cors());

app.use(express.json());

app.use("/api/users/", userRouter);
app.use("/api/products/", productRouter);
app.use("/api/upload/", uploadRouter);
app.use("/api/order/", orderRouter);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
	res.send("server is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} on port ${PORT} 🔥🔥🔥🚀🚀`
			.yellow.bold
	)
);
