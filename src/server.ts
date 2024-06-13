import { app } from "./app";

import { connectDB } from "./data/database";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`The server is working on port:${port}`);
});
