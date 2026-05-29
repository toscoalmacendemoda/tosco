// MOCK DATABASE ALIGNED WITH TOSCO
const PRODUCTS = [
    {
        id: 1,
        name: "Zapatillas Puro Art",
        brand: "Puro",
        category: "calzado",
        subcategory: "zapatillas",
        price: 135000,
        image: "assets/puro_sneakers.png",
        labels: ["3 cuotas sin interés", "Envío gratis"],
        sizes: [36, 37, 38, 39, 40]
    },
    {
        id: 2,
        name: "Cartera Agosti Mandala",
        brand: "Antonia Agosti",
        category: "bolsos-y-mochilas",
        subcategory: "carteras",
        price: 168900,
        image: "assets/agosti_bag.png",
        labels: ["Cuotas sin interés"],
        sizes: ["Único"]
    },
    {
        id: 3,
        name: "Borcegos Winndia Vintage",
        brand: "Winndia",
        category: "calzado",
        subcategory: "botas",
        price: 182000,
        image: "assets/winndia_boots.png",
        labels: ["Envío gratis", "New In!"],
        sizes: [36, 37, 38, 39]
    },
    {
        id: 4,
        name: "Bandolera Winndia Compact",
        brand: "Winndia",
        category: "bolsos-y-mochilas",
        subcategory: "bandoleras",
        price: 98000,
        image: "assets/agosti_bag.png",
        labels: ["3 cuotas sin interés"],
        sizes: ["Único"]
    },
    {
        id: 5,
        name: "Mochila Chimola Sport",
        brand: "Chimola",
        category: "bolsos-y-mochilas",
        subcategory: "mochilas",
        price: 115000,
        image: "assets/agosti_bag.png",
        labels: ["Promo"],
        sizes: ["Único"]
    },
    {
        id: 6,
        name: "Alpargatas Chimmy Churry",
        brand: "Chimmy Churry",
        category: "calzado",
        subcategory: "sandalias",
        price: 64000,
        image: "assets/puro_sneakers.png",
        labels: ["3 cuotas sin interés"],
        sizes: [36, 37, 38, 39, 40]
    },
    {
        id: 7,
        name: "Mate Terra de Madera",
        brand: "Terra",
        category: "terra",
        subcategory: "mates",
        price: 25000,
        image: "assets/hero_tosco.png",
        labels: ["Colección Terra"],
        sizes: ["Único"]
    },
    {
        id: 8,
        name: "Billetera Antonia Agosti",
        brand: "Antonia Agosti",
        category: "accesorios",
        subcategory: "billeteras",
        price: 49000,
        image: "assets/agosti_bag.png",
        labels: ["New!"],
        sizes: ["Único"]
    }
];

// STATE MANAGEMENT
let cart = JSON.parse(localStorage.getItem('tosco_cart')) || [];
let activeCategory = 'all';
let activeSubcategory = '';
let activeBrand = '';
let activeSearchQuery = '';

// DOM ELEMENTS
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartCounter = document.getElementById('cart-counter');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalEl = document.getElementById('cart-total');
const shippingStatusEl = document.getElementById('shipping-status');
const shippingProgressEl = document.getElementById('shipping-progress');
const shippingHintEl = document.getElementById('shipping-hint');
const searchToggle = document.getElementById('search-toggle');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

