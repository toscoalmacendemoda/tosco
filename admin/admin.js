// INITIAL SEED DATABASE (FOR DATABASE RESET ACTION)
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Zapatillas Puro Art",
        brand: "Puro",
        category: "calzado",
        subcategory: "zapatillas",
        price: 135000,
        originalPrice: 168750,
        image: "../assets/puro_sneakers.png",
        labels: ["3 cuotas sin interés", "Envío gratis", "20% OFF"],
        sizes: [36, 37, 38, 39, 40],
        stock: 12
    },
    {
        id: 2,
        name: "Cartera Agosti Mandala",
        brand: "Antonia Agosti",
        category: "bolsos-y-mochilas",
        subcategory: "carteras",
        price: 168900,
        image: "../assets/agosti_bag.png",
        labels: ["Cuotas sin interés", "New In!"],
        sizes: ["Único"],
        stock: 5
    },
    {
        id: 3,
        name: "Borcegos Winndia Vintage",
        brand: "Winndia",
        category: "calzado",
        subcategory: "botas",
        price: 145600,
        originalPrice: 182000,
        image: "../assets/winndia_boots.png",
        labels: ["Envío gratis", "20% OFF"],
        sizes: [36, 37, 38, 39],
        stock: 8
    },
    {
        id: 182601807,
        name: "Zapatillas Ochenta y Seis - Puro",
        brand: "Puro",
        category: "calzado",
        subcategory: "zapatillas",
        price: 105900,
        originalPrice: null,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/11-bb2a2b9b9e3c0143cf16700173306641-640-01-6d8e37f72f9d68374316941804911202-1024-1024.webp",
        labels: ["3 cuotas sin interés", "Envío gratis"],
        sizes: [36, 37, 38, 39, 40],
        stock: 15
    },
    {
        id: 251443813,
        name: "Zapatillas Puro Yogui Sincronia - Puro",
        brand: "Puro",
        category: "calzado",
        subcategory: "zapatillas",
        price: 139000,
        originalPrice: null,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/458194e0-4d0d-42c1-ac00-dbb9c9c738dc-169bf15d0af1b298e817374713176465-1024-1024.webp",
        labels: ["3 cuotas sin interés", "Envío gratis"],
        sizes: [36, 37, 38, 39, 40],
        stock: 6
    },
    {
        id: 218644172,
        name: "Zapatilla Retro Flow Indonesia - Puro",
        brand: "Puro",
        category: "calzado",
        subcategory: "zapatillas",
        price: 189000,
        originalPrice: null,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/462538177_1008224831062341_6245104394471684021_n-195da95026544d346217301480909692-1024-1024.webp",
        labels: ["3 cuotas sin interés", "Envío gratis"],
        sizes: [36, 37, 38, 39, 40],
        stock: 10
    },
    {
        id: 182611440,
        name: "Botas Chavo del Diecisiete - Puro",
        brand: "Puro",
        category: "calzado",
        subcategory: "botas",
        price: 39997,
        originalPrice: 119990,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/31-534d33010b1888d6c116700173309147-640-01-a9f3393ebd1b1c8b5816941804912526-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: [36, 37, 38, 39, 40],
        stock: 0
    },
    {
        id: 260949996,
        name: "Llavero Clap Ambar - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "llaveros",
        price: 3000,
        originalPrice: 9000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_12-16-04-16474fb81ef0e854fa16938405908500-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 25
    },
    {
        id: 260949699,
        name: "Llavero Clap Tulsi - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "llaveros",
        price: 3000,
        originalPrice: 9000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_12-14-36-5d6c8b939fa5a9390c16938405105260-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 14
    },
    {
        id: 260949183,
        name: "Llavero Clap Matcha - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "llaveros",
        price: 3000,
        originalPrice: 9000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_12-11-20-8025ff7480cd01235b16938403328325-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 18
    },
    {
        id: 260947504,
        name: "Llavero Clap Sandalo - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "llaveros",
        price: 3000,
        originalPrice: 9000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_12-08-41-ec6c6508fa5c56c2d416938401314959-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 22
    },
    {
        id: 260944090,
        name: "Cartuchera Bella Botánica - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "cartucheras",
        price: 6333,
        originalPrice: 19000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_12-03-36-ac02302e1c9fe807e116938398468758-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 30
    },
    {
        id: 260943387,
        name: "Cartuchera Bella Liverpool - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "cartucheras",
        price: 6333,
        originalPrice: 19000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_12-00-50-6d405204ef0528271716938397131427-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 20
    },
    {
        id: 260942209,
        name: "Cartuchera Bella Koi - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "cartucheras",
        price: 6333,
        originalPrice: 19000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_11-58-17-5ab162624cf5d3a5ea16938395232262-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 15
    },
    {
        id: 260891298,
        name: "Billetera Pachi Frida - Puro",
        brand: "Puro",
        category: "accesorios",
        subcategory: "billeteras",
        price: 11667,
        originalPrice: 35000,
        image: "https://dcdn-us.mitiendanube.com/stores/001/552/027/products/captura_de_pantalla_2023-09-04_a_la_s_11-47-59-994df511bc64e488d516938389657065-1024-1024.webp",
        labels: ["3 cuotas sin interés", "67% OFF"],
        sizes: ["Único"],
        stock: 9
    }
];

