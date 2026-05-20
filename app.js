import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAGMiL4zA9yM48RgxKaa30Ge8wPG_FDomk",
    authDomain: "trendspot-store.firebaseapp.com",
    databaseURL: "https://trendspot-store-default-rtdb.firebaseio.com",
    projectId: "trendspot-store",
    storageBucket: "trendspot-store.firebasestorage.app",
    messagingSenderId: "195199081717",
    appId: "1:195199081717:web:3b14a6a93f0cf64d6ab9bc",
    measurementId: "G-RE8DDQ5SWN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Simple product list
const products = [
    { name: "Product 1", price: 499 }, { name: "Product 2", price: 599 },
    { name: "Product 3", price: 399 }, { name: "Product 4", price: 899 },
    // Add your 20 products here...
];

const grid = document.getElementById('product-grid');
products.forEach(p => {
    grid.innerHTML += `<div class="card">
        <h3>${p.name}</h3>
        <p>Price: ₹${p.price}</p>
        <button>Add to Cart</button>
    </div>`;
});

window.placeOrder = () => {
    const orderData = {
        name: document.getElementById('custName').value,
        address: document.getElementById('custAddress').value,
        phone: document.getElementById('custPhone').value,
        pincode: document.getElementById('custPincode').value,
        timestamp: new Date().toISOString()
    };

    if(!orderData.name || !orderData.phone) {
        alert("Please fill in all details!");
        return;
    }

    push(ref(db, 'orders/'), orderData)
        .then(() => alert("Order placed successfully!"))
        .catch(err => alert("Error: " + err.message));
};
