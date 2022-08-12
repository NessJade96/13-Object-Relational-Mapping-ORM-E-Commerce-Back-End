const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
	try {
		console.log("test");
		const tagsData = await Tag.findAll({
			include: { model: Product, through: ProductTag, as: "products" },
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
			include: { model: Product, through: ProductTag, as: "products" },
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
	try {
		const [rowsUpdated] = await Tag.update(
			{ tag_name: req.body.tag_name },
			{ where: { id: req.params.id } }
		);

		if (rowsUpdated === 1) {
			const updatedTag = await Tag.findByPk(req.params.id);
			res.status(201).json(updatedTag);
		} else {
			// Nothing was updated
			res.status(204);
			res.end();
		}
	} catch (err) {
		res.status(400).json(err);
	}
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