// STATE MANAGEMENT
let db = null;
let ALL_PRODUCTS = [];

// DOM ELEMENTS - LOGIN
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// DOM ELEMENTS - ADMIN MAIN VIEW
const adminMainView = document.getElementById('admin-main-view');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const adminProductsTbody = document.getElementById('admin-products-tbody');
const adminSearchInput = document.getElementById('admin-search-input');
const adminAddProductBtn = document.getElementById('admin-add-product-btn');
const adminExportBtn = document.getElementById('admin-export-btn');
const adminImportTrigger = document.getElementById('admin-import-trigger');
const adminImportFile = document.getElementById('admin-import-file');
const adminResetBtn = document.getElementById('admin-reset-btn');

// Admin modal form
const productModalContainer = document.getElementById('product-modal-container');
const modalTitle = document.getElementById('modal-title');
const modalCloseBtn = document.getElementById('modal-close-btn');
const productForm = document.getElementById('product-form');
const formProductId = document.getElementById('form-product-id');
const formName = document.getElementById('form-name');
const formBrand = document.getElementById('form-brand');
const formCategory = document.getElementById('form-category');
const formSubcategory = document.getElementById('form-subcategory');
const formPrice = document.getElementById('form-price');
const formOriginalPrice = document.getElementById('form-original-price');
const formStock = document.getElementById('form-stock');
const formImage = document.getElementById('form-image');
const formSizes = document.getElementById('form-sizes');
const formLabels = document.getElementById('form-labels');
const formCancelBtn = document.getElementById('form-cancel-btn');

// Admin stats
const statTotalEl = document.getElementById('admin-stat-total');
const statOutOfStockEl = document.getElementById('admin-stat-out-of-stock');
const statSalesEl = document.getElementById('admin-stat-sales');
const statShippingEl = document.getElementById('admin-stat-shipping');

// INDEXEDDB CONTROLLER
function dbInit() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ToscoStoreDB', 1);

        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            if (!database.objectStoreNames.contains('products')) {
                database.createObjectStore('products', { keyPath: 'id' });
            }
        };

        request.onsuccess = (e) => {
            db = e.target.result;
            resolve();
        };

        request.onerror = (e) => {
            reject(e.target.error);
        };
    });
}

function dbGetAllProducts() {
    return new Promise((resolve) => {
        const transaction = db.transaction('products', 'readonly');
        const store = transaction.objectStore('products');
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}

function dbPutProduct(product) {
    return new Promise((resolve) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        const request = store.put(product);

        request.onsuccess = () => {
            resolve();
        };
    });
}

function dbDeleteProduct(id) {
    return new Promise((resolve) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve();
        };
    });
}

function dbClearAll() {
    return new Promise((resolve) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        const request = store.clear();

        request.onsuccess = () => {
            resolve();
        };
    });
}

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication first
    const isLogged = sessionStorage.getItem('tosco_admin_logged') === 'true';
    
    if (isLogged) {
        showAdminView();
    } else {
        showLoginView();
    }
});

// VIEW SWITCHERS
function showLoginView() {
    document.body.className = 'login-body';
    loginContainer.style.display = 'block';
    adminMainView.style.display = 'none';
}

async function showAdminView() {
    document.body.className = '';
    loginContainer.style.display = 'none';
    adminMainView.style.display = 'block';
    
    try {
        await dbInit();
        await refreshLocalState();
        setupAdminEventListeners();
    } catch (err) {
        console.error("Database connection failed", err);
    }
}

async function refreshLocalState() {
    ALL_PRODUCTS = await dbGetAllProducts();
    renderAdminTable();
}

