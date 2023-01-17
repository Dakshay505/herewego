const { register, login, setAvatar, allUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setavatar/:name",setAvatar);
router.get("/allusers/:id",allUsers);

module.exports = router;