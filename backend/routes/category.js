// const express = require('express');
// const { DeleteCategory, CreateCategory, UpdateCategory, GetCategory,Paginate } = require('../controller/category');

// const router = express.Router();

// router.get('/', GetCategory); // Adjusted the route to match '/api/categories'
// router.post('/', CreateCategory);
// router.get('/paginate', Paginate);
// router.put('/:id', UpdateCategory);
// router.delete('/:id', DeleteCategory);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  DeleteCategory,
  CreateCategory,
  UpdateCategory,
  GetCategory,
  Paginate,
  getCategorySingle
} = require('../controller/category');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router.get('/', GetCategory);
router.post('/uploadimg', upload.single('file'), CreateCategory);
router.get('/paginate', Paginate);
router.get('/:id', getCategorySingle);
router.put('/:id', upload.single('file'), UpdateCategory);
router.delete('/:id', DeleteCategory);

module.exports = router;
