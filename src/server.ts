import { app } from "./app.js";

import { connectDB } from "./data/database.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

await connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`The server is working on port:${port}`);
});
