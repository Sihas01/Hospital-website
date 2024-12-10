//service worker 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Hospital-website/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}



// Get the button
let topBtn = document.getElementById("top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
  document.getElementById("mySidenav").style.padding = "10px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0"
  document.getElementById("mySidenav").style.padding = "0";

}


//drop-dwon in nav
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

//store prices in object
const prices = {

  analgesics: {
    acetaminophen: 500,
    aspirin: 300,
    gabapentin: 400,
    lidocaine: 200,
    opioids: 600,
    tramadol: 400
  },
  antibiotics: {
    panadol: 21,
  },
};

//variables to store prices 
let currentPrice = 0;
let total = 0;

//function to update total 
function updateTotal() {
  let totalPrice = document.getElementById('total-price');
  if (totalPrice) {
    totalPrice.innerText = total;
  }

}

//update total real time
setInterval(updateTotal, 500);

//add to cart function
function addCart(name) {
  let qty = document.getElementById(name).value;
  let tabel = document.getElementById('tbody');


  //validate user input
  if (qty > 0) {
    var existingRow = null;
    for (var i = 0; i < tabel.rows.length; i++) {
      if (tabel.rows[i].cells[0].textContent === name) {
        existingRow = tabel.rows[i];
        break;
      }
    }


    //check item already exisit or not
    if (existingRow) {
      existingRow.cells[1].textContent = parseInt(existingRow.cells[1].textContent) + parseInt(qty);

      for (let product in prices) {
        if (prices[product][name] !== undefined) {
          existingRow.cells[2].textContent = parseInt(existingRow.cells[2].textContent) + (prices[product][name]) * qty;
          total += (prices[product][name]) * qty;
        }
      }

    } else {

      //new item add to table
      var row = tabel.insertRow(tabel.rows.length);
      row.classList.add('product-row');

      var cell1 = row.insertCell(0);
      cell1.classList.add('product-name')
      var cell2 = row.insertCell(1);
      cell2.classList.add('quantity')
      var cell3 = row.insertCell(2)
      cell3.classList.add('price');
      var cell4 = row.insertCell(3);

      let productPrice;
      for (let product in prices) {
        if (prices[product][name] !== undefined) {
          productPrice = prices[product][name]
          // break;
        }
      }

      currentPrice = productPrice * qty;
      total += currentPrice;
      //assign values to cells
      cell1.textContent = name;
      cell2.textContent = qty;
      cell3.textContent = currentPrice;
      cell4.innerHTML = "<button class='deleteBtn' onclick='deleteRow(this);'>Delete</button>"


    }

    //set input box value to default
    document.getElementById(name).value = "";




  } else {


    alert("add a prodcut")

    // Set a timeout to hide it after 100 milliseconds
    setTimeout(() => {
      model.style.display = 'none';
    }, 1000); // Hide after 100ms
  }
}


//delete function
function deleteRow(button) {

  // finds the nearest parent <tr> of the button
  const row = button.closest("tr");
  let deleteProductPrice = row.cells[2].textContent;
  total -= parseInt(deleteProductPrice);
  row.remove();

}

function checkAddedItems() {

  const orderItems = [];
  const orderItemsContainer = document.getElementById('tbody');

  // Loop through all product rows in the form
  const productRows = orderItemsContainer.querySelectorAll('.product-row');

  productRows.forEach(cell => {
    const productName = cell.querySelector('.product-name').textContent;
    const quantity = cell.querySelector('.quantity').textContent;
    const price = cell.querySelector('.price').textContent;

    if (productName && quantity) {
      orderItems.push({ name: productName, quantity: quantity, price: price });
    }
  });

  return orderItems;
}



function favouriteBtn() {



  orderItems = checkAddedItems();

  if (orderItems.length > 0) {
    localStorage.removeItem('favouriteOrder');
    localStorage.setItem('favouriteOrder', JSON.stringify(orderItems));
    alert('Order saved to favourites!');
  } else {
    alert('Please add products to the order.');
  }

}

function applyFavourite() {


  const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));


  if (favouriteOrder == null) {
    alert("There's no favourite Order !!");
  } else {
    document.getElementById('tbody').innerHTML = '';
    let tabel = document.getElementById('tbody');

    let price;

    favouriteOrder.forEach(item => {
      price = parseInt(item.price);
      //new item add to table
      //get last row index
      var row = tabel.insertRow(tabel.rows.length);
      row.classList.add('product-row');

      var cell1 = row.insertCell(0);
      cell1.classList.add('product-name')
      var cell2 = row.insertCell(1);
      cell2.classList.add('quantity')
      var cell3 = row.insertCell(2);
      cell2.classList.add('price')
      var cell4 = row.insertCell(3);


      //assign values to cells
      cell1.textContent = item.name,
        cell2.textContent = item.quantity;
      cell3.textContent = item.price;
      cell4.innerHTML = "<button class='deleteBtn' onclick='deleteRow(this);'>Delete</button>"
    })

    total += price;

    let applyBtn = document.getElementById("applyBtn");
    applyBtn.disabled = true;
  }
}

function placeOrder() {
  orderItems = checkAddedItems();

  if (orderItems.length > 0) {
    window.location.href = "./pages/pharmacy.html";
    sessionStorage.setItem("ordeditems", JSON.stringify(orderItems));

  } else {
    alert("Please add products to the order");
  }
}

window.addEventListener('load', function () {
  if (window.location.pathname === "./pages/pharmacy.html") {

    let tabel = document.getElementById('tbody2');

    const orderItems = JSON.parse(sessionStorage.getItem('ordeditems'));

    orderItems.forEach(item => {
      //new item add to table
      var row = tabel.insertRow(tabel.rows.length);
      row.classList.add('product-row');

      var cell1 = row.insertCell(0);
      cell1.classList.add('product-name')
      var cell2 = row.insertCell(1);
      cell2.classList.add('quantity')
      var cell3 = row.insertCell(2)
      cell3.classList.add('price');

      let productPrice;
      for (let product in prices) {
        if (prices[product][item.name] !== undefined) {
          productPrice = prices[product][item.name]
          // break;
        }
      }

      currentPrice = productPrice * item.quantity;
      

      //assign values to cells
      cell1.textContent = item.name;
      cell2.textContent = item.quantity;
      cell3.textContent = currentPrice;
    });
  }

})


window.addEventListener('load', function () {
  if (window.location.pathname === "./pages/thankyou.html") {

  // Get the current date
  const currentDate = new Date();

  // Add 7 days
  currentDate.setDate(currentDate.getDate() + 7);

  // Format the date in a readable format (e.g., YYYY-MM-DD)
  const futureDate = currentDate.toISOString().split('T')[0]; // This gives the date in "YYYY-MM-DD"

  // Display the new date
  document.getElementById('dateResult').innerHTML = `${futureDate}`;
}})