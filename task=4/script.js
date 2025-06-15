
const products = [
  { name: "Laptop", category: "electronics", price: 1200, rating: 4.5 },
  { name: "Smartphone", category: "electronics", price: 900, rating: 4.3 },
  { name: "Headphones", category: "electronics", price: 150, rating: 4.1 },
  { name: "Bluetooth Speaker", category: "electronics", price: 200, rating: 4.2 },
  { name: "Jeans", category: "clothing", price: 80, rating: 4.0 },
  { name: "T-shirt", category: "clothing", price: 30, rating: 3.9 },
  { name: "Jacket", category: "clothing", price: 150, rating: 4.4 },
  { name: "Sneakers", category: "clothing", price: 120, rating: 4.6 }
];

function getStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? "★" : "";
  return "★".repeat(fullStars) + halfStar + "☆".repeat(5 - fullStars - (halfStar ? 1 : 0));
}

function displayProducts(items) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  items.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Category: ${p.category}</p>
          <p class="card-text">Price: $${p.price}</p>
          <p class="card-text">Rating: ${getStars(p.rating)} (${p.rating})</p>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

function filterProducts() {
  const category = document.getElementById("filter").value;
  const maxPrice = parseFloat(document.getElementById("priceFilter").value) || Infinity;
  const sortOption = document.getElementById("sort").value;

  let filtered = products.filter(p => 
    (category === "all" || p.category === category) && p.price <= maxPrice
  );

  if (sortOption === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-desc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = taskText;

  li.onclick = () => {
    li.remove();
  };

  taskList.appendChild(li);
  taskInput.value = "";
}

displayProducts(products);
