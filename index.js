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
import categoryRouter from "./routes/categoryRoute.js";
import payRouter from "./routes/payRoutes.js";

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
app.use("/api/category/", categoryRouter);
app.use("/api/pay/", payRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
	res.send("server is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const store_id = process.env.STORED_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

console.log(store_id);
console.log(store_passwd);

console.log("sina", PORT);

app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} on port ${PORT} 🔥🔥🔥🚀🚀`
			.yellow.bold
	)
);
