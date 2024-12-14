
const prices = {
    analgesics: {
      acetaminophen: 500,
      aspirin: 300,
      gabapentin: 400,
      lidocaine: 200,
      opioids: 600,
      tramadol: 400,
    },
    antibiotics: {
      amoxicillin: 25,
      azithromycin: 30,
      ciprofloxacin: 41,
      doxycycline: 21,
      metronidazole: 20,
      cephalexin: 28,
    },
    antidepressants: {
      sertraline: 60,
      fluoxetine: 50,
      paroxetine: 65,
      escitalopram: 55,
      venlafaxine: 70,
      duloxetine: 75,
    },
    antihistamines: {
      diphenhydramine: 10,
      loratadine: 15,
      cetirizine: 20,
      fexofenadine: 25,
    },
    antihypertensives: {
      lisinopril: 40,
      amlodipine: 45,
      losartan: 50,
      metoprolol: 55,
      clonidine: 30,
      hydrochlorothiazide: 35,
    },
  };


  
  // The cart array to store items
  let cart = [];
  // The favorites array to store favorite items
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  // Function to find the category of an item
  function findCategory(name) {
    for (const category in prices) {
      if (name in prices[category]) return category;
    }
    return null;
  }
  
  // Function to add items to the cart
  function addCart(name) {
    const qty = parseInt(document.getElementById(name).value);
    const category = findCategory(name);
  
    if (!category) {
      alert("Invalid item.");
      return;
    }
  
    const price = prices[category][name];
  
    if (qty > 0) {
      const existingItem = cart.find((item) => item.name === name);
  
      if (existingItem) {
        existingItem.qty += qty;
        existingItem.total = existingItem.qty * price;
      } else {
        cart.push({ name, qty, price, total: qty * price });
      }
  
      updateCartTable();
      document.getElementById(name).value = ""; // Clear input
    } else {
      alert("Please enter a valid quantity.");
    }
  }
  
  // Function to add items to favorites
  function favouriteBtn(name) {
    if (cart.length > 0) {
        localStorage.setItem("favouriteOrder", JSON.stringify(cart));
        alert("Current cart saved as a favorite order!");
      } else {
        alert("Your cart is empty. Add items to save as a favorite order.");
      }
  }
  
  // Function to apply favorites to the cart
  function applyFavourite() {
    const savedFavorites = JSON.parse(localStorage.getItem("favouriteOrder"));

  if (savedFavorites && savedFavorites.length > 0) {
    savedFavorites.forEach((favItem) => {
      const existingItem = cart.find((item) => item.name === favItem.name);

      if (existingItem) {
        existingItem.qty += favItem.qty;
        existingItem.total = existingItem.qty * existingItem.price;
      } else {
        cart.push(favItem);
      }
    });

    updateCartTable();
    alert("Favorite order applied to your cart!");
  } else {
    alert("No favorite order saved.");
  }
  }
  
  // Function to update the cart table
  function updateCartTable() {
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  
    cart.forEach((item) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.total.toFixed(2)}</td>
        <td><button onclick="removeFromCart('${item.name}')">Delete</button></td>
      `;
    });
  
    updateTotal();
  }
  
  // Function to remove an item from the cart
  function removeFromCart(name) {
    const index = cart.findIndex((item) => item.name === name);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartTable();
    }
  }
  
  // Function to calculate and display the total amount
  function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    document.getElementById("total-price").textContent = `${total.toFixed(2)}`;
  }
  

  function placeOrder() {
    orderItems = cart;
  
    if (orderItems.length > 0) {
      window.location.href = "pharmacy.html";
      sessionStorage.setItem("ordeditems", JSON.stringify(orderItems));
    } else {
      alert("Please add products to the order");
    }
  }
  

  window.addEventListener("load", function () {
    if (window.location.pathname.includes("/pages/pharmacy.html")) {
      let tabel = document.getElementById("tbody2");
  
      const orderItems = JSON.parse(sessionStorage.getItem("ordeditems"));

      tabel.innerHTML = ""; // Clear existing rows
  
      orderItems.forEach((item) => {
      const row = tabel.insertRow();
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.total.toFixed(2)}</td>
      `;
    });
      
    }
  });