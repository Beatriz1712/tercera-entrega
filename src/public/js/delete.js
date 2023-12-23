document.querySelectorAll('.delete-product-btn').forEach(button => {
    button.addEventListener('click',function(e){
        e.preventDefault();
        const cartId = this.dataset.cartid;
        const productId = this.dataset.productId;
        fetch(`/cart/${cartId}/products/${productId}`,{
            method: `DELETE`
        }).then(response => {
            if (response.ok){
                //elimina el elmento del DOM o recargar la pagina
                console.log("\u001b[1;35mProducto eliminado");
            } else {
                //manejo deerrores
                console.error('Error al eliminar el producto');
            }
        }).catch(error => {
            console.error('Error', error);
        })
        })
    })

