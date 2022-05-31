const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(category);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { 
    include: [{ model: Product }]
  });
    res.json(category);
  } catch (e) {
    res.json(e);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category_name = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(category_name);
  } catch (e) {
    res.json(e);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const affectedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!affectedCategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
    };
    res.json(affectedCategory);
  } catch (e) {
    res.json(e);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.findByPk(req.params.id);
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedCategory);
  } catch (e) {
    res.json(e);
  };
});

module.exports = router;