// LOGIN SUBMIT EVENT
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userVal = usernameInput.value.trim();
    const passVal = passwordInput.value;
    
    if (userVal === 'tosco' && passVal === 'admin123') {
        sessionStorage.setItem('tosco_admin_logged', 'true');
        errorMessage.style.display = 'none';
        showAdminView();
    } else {
        errorMessage.style.display = 'block';
    }
});

// LOGOUT ACTION
adminLogoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('tosco_admin_logged');
    showLoginView();
});

// ADMIN PANEL LOGIC ACTIONS
function setupAdminEventListeners() {
    adminSearchInput.addEventListener('input', renderAdminTable);
    
    adminAddProductBtn.addEventListener('click', () => {
        openProductModal(null);
    });

    adminExportBtn.addEventListener('click', exportCatalog);
    
    adminImportTrigger.addEventListener('click', () => {
        adminImportFile.click();
    });
    
    adminImportFile.addEventListener('change', importCatalog);
    
    adminResetBtn.addEventListener('click', resetDatabaseToFactory);

    modalCloseBtn.addEventListener('click', closeProductModal);
    formCancelBtn.addEventListener('click', closeProductModal);
    productForm.addEventListener('submit', saveProductForm);
}

function updateAdminStats() {
    statTotalEl.innerText = ALL_PRODUCTS.length;
    
    const outOfStockCount = ALL_PRODUCTS.filter(p => p.stock === 0).length;
    statOutOfStockEl.innerText = outOfStockCount;
    
    const salesTotal = parseFloat(localStorage.getItem('tosco_monthly_sales')) || 389200;
    statSalesEl.innerText = `$${salesTotal.toLocaleString('es-AR')}`;
    
    const freeShippingCount = ALL_PRODUCTS.filter(p => p.labels.some(l => l.toLowerCase().includes('gratis') || l.toLowerCase().includes('envío'))).length;
    statShippingEl.innerText = freeShippingCount;
}

