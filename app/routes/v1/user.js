const router = require('express').Router();

router.post('/', (req, res) => res.json({ msg: 'Sample routes' }));

module.exports = router;
