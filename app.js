if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/user"));
app.use("/province", require("./routes/province"));
app.use("/city", require("./routes/city"));
app.use("/branch", require("./routes/branch"));
app.use("/forwarder", require("./routes/forwarder"));
app.use("/customer", require("./routes/customer"));
app.use("/role", require("./routes/role"));
app.use("/service", require("./routes/service"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
