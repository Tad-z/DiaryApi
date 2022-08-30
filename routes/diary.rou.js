const express = require("express");
const { postDiary, patchDiary, getDiaries, getDiary } = require("../controllers/diary.con");
const { deleteDiary } = require("../controllers/diary.con");
const router = express.Router();

router.post('/', postDiary);
router.patch('/:id', patchDiary);
router.get('/', getDiaries);
router.get('/:id', getDiary);
router.delete('/:id', deleteDiary);





module.exports = router;