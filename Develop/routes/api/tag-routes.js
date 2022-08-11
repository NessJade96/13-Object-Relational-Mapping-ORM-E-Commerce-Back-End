const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagsData = await Tag.findAll({
			include: {
				model: Product,
				attributes: ["product_name", "price", "stock", "category_id"],
			},
		});
		res.status(200).json(tagsData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const tagsData = await Tag.findByPk(req.params.id, {
			include: [
				{
					model: Product,
					attributes: [
						"id",
						"product_name",
						"price",
						"stock",
						"category_id",
					],
				},
			],
		});

		if (!tagsData) {
			res.status(404).json({ message: "No tags found with this id!" });
			return;
		}

		res.status(200).json(tagsData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	// create a new tag
	try {
		const tagsData = await Tag.create(req.body);
		res.status(200).json(tagsData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((tag) => {
			// find all associated products from ProductTag
			return ProductTag.findAll({ where: { tag_id: req.params.id } });
		})
		.then((productTags) => {
			// get list of current tag_ids
			const productTagIds = productTags.map(({ tag_id }) => tag_id);
			// create filtered list of new tag_ids
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return {
						product_id: req.params.id,
						tag_id,
					};
				});
			// figure out which ones to remove
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id);

			// run both actions
			return Promise.all([
				ProductTag.destroy({ where: { id: productTagsToRemove } }),
				ProductTag.bulkCreate(newProductTags),
			]);
		})
		.then((updatedProductTags) => res.json(updatedProductTags))
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
	try {
		const tagsData = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!tagsData) {
			res.status(404).json({ message: "No tags found with this id!" });
			return;
		}

		res.status(200).json(tagsData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;