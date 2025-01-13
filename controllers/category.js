const Category = require("../models/category");

const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const getCategory = async (id) => {
  const category = await Category.findOne({ _id: id });
  return category;
};

const addNewCategory = async (name) => {
  const newCategory = new Category({
    name,
  });
  await newCategory.save();
  return newCategory;
};

const updateCategory = async (_id, name) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id },
    { name },
    { new: true }
  );
  return updatedCategory;
};

const deleteCategory = async (_id) => {
  const deleteCategory = await Category.deleteOne({ _id });
  return deleteCategory;
};

module.exports = {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
