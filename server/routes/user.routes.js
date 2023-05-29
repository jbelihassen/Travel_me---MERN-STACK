const isAuth = require('../middelwares/isAuth');

const {
  Register,
  GetAllUsers,
  Login,
  GetConnectedUser,
  GetUserById,
  EditUser,
} = require('../controllers/user.controller');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
module.exports = (app) => {
  app.post('/api/users', Register);
  app.post('/api/login', Login);
  app.get('/api/users', GetAllUsers);
  app.get('/api/getUseById/:id',GetUserById);
  app.put('/api/user/:id',upload.single('image'), EditUser);
  app.get('/api/user', isAuth, GetConnectedUser);
};
