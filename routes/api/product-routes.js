const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
// DONE DONE DONE DONE DONE
router.get("/", async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [
                {
                    model: Category,
                },
                {
                    model: Tag,
                    through: ProductTag,
                },
            ],
            attributes: ["id", "product_name", "price", "stock", "category_id"],
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
    // find all products
    // be sure to include its associated Category and Tag data
});

// get one product
router.get("/:id", async (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    try {
        const productData = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                },
                {
                    model: Tag,
                    through: ProductTag,
                },
            ],
            attributes: ["id", "product_name", "price", "stock", "category_id"],
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new product
router.post("/", (req, res) => {
    /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    Product.create(req.body)
        .then((product) => {
            // if there's product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tags.length) {
                const productsToBeAssigned = req.body.tags;
                const productTagIdArr = productsToBeAssigned.map((tag) => {
                    return { product_id: req.body.id, tag_id: tag.id };
                });
                res.status(200).json(product);
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update product
router.put("/:id", async (req, res) => {
    // update product data
    console.log(req.body);
    try {
        await Product.update(
            {
                id: req.body.id,
                product_name: req.body.product_name,
                price: req.body.price,
                stock: req.body.stock,
                category_id: req.body.category.id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(
            `Successfully updated product with 'product_id': ${req.params.id}.`
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", (req, res) => {
    // delete one product by its `id` value
    Product.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedProduct) => {
            res.json(
                `Successfully deleted ${deletedProduct} product with 'product_id': ${req.params.id}.`
            );
        })
        .catch((err) => res.json(err));
});

module.exports = router;
