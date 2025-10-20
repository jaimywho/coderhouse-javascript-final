let productos = JSON.parse(localStorage.getItem("productos")) || [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("carrito-container");
const headerCarrito = document.getElementById("header-carrito");

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    const item = document.createElement("div");
    item.classList.add("carrito-item");
    item.innerHTML = `
    <div class="product-row">
     <div class="product-image">
      <img src="${producto.imagen}" width="100" alt="${producto.nombre}">
    </div>
    <div class="product-info">
      <p><strong>${producto.nombre}</strong></p>
      <p>Precio: $${producto.precio}</p>
    </div>


    <div class="product-action">
      <button class="btn-eliminar" data-index="${index}">Eliminar producto</button>
    </div>
  </div>
  <hr>
`;

    contenedor.appendChild(item);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("carrito-total");
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  contenedor.appendChild(totalDiv);

  // ✅ Botón "Comprar" centrado
  const comprarBtn = document.createElement("button");
  comprarBtn.textContent = "Comprar";
  comprarBtn.classList.add("btn-comprar");
  contenedor.appendChild(comprarBtn);

  // Acción del botón "Comprar"
  comprarBtn.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();

    // ✅ Ocultar título "Tu carrito"
    if (headerCarrito) {
      headerCarrito.style.display = "none";
    }

    contenedor.innerHTML = `
      <div class="mensaje-compra">
        <h2>Gracias por tu compra! </h2>
      </div>
    `;
  });

  const deleteButtons = contenedor.querySelectorAll(".btn-eliminar");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      mostrarCarrito();
    });
  });
}

mostrarCarrito();
