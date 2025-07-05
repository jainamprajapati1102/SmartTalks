import e from "express";
import signupRoute from "./routes/user.routes.js";
import cors from "cors";
import connectDB from "./db/db_con.js";
import cookieParser from "cookie-parser";
connectDB();
const app = e();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(e.json());
// app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors);
app.get("/", (req, res) => {
  res.send("Hello From jainam");
});
// app.use("/socket.io", socketRoute);
// app.get('/socket.io/?')z
app.use("/user", signupRoute);

export default app;
