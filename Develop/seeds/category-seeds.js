const { Category } = require("../models");

const categoryData = [
    {
        categoryName: "Shirts",
    },
    {
        categoryName: "Shorts",
    },
    {
        categoryName: "Music",
    },
    {
        categoryName: "Hats",
    },
    {
        categoryName: "Shoes",
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