function renderAdminTable() {
    adminProductsTbody.innerHTML = '';
    updateAdminStats();
    
    const searchVal = adminSearchInput.value.toLowerCase().trim();
    
    const filtered = ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchVal) || 
        p.brand.toLowerCase().includes(searchVal) ||
        p.category.toLowerCase().includes(searchVal) ||
        p.subcategory.toLowerCase().includes(searchVal)
    );

    if (filtered.length === 0) {
        adminProductsTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--gray-dark); font-style: italic;">No se encontraron productos.</td></tr>`;
        return;
    }

    filtered.forEach(p => {
        const labelsHtml = p.labels.map(l => `<span class="label-pill ${l.toLowerCase().includes('envío') || l.toLowerCase().includes('gratis') ? 'free-shipping' : 'offer'}" style="margin-right: 4px; display: inline-block;">${l}</span>`).join('');
        
        const stockDisplay = p.stock === 0 
            ? `<span style="color: #c0392b; font-weight: 700; background-color: #fce8e6; padding: 4px 8px; border-radius: 4px;">Sin Stock</span>` 
            : `<span style="font-weight: 600; color: #2c3e50;">${p.stock} u.</span>`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" alt="${p.name}" class="admin-thumb" onerror="this.src='../assets/hero_tosco.png'"></td>
            <td style="font-weight: bold;">${p.name}</td>
            <td>${p.brand} (${p.category} / ${p.subcategory})</td>
            <td>
                ${p.originalPrice ? `<span style="text-decoration: line-through; color: var(--gray-dark); margin-right: 8px;">$${p.originalPrice.toLocaleString('es-AR')}</span>` : ''}
                <span style="font-weight: bold;">$${p.price.toLocaleString('es-AR')}</span>
            </td>
            <td>${stockDisplay}</td>
            <td>${labelsHtml}</td>
            <td>
                <div class="admin-actions-cell">
                    <button class="btn-table-action" onclick="openProductModal(${p.id})"><i class="fa-regular fa-edit"></i> Editar</button>
                    <button class="btn-table-action delete" onclick="deleteProduct(${p.id})"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </td>
        `;
        adminProductsTbody.appendChild(tr);
    });
}

// Modal handling
window.openProductModal = function(productId) {
    productModalContainer.style.display = 'flex';
    
    if (productId) {
        // Edit Mode
        const p = ALL_PRODUCTS.find(item => item.id === productId);
        if (!p) return;
        
        modalTitle.innerText = "Editar Producto";
        formProductId.value = p.id;
        formName.value = p.name;
        formBrand.value = p.brand;
        formCategory.value = p.category;
        formSubcategory.value = p.subcategory;
        formPrice.value = p.price;
        formOriginalPrice.value = p.originalPrice || '';
        formStock.value = p.stock !== undefined ? p.stock : 10;
        formImage.value = p.image;
        formSizes.value = p.sizes ? p.sizes.join(', ') : 'Único';
        formLabels.value = p.labels ? p.labels.join(', ') : '';
    } else {
        // Add Mode
        modalTitle.innerText = "Agregar Nuevo Producto";
        productForm.reset();
        formProductId.value = '';
    }
};

function closeProductModal() {
    productModalContainer.style.display = 'none';
}

async function saveProductForm(e) {
    e.preventDefault();
    
    const pid = formProductId.value;
    const isEdit = pid !== '';
    
    // Parse sizes
    let sizesArr = formSizes.value.split(',').map(s => s.trim()).filter(s => s !== '');
    if (sizesArr.length === 0) sizesArr = ["Único"];
    else {
        sizesArr = sizesArr.map(s => {
            const parsed = parseInt(s);
            return isNaN(parsed) ? s : parsed;
        });
    }

    // Parse labels
    const labelsArr = formLabels.value.split(',').map(l => l.trim()).filter(l => l !== '');
    
    const priceVal = parseInt(formPrice.value);
    const origPriceVal = formOriginalPrice.value ? parseInt(formOriginalPrice.value) : null;
    const stockVal = parseInt(formStock.value);
    
    // Auto labels helper
    if (priceVal > 250000 && !labelsArr.some(l => l.toLowerCase().includes('envío') || l.toLowerCase().includes('gratis'))) {
        labelsArr.push("Envío gratis");
    }
    
    const productData = {
        id: isEdit ? parseInt(pid) : Date.now(),
        name: formName.value.trim(),
        brand: formBrand.value,
        category: formCategory.value,
        subcategory: formSubcategory.value.trim().toLowerCase(),
        price: priceVal,
        originalPrice: origPriceVal,
        stock: stockVal,
        image: formImage.value.trim(),
        labels: labelsArr,
        sizes: sizesArr
    };

    try {
        await dbPutProduct(productData);
        await refreshLocalState();
        renderAdminTable();
        closeProductModal();
    } catch (err) {
        console.error("Error saving product: ", err);
        alert("Ocurrió un error al guardar el producto.");
    }
}

window.deleteProduct = async function(productId) {
    if (!confirm("¿Está seguro que desea eliminar este producto?")) return;
    
    try {
        await dbDeleteProduct(productId);
        await refreshLocalState();
        renderAdminTable();
    } catch (err) {
        console.error("Error deleting product: ", err);
        alert("Ocurrió un error al borrar el producto.");
    }
};

// Reset database
async function resetDatabaseToFactory() {
    if (!confirm("¿Desea restablecer toda la base de datos a los valores de fábrica originales? Se perderán las cargas nuevas.")) return;
    
    try {
        await dbClearAll();
        // Load initial seed
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        INITIAL_PRODUCTS.forEach(p => {
            if (p.stock === undefined) p.stock = 10;
            store.put(p);
        });
        
        // Wait transaction complete
        await new Promise((resolve) => {
            transaction.oncomplete = () => resolve();
        });
        
        await refreshLocalState();
        renderAdminTable();
        alert("¡Base de datos restablecida con éxito!");
    } catch (err) {
        console.error("Error resetting DB: ", err);
        alert("Ocurrió un error al resetear.");
    }
}

// Export Catalog JSON
function exportCatalog() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ALL_PRODUCTS, null, 4));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "tosco_catalog.json");
    dlAnchorElem.click();
}

// Import Catalog JSON
function importCatalog(e) {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = async (event) => {
        try {
            const importedArr = JSON.parse(event.target.result);
            if (!Array.isArray(importedArr)) {
                alert("El archivo no contiene un catálogo válido.");
                return;
            }

            if (!confirm(`¿Desea importar ${importedArr.length} productos? Se sobreescribirán los productos con IDs coincidentes.`)) return;

            for (const p of importedArr) {
                if (p.id && p.name && p.price) {
                    if (p.stock === undefined) p.stock = 10;
                    await dbPutProduct(p);
                }
            }

            await refreshLocalState();
            renderAdminTable();
            alert("¡Catálogo importado con éxito!");
            adminImportFile.value = ''; // Reset input
        } catch (err) {
            console.error("Error parsing import: ", err);
            alert("El archivo JSON no posee el formato correcto.");
        }
    };
    fileReader.readAsText(file);
}
