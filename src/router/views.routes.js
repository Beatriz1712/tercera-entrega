import { Router } from "express";
const router = Router()
import CartRepository from "../repositories/CartRepository.js";
import ProductManager from "../controllers/ProductManager.js"
import CartManager from "../controllers/CartManager.js"
import { isAdmin } from "../config/middlewares.js";

const product = new ProductManager
const cart = new CartManager
const repocart = new CartRepository
//Pagina inicial
router.get("/", (req, res)=> {
    res.render("home", {
        title: "Ecommerce App Backend"
    })
})


// Middleware para verificar la autenticación del usuario
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // Verifica si el usuario está autenticado
      return next();
    }
    res.redirect("/login"); // Redirige al usuario a la página de inicio de sesión
  };


//Chat
router.get("/chat", isAuthenticated, (req, res) => {
  res.render("chat", {
    title: "Chat con Mongoose"
  });
});

//Renderizado de productos
router.get("/products", async (req, res) => {
    
    let allProducts = await product.getProducts()
    console.log(allProducts)
    allProducts = allProducts.map(product => product.toJSON())
    res.render("productos", {
        title: "Ecommerce App | Productos",
        products : allProducts
    })
})

//Renderizado de detalle de productos
router.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productDetails = await product.getProductById(productId);
        if (productDetails) {
            // Verifica que los valores sean números antes de la conversión
            const price = typeof productDetails.price === 'number' ? productDetails.price : 0;
            const stock = typeof productDetails.stock === 'number' ? productDetails.stock : 0;
            const minimo = typeof productDetails.minimo === 'number' ? productDetails.minimo : 0;

            const cleanedProduct = {
                title: productDetails.title,
                description: productDetails.description,
                price: price,
                stock: stock,
                minimo: minimo,
                category: productDetails.category,
                thumbnails: productDetails.thumbnails,
                // Agrega otras propiedades aquí si es necesario
            };
            
            res.render("detail", { product: cleanedProduct });
        } else {
            // Manejo de producto no encontrado
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

//renderizado de productos en carrito
router.get("/cart", async (req, res) => {
    if (!req.user || !req.user._id) {
        // Manejar el caso en que el usuario no esté autenticado
        return res.redirect("/login"); // Redirigir a la página de inicio de sesión, por ejemplo
    }
    try {
        //console.log(req.user._id)  
        const userId = req.user._id;
        //console.log(userId)
        let userCart = await repocart.getCartById(userId); 
        
        console.log(userCart)     // Función para obtener el carrito del usuario

        res.render("cart", {
            title: "Vista Carro",
            cart: userCart // Pasar el carrito específico del usuario a la plantilla
        });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje de error
    }
});

//Login
router.get("/login", async (req, res) => {
    res.render("login", {
        title: "Vista Login",
    });
    
})

//register
router.get("/register", async (req, res) => { 
    res.render("register", {
        title: "Vista Register",
    });
})

//profile
router.get("/profile", isAdmin, async (req, res) => { 
    if (!req.session.emailUsuario) {
      return res.redirect("/login");
    }
    res.render("profile", {
      title: "Vista Profile Admin",
      first_name: req.session.nomUsuario,
      last_name: req.session.apeUsuario,
      email: req.session.emailUsuario,
      rol: req.session.rolUsuario,
      isAdmin: req.isAdmin // Pasar el indicador isAdmin a la vista profile
    });
  });


//Carga de Productos
router.get("/addProduct", async (req, res) => {
    res.render("addProduct", {
        title: "Carga de Productos",
    });
    
})



export default router