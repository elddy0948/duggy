var express = require('express');
var router = express.Router();
var body_parser = require('body-parser');

router.get('/', (req, res) => {});

router.get('/login', (req, res) => {
    let code = req.query.code;
    res.send(JSON.stringify(code));
    
});

router.get('/login2', (req, res) => {

})

module.exports = router;