fetch("productos.json")
  .then((response) => {
    if (!response.ok) throw new Error("Error loading productos.json");
    return response.json();
  })
  .then((productos) => {
    mostrarProductos(productos);
  })
  .catch((error) => console.error(error));

function mostrarProductos(productos) {
  const container = document.getElementById("cards-container");

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    let sizeButtons = "";
    producto.tallas.forEach((item) => {
      sizeButtons += `
        <button 
          class="size-btn ${item.disponible ? "" : "disabled"}" 
          data-size="${item.talla}" 
          ${item.disponible ? "" : "disabled"}
        >
          ${item.talla}
        </button>
      `;
    });

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <h3>$${producto.precio}</h3>
      <div class="size-container">${sizeButtons}</div>
      <button class="buy-btn disabled" id="buy-${producto.id}">Comprar</button>
      <p class="message"></p>
    `;

    container.appendChild(card);

    const sizeBtns = card.querySelectorAll(".size-btn");
    const buyBtn = card.querySelector(".buy-btn");
    const message = card.querySelector(".message");

    sizeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) return;

        sizeBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        buyBtn.classList.remove("disabled");

        card.dataset.selectedSize = btn.dataset.size;

        if (message) {
          message.textContent = "";
        }
      });
    });

    buyBtn.addEventListener("click", () => {
      const selectedSize = card.dataset.selectedSize;

      message.classList.remove("error", "success");

      if (!selectedSize) {
        message.textContent =
          "Por favor selecciona una talla antes de añadir al carrito.";
        message.classList.add("error");
        return;
      }

      message.textContent = "Producto añadido al carrito";
      message.classList.add("success");

      const productoParaCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        talla: selectedSize,
      };

      agregarAlCarrito(productoParaCarrito);
    });
  });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  guardarCarrito();
}