// EVENT LISTENERS
function setupEventListeners() {
    // Drawer handlers
    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    drawerOverlay.addEventListener('click', closeCart);

    // Search Toggle
    searchToggle.addEventListener('click', () => {
        searchBox.style.display = searchBox.style.display === 'none' ? 'block' : 'none';
        if (searchBox.style.display === 'block') {
            searchInput.focus();
        }
    });

    // Search Logic
    searchBtn.addEventListener('click', executeSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
    });

    // Sticky Scroll Header Look
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// RENDER CATALOG
function renderProducts() {
    productsGrid.innerHTML = '';
    
    // Filtering logic cascade
    let filtered = PRODUCTS;
    
    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (activeSubcategory) {
        filtered = filtered.filter(p => p.subcategory === activeSubcategory);
    }

    if (activeBrand) {
        filtered = filtered.filter(p => p.brand === activeBrand);
    }
    
    if (activeSearchQuery) {
        const query = activeSearchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.brand.toLowerCase().includes(query) ||
            p.subcategory.toLowerCase().includes(query)
        );
    }

    if (filtered.length === 0) {
        productsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gray-dark); font-family: var(--heading-font); font-style: italic;">No se encontraron productos en esta sección.</div>`;
        return;
    }

    filtered.forEach(p => {
        const labelsHtml = p.labels.map(l => `<span class="label-pill ${l.toLowerCase().includes('envío') || l.toLowerCase().includes('gratis') ? 'free-shipping' : 'offer'}">${l}</span>`).join('');
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <div class="product-labels">${labelsHtml}</div>
                <img src="${p.image}" alt="${p.name}" class="product-img">
            </div>
            <div class="product-info">
                <div class="product-category">${p.brand} | ${p.subcategory}</div>
                <h3 class="product-name">${p.name}</h3>
                <div class="product-price">$${p.price.toLocaleString('es-AR')}</div>
                <button class="product-action-btn" onclick="addToCart(${p.id})">Agregar al Carrito</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// DYNAMIC FILTER TRIGGERS
window.setCatalogFilter = function(category) {
    activeCategory = category;
    activeSubcategory = '';
    activeBrand = '';
    activeSearchQuery = '';
    
    // Update active filter UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (category === 'all' && btn.innerText.toLowerCase().includes('todos')) btn.classList.add('active');
        if (category === 'calzado' && btn.innerText.toLowerCase().includes('calzado')) btn.classList.add('active');
        if (category === 'bolsos-y-mochilas' && btn.innerText.toLowerCase().includes('bolsos')) btn.classList.add('active');
        if (category === 'accesorios' && btn.innerText.toLowerCase().includes('accesorios')) btn.classList.add('active');
        if (category === 'indumentaria' && btn.innerText.toLowerCase().includes('indumentaria')) btn.classList.add('active');
        if (category === 'terra' && btn.innerText.toLowerCase().includes('terra')) btn.classList.add('active');
    });

    renderProducts();
    scrollToCatalog();
};

window.setCatalogSubcategory = function(subcat) {
    activeSubcategory = subcat;
    activeCategory = 'all';
    activeBrand = '';
    activeSearchQuery = '';
    renderProducts();
    scrollToCatalog();
};

window.setCatalogBrand = function(brand) {
    activeBrand = brand;
    activeCategory = 'all';
    activeSubcategory = '';
    activeSearchQuery = '';
    renderProducts();
    scrollToCatalog();
};

function executeSearch() {
    activeSearchQuery = searchInput.value;
    renderProducts();
    scrollToCatalog();
}

function scrollToCatalog() {
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
    }
}

// CART HANDLERS
window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    openCart();
};

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.innerText = totalItems;

    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-bag-shopping" style="font-size: 40px; color: var(--gray-dark); margin-bottom: 15px; display: block;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotalEl.innerText = "$0";
        updateShippingProgress(0);
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString('es-AR')}</div>
                <div class="cart-item-quantity-control">
                    <button class="qty-btn" onclick="adjustQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="adjustQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeCartItem(${item.id})">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalEl.innerText = `$${subtotal.toLocaleString('es-AR')}`;
    updateShippingProgress(subtotal);
}

window.adjustQuantity = function(productId, amount) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        removeCartItem(productId);
    } else {
        saveCart();
        updateCartUI();
    }
};

window.removeCartItem = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
};

function saveCart() {
    localStorage.setItem('tosco_cart', JSON.stringify(cart));
}

// DRAWER ACTIONS
function openCart() {
    cartDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
}

// SHIPPING CALCULATION
const SHIPPING_LIMIT = 250000;

function updateShippingProgress(subtotal) {
    if (subtotal === 0) {
        shippingStatusEl.innerText = "";
        shippingProgressEl.style.width = "0%";
        shippingHintEl.innerText = "Envío gratis superando los $250.000";
        return;
    }

    if (subtotal >= SHIPPING_LIMIT) {
        shippingStatusEl.innerText = "¡Tenés Envío Gratis!";
        shippingStatusEl.style.color = "#50664c";
        shippingProgressEl.style.width = "100%";
        shippingHintEl.innerText = "¡Felicitaciones! Has calificado para envío gratuito.";
    } else {
        const remaining = SHIPPING_LIMIT - subtotal;
        const percent = Math.min((subtotal / SHIPPING_LIMIT) * 100, 100);
        shippingStatusEl.innerText = `$${remaining.toLocaleString('es-AR')} restan`;
        shippingStatusEl.style.color = "var(--main-foreground)";
        shippingProgressEl.style.width = `${percent}%`;
        shippingHintEl.innerText = `¡Estás a $${remaining.toLocaleString('es-AR')} de conseguir envío gratis!`;
    }
}

window.checkoutAlert = function() {
    alert("¡Simulación de compra completada! Gracias por usar nuestro clon de Tosco Almacén de Moda.");
};
