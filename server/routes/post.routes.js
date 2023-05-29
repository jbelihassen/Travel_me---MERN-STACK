const isAuth = require('../middelwares/isAuth');
const postControllers = require("../controllers/post.controller");
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
    app.post('/api/newPost',upload.single('image'),isAuth,postControllers.createPost);
    app.get('/api/posts',postControllers.getPosts);//!!! add isAuth in frontEnd also
    
    app.get('/api/showPost/:id',isAuth,postControllers.getPost);
    app.put('/api/updatePost/:id',postControllers.updatePost);
    app.delete('/api/deletePost/:id',postControllers.deletePost);
    app.patch('/api/likePost/:id',postControllers.likePost);
    app.patch('/api/:id/commentPost',postControllers.commentPost);

}


