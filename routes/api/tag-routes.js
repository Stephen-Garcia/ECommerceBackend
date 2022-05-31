const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({});
    res.json(tag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id);
    res.json(tag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag_name = await Tag.create(req.body);
    res.json(tag_name);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const affectedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!affectedTag[0]) {
      res.status(404).json({ message: 'No Tag with this ID!'});
    };
    res.json(affectedTag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.findByPk(req.params.id);
    await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedTag);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;