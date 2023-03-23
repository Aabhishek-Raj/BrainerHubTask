import express from 'express'
const path = require('node:path')

const router = express.Router()

router.get('/file/:filename', (req, res) => {

    const { filename } = req.params;

    const filePath = path.join(__dirname, '..', 'uploads', filename);

    res.sendFile(filePath);

});

export default router