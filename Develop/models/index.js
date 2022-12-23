// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
// Product.belongsTo(Category, {
//     foreignKey: "category_id",
//     onDelete: "CASCADE",
// });

// // Categories have many Products
// Category.hasMany(Product, {
//     foreignKey: "category_id",
// });

// // Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag, {
//     through: { model: ProductTag, unique: false },
//     as: "products_tag_testing",
//     // foreignKey: "product_ID",
// });

// // Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(Product, {
//     through: { model: ProductTag, unique: false },
//     // as: "tag_product",
//     // foreignKey: "tag_ID",
// });

// WORKS!!!!
// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
Category.hasMany(Product);
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: "tag_id",
});

// ONE - TO - ONE === hasOne() & belongsTo()
// ONE - TO - MANY === hasMany() & belongsTo()
// MANY - TO - MANY === belongsToMany()

// TESTING
// Product.hasOne(Category, {
//     foreignKey: "category_id",
//     onDelete: "CASCADE",
// });

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
