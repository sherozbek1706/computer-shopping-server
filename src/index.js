const express = require("express");
const cors = require("cors");
const ip = require("ip");
const config = require("./shared/config");
const bodyParser = require("body-parser");
const { NotFoundError } = require("./shared/errors");

// ROUTER
const brandRouter = require("./routes/brands");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const modelsRouter = require("./routes/models");
const categoryRouter = require("./routes/category");
const computerRouter = require("./routes/computers");

const app = express();
const PORT = config.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROUTER MIDDLEWARE
app.use(brandRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(modelsRouter);
app.use(categoryRouter);
app.use(computerRouter);

app.use((err, req, res, next) => {
  let status = 500;
  if (err instanceof NotFoundError) {
    status = 404;
  }

  res.status(status).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}`);
  console.log(`Your localhost: http://localhost:${PORT}`);
  console.log(`Your localAddress: http://${ip.address()}:${PORT}`);
});
