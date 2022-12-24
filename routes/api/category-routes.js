const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findAll({
            include: [
                {
                    model: Product,
                },
            ],
            // attributes: ["id", "product_name", "price", "stock", "category_id"],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [
                {
                    model: Product,
                },
            ],
            // attributes: ["id", "product_name", "price", "stock", "category_id"],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", (req, res) => {
    // create a new category

    Category.create(req.body)
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put("/:id", (req, res) => {
    // update a category by its `id` value
    Category.update(
        {
            id: req.body.id,
            categoryName: req.body.categoryName,
            products: [
                {
                    id: req.body.products.id,
                    product_name: req.body.products.product_name,
                    price: req.body.products.price,
                    stock: req.body.products.stock,
                    category_id: req.body.products.category_id,
                    categoryId: req.body.products.categoryId,
                },
            ],
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedCategory) => {
            res.json(updatedCategory);
        })
        .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedCategory) => {
            res.json(
                `Successfully deleted ${deletedCategory} category with "category_id": ${req.params.id}.`
            );
        })
        .catch((err) => res.json(err));
});

module.exports = router;
