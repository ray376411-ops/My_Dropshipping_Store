import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

const db = getDatabase(initializeApp(firebaseConfig));

// 20 Products Database
const products = [
    { name: "Smartphone", cat: "Electronics", price: 15000, img: "https://via.placeholder.com/200" },
    { name: "Headphones", cat: "Electronics", price: 2000, img: "https://via.placeholder.com/200" },
    { name: "Cotton Shirt", cat: "Apparel", price: 800, img: "https://via.placeholder.com/200" },
    // Add remaining 17 products here following the same structure
];

const grid = document.getElementById('product-grid');

function displayProducts(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
    filtered.forEach(p => {
        grid.innerHTML += `<div class="card">
            <img src="${p.img}" class="product-img">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="openModal('${p.name}')">Buy Now</button>
        </div>`;
    });
}

window.filterProducts = displayProducts;
window.openModal = (name) => {
    document.getElementById('orderModal').style.display = 'block';
    window.selectedProduct = name;
};
window.closeModal = () => document.getElementById('orderModal').style.display = 'none';

window.submitOrder = () => {
    const orderData = {
        product: window.selectedProduct,
        name: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        address: document.getElementById('custAddress').value,
        pincode: document.getElementById('custPincode').value
    };
    push(ref(db, 'orders/'), orderData).then(() => {
        alert("Order Successful!");
        window.closeModal();
    });
};

displayProducts();
