import ProductsServices from "../services/products.service.js"

const pServices = new ProductsServices()

const viewProduct = async (req, res, next) => {
  try {
    let data = await pServices.getProductsService(6)

    res.render('products', data)

  } catch (error) {
    next(error)
  }
}

const viewCart = async (req, res, next) => {
  try {
    let data = await cartsDao.getDataByID(req.params.cid)

    res.render('carts', data)

  } catch (error) {
    next(error)
  }
}

const viewHome = async (req, res, next) => {
  try {
    res.render('home', {})

  } catch (error) {
    next(error)
  }
}

const viewRegister = async (req, res, next) => {
  try {
    res.render('register', {})

  } catch (error) {
    next(error)
  }
}

const viewLogin = async (req, res, next) => {
  try {
    let user = req.user

    if (user) { user = req.user.payload }

    res.render('login', {
      exists: (user) ? true : false,
      user
    })

  } catch (error) {
    next(error)
  }
}

const viewLogout = async (req, res, next) => {
  try {
    res.cookie('loginToken', '', { maxAge: 1 }).redirect('/')

  } catch (error) {
    next(error)
  }
}

export {
  viewProduct,
  viewCart,
  viewHome,
  viewRegister,
  viewLogin,
  viewLogout
}