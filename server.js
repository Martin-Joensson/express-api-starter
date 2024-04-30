import express from "express";
import cors from "cors";

// Import the data
import magicItemsData from "./data/magicItems.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// Root address.. http://localhost:8080/
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/magic-items", (req, res) => {
  res.json(magicItemsData);
});

// Get one item based on id
// http://localhost:8080/magic-items/12
app.get("/magic-items/:itemId", (req, res) => {
  const { itemId } = req.params;
  console.log("Item id: ", itemId);

  // The + before itemId makes the string into a number.
  const item = magicItemsData.find((findItem) => +itemId === findItem.id);

  if (item) {
    res.json(item)
  }
  else {
    res.status(404).send("No item found!")
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
