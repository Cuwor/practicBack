var express = require('express')
var models = require('./models')
var app = express()
var bodyParser = require('body-parser')
var Joi = require('joi')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var sanitize = require('sanitize-html')


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
async function(email, password, done) {
  let currentUser = await models.User.findOne({
    where: {
      email: email
    }
  })
  if (!currentUser) {
    return done(null, false)
  }
  if (!currentUser.comparePassword(password)) {
    return done(null, false)
  }
  return done(null, currentUser)
}
))

passport.serializeUser(async function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  let user = await models.User.findById(id)
  done(null, user)
})

app.get('/', async function(req, res) {
  var data = {}
  var last_page = Math.ceil( (await models.post.count()) /10 ) || 1
  data.user = req.user
  data.posts = await models.post.findAll({
    limit:10,
    order: [['updatedAt', 'DESC']],
    include:[{model:models.user}]
  })
  data.page = {'title':'Главная','current':1,'last':last_page}
  res.render('index', data)
})

app.get('/page/:page', async function(req, res) {
  var data = {}
  var last_page = Math.ceil( (await models.post.count()) /10 ) || 1
  if ( req.params.page>last_page ){
    return res.redirect('/page/'+last_page)
  }
  data.user = req.user
  data.posts = await models.post.findAll({
    limit:10,
    order: [['updatedAt', 'DESC']],
    include:[{model:models.user}]
  })
  data.page = {'title':'Главная','current':1,'last':last_page}
  res.render('index', data)
})

app.get('/register', async function(req, res) {
  if (req.isAuthenticated()) return res.redirect('/')
  var data = {
    title: 'Регистрация'
  }
  data.errors = []
  data.user = req.user
  res.render('register', data)
})

app.post('/register', async function(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/')
  var schema = Joi.object().keys({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().max(40).required(),
    password: Joi.string().min(6).max(20).required(),
    password2: Joi.any().valid(Joi.ref('password')).required().options({
      language: {
        any: {
          allowOnly: 'Введенные пароли не совпадают'
        }
      }
    })
  })

  var reqData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
  }
  var result = Joi.validate(reqData, schema)

  if (reqData.email) {
    var wantedEmail = await models.User.findOne({
      where: {
        email: reqData.email
      }
    })
  }

  if (!result.error && !wantedEmail) {
    let user = await models.User.create({
      name: reqData.name,
      email: reqData.email,
      password: reqData.password,
      isAdmin: false
    })
    req.login(user, function(err) {
      // if server error
      if (err) return next(err)
      // ok -> redirect
      return res.redirect('/')
    })
  } else {
    var data = {
      title: 'Регистрация'
    }
    data.errors = []
    if (wantedEmail) {
      data.errors.push({
        message: 'Данный email уже существует'
      })
    }
    if (result.error) {
      for (let err of result.error.details) {
        data.errors.push({
          'message': err.message.slice(err.message.indexOf('2" ') + 3)
        })
      }
    }
  }
  data.user = req.user
  res.render('register', data)
})

var pasAuth = function(req, res, next) {
  passport.authenticate('local',
    function(err, user) {
      try {
        req.login(user, function(err) {
          if (err) return next(err)
          return res.redirect('/')
        })
      } catch (err) {
        console.log(err)
        var data = {
          title: 'Авторизация'
        }
        data.errors = []
        data.errors.push({
          message: 'Неверный логин или пароль'
        })
        return res.render('auth', data)
      }
    }
  )(req, res, next)
}

app.post('/auth', async function(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/')
  var data = {
    title: 'Авторизация'
  }
  data.user = req.user
  data.errors = []

  return pasAuth(req, res, next)
})

app.get('/auth', async function(req, res) {
  var data = {
    title: 'Авторизация'
  }
  data.errors = []
  data.user = req.user
  res.render('auth', data)
})

app.get('/post/new', async function(req, res) {
  if (!req.isAuthenticated()) return res.redirect('/auth')
  var data = {
    title: 'Новая статья'
  }
  data.errors = []
  data.user = req.user
  data.fields = {}
  res.render('new', data)
})

app.post('/post/new', async function(req, res) {

  if (!req.isAuthenticated()) return res.redirect('/auth')

  var reqData = {
    title: req.body.title,
    preview: req.body.preview,
    text: req.body.text
  }

  var sanitizeConfig = {
    allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'b', 'i', 'blockquote', 'pre', 'a'],
    allowedAttributes: {
      'a': ['href'],
      'img': ['alt', 'src']
    }
  }

  var newData = {
    title: sanitize(reqData.title, sanitizeConfig),
    preview: sanitize(reqData.preview, sanitizeConfig),
    text: sanitize(reqData.text, sanitizeConfig)
  }

  try {
    var post = await models.Post.create({
      userId: req.user.id,
      title: newData.title,
      preview: newData.preview,
      text: newData.text
    })
    res.redirect('/post/' + post.id)
  } catch (err) {
    console.log(err)
    var data = {
      title: 'Новая статья'
    }
    data.user = req.user
    data.fields = newData
    data.errors = [{
      message: 'Ошибка неизвестна'
    }]
    res.render('new', data)
  }
})

app.get('/post/:id', async function(req, res) {
  var data = await models.Post.findById(req.params.id, {
    include: [models.User]
  })
  data.user = req.user
  data = {
    title: data.title
  }
  res.render('post', data)
})

app.post('/post/:id', async function(req, res) {

  var post = await models.post.findById(req.params.id)

  var reqData = {
    title: req.body.title,
    preview: req.body.preview,
    text: req.body.text
  }

  var sanitizeConfig = {
    allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'b', 'i', 'blockquote', 'pre', 'a'],
    allowedAttributes: {
      'a': ['href'],
      'img': ['alt', 'src']
    }
  }

  var newData = {
    title: sanitize(reqData.title, sanitizeConfig),
    preview: sanitize(reqData.preview, sanitizeConfig),
    text: sanitize(reqData.text, sanitizeConfig)
  }

  try {
    await post.update({
      userId: req.user.id,
      title: newData.title,
      preview: newData.preview,
      text: newData.text
    })
    res.redirect('/post/' + post.id)
  } catch (err) {
    console.log(err)
    var data = {
      title: 'Новая статья'
    }
    data.user = req.user
    data.fields = newData
    data.errors = [{
      message: 'Ошибка неизвестна'
    }]
    res.render('post', data)
  }
})


app.get('/post/:id/edit', async function(req, res) {
  if (!req.isAuthenticated()) return res.redirect('/auth')
  var post = await models.Post.findById(req.params.id)
  var data = {
    title: 'Редактировать статью'
  }
  data.errors = []
  data.user = req.user
  data.fields = {title:post.title, preview:post.preview, text:post.text}
  res.render('edit', data)
})

app.get('/post/:id/delete', async function(req,res){
  if( !req.isAuthenticated() ) return res.redirect('/auth')

  var post = await models.Post.findById(req.params.id)

  if( req.user.id != post.userId && !req.user.isAdmin ){
    return res.redirect('/post/'+req.params.id)
  }
  await post.destroy()

  res.redirect('/')
})

app.get('/author/:id', async function(req, res) {
  var data = {}
  data.pageUser = await models.User.findById( req.params.id,
    {include:[{model:models.Post, as:'Post'}]} )
  data.user = req.user
  res.render('author', data)
})

app.get('/logout', function(req, res) {
  console.log('logging out')
  req.logout()
  res.redirect('/')
})

models.sequelize.authenticate().then(function() {
  console.log('CONNECTED! ')
  app.listen(3000, function() {
    console.log('3000 port activated')
  })
}).catch(function(err) {
  console.log(err)
})
