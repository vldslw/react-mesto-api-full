const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardRouters = require('./card');
const userRouters = require('./user');
const {
  addUser, login,
} = require('../controllers/user');
const auth = require('../middlewares/auth');
const {
  urlPattern,
} = require('../constants/constants');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), addUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);
router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
