// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: "category_ID",
    onDelete: "CASCADE",
});

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: "category_ID",
});

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, {
    through: ProductTag,
    foreignKey: "product_ID",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product, {
    through: ProductTag,
    foreignKey: "tag_ID",
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
