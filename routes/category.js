// routes/categories.js
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// const { isAdmin } = require("../middleware/auth");

const {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const { isAdmin } = require("../middleware/auth");

// get all categories
router.get("/", async (req, res) => {
  try {
    const category = await getCategories();
    res.status(200).json(category);
  } catch (err) {
    res.status(400).send({ error: "Error fetching category: " + err.message });
  }
});

// get one category
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const category = await getCategory(id);
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(400).send("Category not Found");
    }
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add new category
router.post("/", isAdmin, async (req, res) => {
  // Add back isAdmin between / and async and also for update and delete
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).send({
        error: "Error: Error",
      });
    }
    const newCategory = await addNewCategory(name);
    res.status(200).send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update category
router.put("/:id", isAdmin, async (req, res) => {
  try {
    // Retrieve id from URL
    const id = req.params.id;
    const name = req.body.name;
    // Pass in the data into the updateCategory function
    const updatedCategory = await updateCategory(id, name);
    res.status(200).send(updatedCategory);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete category
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    // Retrieve the id from the URL
    const id = req.params.id;
    // Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const category = await getCategory(id);
    // If the category does not exist
    if (!category) {
      /* !category because it is returning either a single object or null */
      return res.status(404).send({
        error: `Error: No match for a category found with the id "${id}".`,
      });
    }
    // Trigger the deletecategory function
    await deleteCategory(id);
    res.status(200).send({
      message: `Alert: Category with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
