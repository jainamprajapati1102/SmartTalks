import e from "express";

const app = e();

app.get("/", (req, res) => {
  res.send("Hello From jainam");
});
app.use('/socket.io',socketRoute)
// app.get('/socket.io/?')

export default app;