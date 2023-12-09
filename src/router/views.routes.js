import express from "express";

const ViewsRouter = express.Router()

//Rutas GET para la página de inicio y detalles del producto:

ViewsRouter.get("/inicio", async (req, res) => {
    res.render("inicio", {
        title: "App de compras",
    })
})
ViewsRouter.get("/register", (req, res) => {
    res.render("register", {
        title: "Registro de Usuario"
    })
})

ViewsRouter.get("/login", (req, res) => {
    res.render("login", {
        title: "Login de Usuario"
    })
})

ViewsRouter.get("/products", (req, res) => {
  if (!req.session.email) {
    res.redirect("/login");
  }
/*
  let allProducts =  prod.getProducts();
  allProducts = allProducts.map((product) => product.toJSON());
  const userData = {
    first_name: req.session.first_name,
    last_name: req.session.last_name,
    email: req.session.email,
    role: req.session.role,
  };

  res.render("home", {
    title: "login-passport-github",
    products: allProducts,
    user: userData,
  });*/
});

export default ViewsRouter
