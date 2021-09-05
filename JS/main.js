function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      // console.log(querySnapshot);
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          rating: doc.data().rating,
          price: doc.data().price,
        });
      });
      console.log(items);
      generateItems(items);
    });
}
function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "mr-6", "mb-6");
    doc.innerHTML = `
    <div class="product-image w-48 h-52 bg-white rounded-xl p-6">
      <img class="w-full h-full object-contain" src="${item.image}" alt="">
    </div>
    <div class="product-name text-gray-700 font-bold mt-2 text-sm">
      ${item.name}
    </div>
    <div class="product-make text-green-700 font-bold">
    ${item.make}
    </div>
    <div class="product-rating text-yellow-500 my-1">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      ${item.rating}
    </div>
    <div class="product-price font-bold text-gray-700 text-lg">
      ${numeral(item.price).format("$0,0.00")}
    </div>
    `;
    let addToCartEl = document.createElement("button");
    addToCartEl.classList.add("add-to-cart", "h-8", "w-28", "text-white", "bg-yellow-500", "rounded", "hover:bg-yellow-600");
    addToCartEl.innerHTML = "Add to cart";
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });
}
function addToCart(item) {
  // console.log("Add to cart Clicked");
  // console.log(item);
  let cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        make: item.make,
        name: item.name,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
    }
  });
}
getItems();
