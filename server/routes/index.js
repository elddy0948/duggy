var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send({eeee : "hello world!"});
});

module.exports = router;