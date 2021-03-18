// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#productos');
let productosCarrito = [];

cargarEventos();

function cargarEventos(){

    // Agregar un producto al darle click a 'Agregar al Carrito'
    listaProductos.addEventListener('click', agregarProducto);

    // Eliminar producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', () => {
    productosCarrito = []; // Resetear el arreglo
    clearHTML(); // Limpiar el HTML
    })
}

// Funciones

function agregarProducto(e){
    //e.preventDefault();

    // Me trae el HTML del Elemento clickeado
    if(e.target.classList.contains('agregar-carrito')){
        const datosProducto = e.target.parentElement.parentElement;
        leerDatosProducto(datosProducto);
    }
}

// Eliminar Producto
function eliminarProducto(e){
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');

        // Eliminar el producto del arreglo productosCarrito segun data-id
        productosCarrito = productosCarrito.filter( producto => producto.id !== productoId);
        
        // Iterar sobre el carrito y cargar el HTML
        crearCarritoHTML();
    }
}

function leerDatosProducto(producto){
    //console.log(producto);

    // Crear un objeto de producto
    const datosProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio strong').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisar si el elemento existe en el carrito
    const existeProducto = productosCarrito.some( producto => producto.id === datosProducto.id );
    if(existeProducto){
        // Actualizo la Cantidad
        const productos = productosCarrito.map( producto => {
            if(producto.id === datosProducto.id){
                producto.cantidad++;
                return producto; // Objeto Actualizado
            }else{
                return producto; // Objeto con los que no son duplicados
            }
        } );

        productosCarrito = [...productos];

    }else{
        //Agrego los elementos al carrito
        productosCarrito = [...productosCarrito, datosProducto];
    }
    
    //console.log(productosCarrito);

    crearCarritoHTML();

}

// Mostrar el Carrito en el HTML
function crearCarritoHTML(){

    clearHTML();
    
    // Recorrer los productos del arreglo y generar el HTML
    productosCarrito.forEach( producto => {
        const {imagen, titulo, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="80" >
            </td>
            <td> ${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;

        // Agrego el HTML al tbody
        contenedorCarrito.appendChild(row);
    });
};

// Limpiar el HTML
function clearHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
