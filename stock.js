const stockProductos = [
  {
    id: 1,
    nombre: "PlayStation4",
    modelo: "4",
    cantidad: 1,
    precio: 178000,
    img: "img/play4.jpg",
  },
  {
    id: 2,
    nombre: "PlayStation",
    modelo: "5",
    cantidad: 1,
    precio: 348000,
    img: "img/play5.jpg",
  },
  {
    id: 3,
    nombre: "XBox",
    modelo: "Serie S",
    cantidad: 1,
    precio: 180000,
    img: "img/series-S.jpg",
  },
  {
    id: 4,
    nombre: "XBox",
    modelo: "Serie X",
    cantidad: 1,
    precio: 294000,
    img: "img/series-X.jpg",
  },
  {
    id: 5,
    nombre: "Nintendo",
    modelo: "Switch",
    cantidad: 1,
    precio: 172500,
    img: "img/switch.jpg",
  },
  
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#conteiner");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");

const compra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");


document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  
});




  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });



  compra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Carrito Vacio!",
        text: "Seleccione Algún Producto!",
        footer: "Gracias por Elegirnos"
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Compra Realizada Exitosamente",
        showConfirmButton: false,
        timer: 1500
      })
      
    }
  });



stockProductos.forEach((prod) => {
  const { id, nombre, modelo, precio, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Modelo: ${modelo}</p>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};




const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, modelo, precio, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
        <p>Modelo: ${modelo}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }



  if (carrito.length === 0) {
    console.log("vacio");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">Por favor seleccione sus productos</p>
    `;
  } else {
    console.log("item");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const consolaId = id;
  carrito = carrito.filter((consola) => consola.id !== consolaId);
  mostrarCarrito();
}







const boton = document.getElementById("boton");
const cont = document.querySelector("#fetch");

const datosUsuarios = () => {
  fetch("https://randomuser.me/api")
      .then(res => res.json())
      .then(resp => {
        resp.results.forEach(usuario => {
          contenedor.innerHTML += `
          <div>
          <img src="${usuario.picture.thumbnail}"/>
          <h3>${usuario.name.first} ${usuario.name.last}</h3>
          <p>Tel: ${usuario.phone}</p>
          <span>Email: ${usuario.email}</span>
          </div>
          
          `
        })
      })
}

boton.onclick = () => {
  datosUsuarios();
}
