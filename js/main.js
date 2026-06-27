/* ============================================
   VESPER & VINE - Main JavaScript
   ============================================ */

// LocalStorage Database Initializer & Fetcher
function getProductsData() {
  let data = localStorage.getItem('vesperProducts');
  if (!data || !data.includes('"burnTime"')) {
    const initialData = [
      {
        id: "lavender-wild-honey",
        name: "Lavender & Wild Honey",
        scent: "French Lavender & Honey",
        scentFamily: "floral",
        badge: "Best Seller",
        price: 52.00,
        burnTime: 60,
        image: "images/candle_lavender.png",
        thumbnails: [
          "images/candle_lavender.png",
          "images/candle_tuscan_leather.png",
          "images/candle_midnight_fig.png",
          "images/lifestyle_bedroom.png"
        ],
        description: "A restorative blend designed to transform your space into a sanctuary. Our hand-poured Lavender & Wild Honey candle pairs the botanical clarity of French lavender with the rich, nectarous warmth of locally sourced honey. Each batch is consciously crafted to evoke the stillness of a sun-drenched meadow at dusk.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 60 Hours", "Weight: 12 oz"],
        notes: {
          top: "Lavender & Citrus Zest",
          heart: "Wild Honey & Neroli",
          base: "Madagascar Vanilla & Musk"
        },
        rating: 4.8,
        reviews: [
          { user: "Eleanor R.", rating: 5, date: "May 12, 2026", title: "Pure bliss", text: "The scent throw is incredible, not too sweet, just perfect lavender calming notes." },
          { user: "Marcus V.", rating: 4, date: "April 28, 2026", title: "Very relaxing", text: "Perfect for bedtime reading. Smells clean and burns evenly." }
        ]
      },
      {
        id: "tuscan-leather",
        name: "Tuscan Leather",
        scent: "Sandalwood & Amber",
        scentFamily: "woody",
        badge: "Limited Edition",
        price: 48.00,
        burnTime: 55,
        image: "images/candle_tuscan_leather.png",
        thumbnails: [
          "images/candle_tuscan_leather.png",
          "images/candle_sea_salt.png",
          "images/candle_smoked_vanilla.png",
          "images/lifestyle_living.png"
        ],
        description: "Bold, warm, and sophisticated. Tuscan Leather brings the rich texture of fine suede and warm tobacco together with soft amber and sandalwood base notes. It is a grounding scent that adds immediate depth and character to any library, study, or living area.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 55 Hours", "Weight: 12 oz"],
        notes: {
          top: "Saffron & Raspberry",
          heart: "Thyme & Night-blooming Jasmine",
          base: "Leather, Sandalwood & Amber"
        },
        rating: 4.9,
        reviews: [
          { user: "Sophia L.", rating: 5, date: "June 02, 2026", title: "Warm and inviting", text: "Absolutely love this during rainy evenings. It feels extremely luxurious." }
        ]
      },
      {
        id: "midnight-fig",
        name: "Midnight Fig",
        scent: "Black Fig & Cedar",
        scentFamily: "woody",
        badge: "Eco Friendly",
        price: 52.00,
        burnTime: 60,
        image: "images/candle_midnight_fig.png",
        thumbnails: [
          "images/candle_midnight_fig.png",
          "images/candle_spiced_cedar.png",
          "images/lifestyle_shelf.png",
          "images/about_ingredients.png"
        ],
        description: "Deep, earthy, and mysterious. Midnight Fig features the luscious sweetness of ripe black fig blended with wild patchouli and the woody structure of cedarwood. It captures the essence of a stroll through an ancient orchard in the midnight hour.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 60 Hours", "Weight: 12 oz"],
        notes: {
          top: "Ripe Fig & Plum",
          heart: "Green Leaves & Cedar",
          base: "Patchouli & Dark Musk"
        },
        rating: 4.7,
        reviews: [
          { user: "Julian K.", rating: 5, date: "May 20, 2026", title: "My absolute favorite!", text: "Unique scent. Not overpowering but has a wonderful depth. Will buy again!" }
        ]
      },
      {
        id: "spring-meadow",
        name: "Spring Meadow",
        scent: "Bergamot & Wild Grass",
        scentFamily: "fresh",
        badge: "New Arrival",
        price: 44.00,
        burnTime: 50,
        image: "images/candle_spring_meadow.png",
        thumbnails: [
          "images/candle_spring_meadow.png",
          "images/candle_eucalyptus.png",
          "images/candle_sea_salt.png",
          "images/lifestyle_bath.png"
        ],
        description: "Fresh, airy, and revitalizing. Spring Meadow captures the clean scent of wet morning dew, crushed green leaves, and wild bergamot flowers. It is the perfect clean burning choice to refresh your kitchen or space after cleaning.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 50 Hours", "Weight: 12 oz"],
        notes: {
          top: "Bergamot & Citrus Zest",
          heart: "Wild Grass & Ferns",
          base: "White Patchouli & Vetiver"
        },
        rating: 4.6,
        reviews: [
          { user: "Clara T.", rating: 4, date: "April 15, 2026", title: "Very fresh", text: "Smells like a sunny morning. Perfect for spring/summer days." }
        ]
      },
      {
        id: "sea-salt-sage",
        name: "Sea Salt & Sage",
        scent: "Ocean Air & Wood Sage",
        scentFamily: "fresh",
        badge: "Best Seller",
        price: 48.00,
        burnTime: 55,
        image: "images/candle_sea_salt.png",
        thumbnails: [
          "images/candle_sea_salt.png",
          "images/candle_spring_meadow.png",
          "images/lifestyle_bath.png"
        ],
        description: "Escape to the wind-swept coast. Sea Salt & Sage pairs the crisp freshness of ocean mineral spray with the woody, herbaceous notes of wild sage. Grounded in earth and sky, it brings a breezy, relaxed ambiance to your bathroom or living space.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 55 Hours", "Weight: 12 oz"],
        notes: {
          top: "Ambrette Seeds & Grapefruit",
          heart: "Sea Salt & Mineral Accord",
          base: "Sage & Red Algae"
        },
        rating: 4.8,
        reviews: [
          { user: "Oliver P.", rating: 5, date: "June 05, 2026", title: "Coastal escape", text: "Feels like sitting on a cliff by the ocean. Incredibly calming." }
        ]
      },
      {
        id: "eucalyptus-mint",
        name: "Eucalyptus Mint",
        scent: "Fresh Mint & Herb",
        scentFamily: "fresh",
        badge: "Eco Friendly",
        price: 42.00,
        burnTime: 50,
        image: "images/candle_eucalyptus.png",
        thumbnails: [
          "images/candle_eucalyptus.png",
          "images/candle_sea_salt.png",
          "images/lifestyle_bath.png"
        ],
        description: "A purifying, cooling, and stimulating scent profile. Eucalyptus Mint clears the air and grounds the mind with crisp eucalyptus leaves, cooling peppermint oil, and aromatic rosemary. Ideal for a home spa ritual or morning clarity.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 50 Hours", "Weight: 12 oz"],
        notes: {
          top: "Peppermint & Spearmint",
          heart: "Eucalyptus Leaves & Rosemary",
          base: "Cedarwood & Light Musk"
        },
        rating: 4.5,
        reviews: [
          { user: "Nora G.", rating: 5, date: "May 30, 2026", title: "A spa in my room", text: "Burns beautifully and smells incredibly refreshing. Perfect for the bath." }
        ]
      },
      {
        id: "smoked-vanilla",
        name: "Smoked Vanilla",
        scent: "Vanilla Bean & Smoke",
        scentFamily: "woody",
        badge: "Limited Edition",
        price: 56.00,
        burnTime: 60,
        image: "images/candle_smoked_vanilla.png",
        thumbnails: [
          "images/candle_smoked_vanilla.png",
          "images/candle_tuscan_leather.png",
          "images/lifestyle_living.png"
        ],
        description: "A cozy, sophisticated twist on classic sweet vanilla. Smoked Vanilla pairs rich, dark Madagascar vanilla bean with the smoky undertones of burning oakwood and tobacco leaves. It is the ultimate comfort scent for cold nights.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 60 Hours", "Weight: 12 oz"],
        notes: {
          top: "Vanilla Bean & Honey",
          heart: "Charred Oak & Tobacco Leaf",
          base: "Smoked Wood & Amber"
        },
        rating: 4.9,
        reviews: [
          { user: "Lucas M.", rating: 5, date: "June 08, 2026", title: "Smoky goodness", text: "Not your basic sweet vanilla. It has a beautiful campfire smokiness to it." }
        ]
      },
      {
        id: "spiced-cedar",
        name: "Spiced Cedar",
        scent: "Cedar & Cinnamon",
        scentFamily: "woody",
        badge: "New Arrival",
        price: 50.00,
        burnTime: 55,
        image: "images/candle_spiced_cedar.png",
        thumbnails: [
          "images/candle_spiced_cedar.png",
          "images/candle_midnight_fig.png",
          "images/lifestyle_shelf.png"
        ],
        description: "An aromatic, woody blend that brings the crisp outdoors inside. Spiced Cedar blends freshly cut cedarwood and red balsam with warm spices like cinnamon, clove, and sweet orange peel. It is a festive, welcoming scent.",
        tags: ["Wax Type: 100% Soy", "Burn Time: 55 Hours", "Weight: 12 oz"],
        notes: {
          top: "Cinnamon & Orange Peel",
          heart: "B Balsam Fir & Clove",
          base: "Cedarwood & Oakmoss"
        },
        rating: 4.7,
        reviews: [
          { user: "Anna S.", rating: 4, date: "May 25, 2026", title: "Warm winter scent", text: "Very cozy, though the cinnamon is a bit strong. Still love the woody cedar undertone." }
        ]
      }
    ];
    localStorage.setItem('vesperProducts', JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
}

let PRODUCTS_DATA = getProductsData();

document.addEventListener('DOMContentLoaded', () => {
  // Load products from server if served via HTTP/HTTPS
  async function loadProductsFromServer() {
    if (window.location.protocol.startsWith('http')) {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          PRODUCTS_DATA = data;
          localStorage.setItem('vesperProducts', JSON.stringify(data));
          
          if (typeof updateShop === 'function') {
            updateShop();
          }
          if (window.location.pathname.includes('product.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id') || 'lavender-wild-honey';
            const p = PRODUCTS_DATA.find(item => item.id === productId);
            if (p) {
              renderProductReviews(p);
              renderRelatedProducts(p);
            }
          }
          if (typeof updateHeartButtons === 'function') {
            updateHeartButtons();
          }
        }
      } catch (e) {
        console.warn('Backend server not available. Falling back to local storage.', e);
      }
    }
  }
  loadProductsFromServer();
  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 600);
      }, 800);
    });
    // Fallback: remove after 3s
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 600);
    }, 3000);
  }

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar-vesper');
  if (navbar) {
    const updateNavbar = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Back to Top Button ----------
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Search Overlay ----------
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchOverlay) {
    // Dynamically insert suggestions dropdown if it doesn't exist
    let resultsDropdown = document.getElementById('searchResultsDropdown');
    if (!resultsDropdown && searchInput) {
      resultsDropdown = document.createElement('div');
      resultsDropdown.id = 'searchResultsDropdown';
      resultsDropdown.className = 'search-results-dropdown mt-3';
      resultsDropdown.style.cssText = `
        display: none;
        max-height: 350px;
        overflow-y: auto;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        background: var(--clr-bg);
        border: 1px solid var(--clr-border);
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-md);
        text-align: left;
      `;
      searchInput.parentNode.appendChild(resultsDropdown);
    }

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput?.focus(), 300);
    });

    const closeSearch = () => {
      searchOverlay.classList.remove('active');
      if (searchInput) searchInput.value = '';
      if (resultsDropdown) {
        resultsDropdown.style.display = 'none';
        resultsDropdown.innerHTML = '';
      }
    };

    searchClose?.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        closeSearch();
      }
    });

    if (searchInput && resultsDropdown) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) {
          resultsDropdown.style.display = 'none';
          resultsDropdown.innerHTML = '';
          return;
        }

        const matches = PRODUCTS_DATA.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.scent.toLowerCase().includes(q) ||
          p.scentFamily.toLowerCase().includes(q)
        );

        if (matches.length === 0) {
          resultsDropdown.innerHTML = `
            <div class="p-3 text-muted text-center" style="font-size: 0.85rem; font-family: var(--ff-body);">
              No candles found matching "${q.replace(/[&<>'"]/g, c => `&#${c.charCodeAt(0)};`)}"
            </div>
          `;
        } else {
          resultsDropdown.innerHTML = matches.map(p => `
            <div class="search-suggest-item p-2 d-flex align-items-center border-bottom" style="cursor: pointer; transition: background 0.2s; border-color: var(--clr-border-light) !important;" onclick="window.location='product.html?id=${p.id}'">
              <img src="${p.image}" alt="${p.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: var(--radius-sm); margin-right: 12px;">
              <div style="flex: 1;">
                <h6 class="mb-0" style="font-size: 0.85rem; font-family: var(--ff-body); color: var(--clr-text); font-weight: 500;">${p.name}</h6>
                <span class="text-muted" style="font-size: 0.75rem; font-family: var(--ff-body); font-style: italic;">${p.scent}</span>
              </div>
              <div style="font-size: 0.85rem; font-weight: 500; color: var(--clr-text); font-family: var(--ff-body);">$${p.price.toFixed(2)}</div>
            </div>
          `).join('');

          const items = resultsDropdown.querySelectorAll('.search-suggest-item');
          items.forEach(item => {
            item.addEventListener('mouseenter', () => item.style.backgroundColor = 'var(--clr-cream)');
            item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
          });
        }
        resultsDropdown.style.display = 'block';
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = searchInput.value.trim();
          if (q) {
            window.location = `shop.html?search=${encodeURIComponent(q)}`;
          }
        }
      });
    }
  }

  // ---------- Cart System ----------
  let cart = JSON.parse(localStorage.getItem('vesperCart') || '[]');
  updateCartCount();

  // Add to cart function supporting both old and new signatures
  window.addToCart = function(idOrName, scent, price, image) {
    let product;
    if (scent) {
      // Old signature: addToCart(name, scent, price, image)
      const name = idOrName;
      product = PRODUCTS_DATA.find(p => p.name.toLowerCase() === name.toLowerCase()) || {
        id: name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
        name,
        scent,
        price: parseFloat(price),
        image
      };
    } else {
      // New signature: addToCart(id)
      product = PRODUCTS_DATA.find(p => p.id === idOrName);
    }
    
    if (!product) return;
    
    const existing = cart.find(item => item.id === product.id || item.name === product.name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: product.id, name: product.name, scent: product.scent, price: product.price, image: product.image, qty: 1 });
    }
    localStorage.setItem('vesperCart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to bag`);
    renderCart();
  };

  // Add to cart function with specific quantity
  window.addToCartQuantity = function(id, qty) {
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.id === id || item.name === product.name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, scent: product.scent, price: product.price, image: product.image, qty: qty });
    }
    localStorage.setItem('vesperCart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${qty}x ${product.name} added to bag`);
    renderCart();
  };

  // Remove from cart
  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('vesperCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  };

  window.updateCartItemQty = function(index, change) {
    if (cart[index]) {
      cart[index].qty += change;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem('vesperCart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
  };

  function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    countElements.forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? 'flex' : 'none';
    });

    const drawerBadges = document.querySelectorAll('.cart-count-badge');
    drawerBadges.forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? 'inline-block' : 'none';
    });
  }

  function renderCart() {
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotalPrice');
    const drawerCartPreviewItems = document.getElementById('drawerCartPreviewItems');
    const drawerCartPreviewSubtotal = document.getElementById('drawerCartPreviewSubtotal');
    const drawerCartPreviewFooter = document.getElementById('drawerCartPreviewFooter');

    if (cartBody) {
      if (cart.length === 0) {
        cartBody.innerHTML = `
          <div class="text-center py-5">
            <i class="bi bi-bag" style="font-size: 2.5rem; color: var(--clr-text-muted);"></i>
            <p class="mt-3" style="color: var(--clr-text-muted); font-size: 0.9rem; font-family: var(--ff-body); text-transform: uppercase; letter-spacing: 0.08em;">Your Bag is Empty</p>
            <a href="shop.html" class="btn-vesper-outline mt-2" data-bs-dismiss="offcanvas" style="display: inline-flex; text-decoration: none;">
              <span>Continue Shopping</span>
            </a>
          </div>
        `;
      } else {
        cartBody.innerHTML = cart.map((item, i) => `
          <div class="cart-item">
            <div class="cart-item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
              <h5>${item.name}</h5>
              <span class="cart-item-scent">${item.scent}</span>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${i})">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        `).join('');
      }
    }
    if (cartTotal) {
      const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    if (drawerCartPreviewItems) {
      if (cart.length === 0) {
        drawerCartPreviewItems.innerHTML = `
          <div class="text-center py-3">
            <p class="text-muted mb-2" style="font-size: 0.8rem;">Your bag is empty.</p>
            <a href="shop.html" class="btn btn-sm btn-vesper-outline py-1 px-3 mt-1" data-bs-dismiss="offcanvas" style="font-size: 0.65rem; text-decoration: none;">
              <span>Explore Scents</span>
            </a>
          </div>
        `;
        if (drawerCartPreviewFooter) drawerCartPreviewFooter.style.display = 'none';
      } else {
        drawerCartPreviewItems.innerHTML = cart.map((item, i) => `
          <div class="lux-preview-item py-2 border-bottom" style="border-color: var(--clr-border-light) !important;">
            <div class="lux-preview-img" onclick="window.location='product.html?id=${item.id}'; const off = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas')); if(off) off.hide();" style="cursor:pointer;">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="lux-preview-info">
              <h6 class="lux-preview-name mb-1" onclick="window.location='product.html?id=${item.id}'; const off = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas')); if(off) off.hide();" style="cursor:pointer; font-size: 0.82rem; font-weight: 500; color: var(--clr-text);">${item.name}</h6>
              <span class="lux-preview-scent" style="font-size: 0.7rem; color: var(--clr-text-muted); font-style: italic; display: block;">${item.scent}</span>
              <div class="d-flex align-items-center justify-content-between mt-1">
                <div class="d-flex align-items-center gap-1 border rounded px-1" style="background: var(--clr-bg-alt); border-color: var(--clr-border-light) !important; padding: 2px 4px;">
                  <button class="btn btn-sm p-0 border-0" onclick="updateCartItemQty(${i}, -1)" style="font-size: 0.65rem; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center;"><i class="bi bi-minus"></i></button>
                  <span style="font-size: 0.72rem; font-weight: 500; min-width: 12px; text-align: center;">${item.qty}</span>
                  <button class="btn btn-sm p-0 border-0" onclick="updateCartItemQty(${i}, 1)" style="font-size: 0.65rem; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center;"><i class="bi bi-plus"></i></button>
                </div>
                <div class="lux-preview-price" style="font-size: 0.78rem; font-weight: 600; color: var(--clr-accent);">$${(item.price * item.qty).toFixed(2)}</div>
              </div>
            </div>
            <button class="btn btn-sm p-1 text-muted border-0 bg-transparent" onclick="removeFromCart(${i})">
              <i class="bi bi-x-lg" style="font-size: 0.7rem;"></i>
            </button>
          </div>
        `).join('');
        if (drawerCartPreviewFooter) drawerCartPreviewFooter.style.display = 'block';
      }
    }
    if (drawerCartPreviewSubtotal) {
      const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      drawerCartPreviewSubtotal.textContent = `$${total.toFixed(2)}`;

      // Update Shipping Threshold delta and progress bar dynamically
      const shippingDeltaEl = document.getElementById('drawerShippingDelta');
      const shippingProgressBarFill = document.getElementById('drawerShippingProgressBarFill');
      if (shippingDeltaEl && shippingProgressBarFill) {
        if (total >= 100) {
          shippingDeltaEl.innerHTML = '<span style="color: var(--clr-sage); font-weight: 600;"><i class="bi bi-check-circle-fill"></i> Unlocked</span>';
          shippingProgressBarFill.style.width = '100%';
          shippingProgressBarFill.style.backgroundColor = 'var(--clr-sage)';
        } else {
          const delta = 100 - total;
          shippingDeltaEl.textContent = `$${delta.toFixed(2)} away`;
          shippingProgressBarFill.style.width = `${(total / 100) * 100}%`;
          shippingProgressBarFill.style.backgroundColor = 'var(--clr-accent)';
        }
      }

      // Wire up gifting options inside the drawer
      const giftCheckbox = document.getElementById('drawerGiftWrapCheckbox');
      const giftNoteText = document.getElementById('drawerGiftNoteText');
      if (giftCheckbox && giftNoteText && !giftCheckbox.dataset.listenerInitialized) {
        giftCheckbox.dataset.listenerInitialized = 'true';
        
        // Load cached gifting preference
        const cachedGift = JSON.parse(localStorage.getItem('vesperGiftOption') || 'null');
        if (cachedGift) {
          giftCheckbox.checked = cachedGift.enabled;
          giftNoteText.value = cachedGift.note || '';
          giftNoteText.style.display = cachedGift.enabled ? 'block' : 'none';
        }
        
        // Toggle visibility
        giftCheckbox.addEventListener('change', () => {
          giftNoteText.style.display = giftCheckbox.checked ? 'block' : 'none';
          saveGiftPreferences();
          if (giftCheckbox.checked) {
            giftNoteText.focus();
          }
        });
        
        // Save changes
        giftNoteText.addEventListener('input', saveGiftPreferences);
        
        function saveGiftPreferences() {
          localStorage.setItem('vesperGiftOption', JSON.stringify({
            enabled: giftCheckbox.checked,
            note: giftNoteText.value
          }));
        }
      }
    }
  }

  renderCart();

  // ---------- Quantity Controls ----------
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('qtyInput');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val < 20) qtyInput.value = val + 1;
    });
  }

  // ---------- Product Thumbnails ----------
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainProductImg = document.getElementById('mainProductImg');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainProductImg) {
        mainProductImg.style.opacity = '0';
        setTimeout(() => {
          mainProductImg.src = thumb.querySelector('img').src;
          mainProductImg.style.opacity = '1';
        }, 200);
      }
    });
  });

  if (mainProductImg) {
    mainProductImg.style.transition = 'opacity 0.3s ease';
  }

  // ---------- Filter Checkboxes ----------
  const filterChecks = document.querySelectorAll('.filter-check input');
  filterChecks.forEach(check => {
    check.addEventListener('change', () => {
      // Filter animation - fade out and in the product grid
      const grid = document.querySelector('.shop-product-grid');
      if (grid) {
        grid.style.opacity = '0.5';
        grid.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          grid.style.opacity = '1';
        }, 400);
      }
    });
  });

  // Size buttons
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Price range
  const priceRange = document.getElementById('priceRange');
  const priceMax = document.getElementById('priceMax');
  if (priceRange && priceMax) {
    priceRange.addEventListener('input', () => {
      priceMax.textContent = `Up to $${priceRange.value}`;
    });
  }

  // ---------- Toast Notification ----------
  function showToast(message) {
    // Remove any existing toast
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="bi bi-check-circle me-2"></i>${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  window.showToast = showToast;


  // ---------- Newsletter Form ----------
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()) {
        const email = input.value.trim().toLowerCase();
        
        // Simple regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showToast('Please enter a valid email address.');
          return;
        }

        const showSuccess = () => {
          showToast('Thank you for subscribing!');
          const successMessage = document.createElement('div');
          successMessage.className = 'newsletter-success-animation';
          successMessage.innerHTML = `
            <i class="bi bi-patch-check" style="font-size: 2.2rem; color: var(--clr-accent-light); margin-bottom: 0.5rem; display: block;"></i>
            <h6 style="color: var(--clr-white); font-weight: 600; margin-bottom: 0.2rem;">Subscribed!</h6>
            <p style="font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-bottom: 0;">Welcome to Vesper & Vine. Check your inbox for updates.</p>
          `;
          form.parentNode.replaceChild(successMessage, form);
        };

        // Try server-side subscription first
        if (window.location.protocol.startsWith('http')) {
          try {
            const res = await fetch('/api/newsletter', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
            if (res.ok) {
              showSuccess();
              return;
            }
          } catch (e) {
            console.warn('Newsletter API failed. Falling back to local storage.', e);
          }
        }

        const subscribers = JSON.parse(localStorage.getItem('vesperNewsletterSubscribers') || '[]');
        if (subscribers.includes(email)) {
          showToast('You are already subscribed!');
        } else {
          subscribers.push(email);
          localStorage.setItem('vesperNewsletterSubscribers', JSON.stringify(subscribers));
          showSuccess();
        }
      }
    });
  });

  // ---------- Load More Products ----------
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
      setTimeout(() => {
        showToast('All products are now displayed');
        loadMoreBtn.innerHTML = '<span>No More Products</span>';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
      }, 1200);
    });
  }

  // ---------- Product Image Parallax on Scroll ----------
  const parallaxImages = document.querySelectorAll('.parallax-img');
  if (parallaxImages.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = rect.top / window.innerHeight;
        img.style.transform = `translateY(${scrollPercent * 20}px)`;
      });
    }, { passive: true });
  }

  // ---------- Navbar Active Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-vesper .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Dynamic Navbar Account Link & Icon ----------
  const accountLink = document.querySelector('.navbar-icons a[aria-label="Account"]');
  if (accountLink) {
    const user = JSON.parse(localStorage.getItem('vesperUser') || 'null');
    const accountIcon = accountLink.querySelector('i');
    if (user && user.loggedIn) {
      accountLink.setAttribute('href', 'profile.html');
      if (accountIcon) {
        accountIcon.className = 'bi bi-person-fill';
      }
    } else {
      accountLink.setAttribute('href', 'login.html');
      if (accountIcon) {
        accountIcon.className = 'bi bi-person';
      }
    }
  }

  // ---------- Dynamic Shop Page Rendering & Filtering ----------
  const isShopPage = window.location.pathname.includes('shop.html');
  if (isShopPage) {
    const urlParams = new URLSearchParams(window.location.search);
    let searchQuery = urlParams.get('search') || '';
    const initialCategory = urlParams.get('category') || '';
    
    const searchInput = document.getElementById('searchInput');
    if (searchQuery && searchInput) {
      searchInput.value = searchQuery;
    }
    
    if (initialCategory) {
      const checkboxes = document.querySelectorAll('.scent-filter-checkbox');
      checkboxes.forEach(cb => {
        cb.checked = (cb.value === initialCategory);
      });
    }

    let selectedSize = '12';
    const sizeBtns = document.querySelectorAll('.size-options .size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.getAttribute('data-size');
        updateShop();
      });
    });

    // Dual Range Price Slider Setup
    const priceMinInput = document.getElementById('priceMinInput');
    const priceMaxInput = document.getElementById('priceMaxInput');
    const priceMinLabel = document.getElementById('priceMinLabel');
    const priceMaxLabel = document.getElementById('priceMaxLabel');
    const rangeHighlight = document.querySelector('.dual-range-highlight');

    function updateTrack() {
      if (!priceMinInput || !priceMaxInput || !rangeHighlight) return;
      const minVal = parseInt(priceMinInput.value);
      const maxVal = parseInt(priceMaxInput.value);
      const minPercent = ((minVal - 30) / (100 - 30)) * 100;
      const maxPercent = ((maxVal - 30) / (100 - 30)) * 100;
      
      rangeHighlight.style.left = minPercent + '%';
      rangeHighlight.style.width = (maxPercent - minPercent) + '%';
    }

    if (priceMinInput && priceMaxInput) {
      priceMinInput.addEventListener('input', () => {
        let minVal = parseInt(priceMinInput.value);
        let maxVal = parseInt(priceMaxInput.value);
        if (minVal > maxVal - 5) {
          priceMinInput.value = maxVal - 5;
          minVal = maxVal - 5;
        }
        priceMinLabel.textContent = `$${minVal}`;
        updateTrack();
        updateShop();
      });

      priceMaxInput.addEventListener('input', () => {
        let minVal = parseInt(priceMinInput.value);
        let maxVal = parseInt(priceMaxInput.value);
        if (maxVal < minVal + 5) {
          priceMaxInput.value = minVal + 5;
          maxVal = minVal + 5;
        }
        priceMaxLabel.textContent = `$${maxVal}`;
        updateTrack();
        updateShop();
      });
      
      updateTrack();
    }

    // Burn Time Slider Setup
    const burnTimeRange = document.getElementById('burnTimeRange');
    const burnTimeMax = document.getElementById('burnTimeMax');
    if (burnTimeRange && burnTimeMax) {
      burnTimeRange.addEventListener('input', () => {
        burnTimeMax.textContent = `Up to ${burnTimeRange.value} hrs`;
        updateShop();
      });
    }

    // Scent Family Checkboxes
    const checkboxes = document.querySelectorAll('.scent-filter-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        updateShop();
      });
    });

    // Sort Select Option
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        updateShop();
      });
    }

    // Permanent Clear Filters Sidebar Button
    const clearFiltersSidebarBtn = document.getElementById('clearFiltersSidebarBtn');
    if (clearFiltersSidebarBtn) {
      clearFiltersSidebarBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = true);
        if (priceMinInput && priceMaxInput) {
          priceMinInput.value = 30;
          priceMaxInput.value = 100;
          priceMinLabel.textContent = '$30';
          priceMaxLabel.textContent = '$100';
          updateTrack();
        }
        if (burnTimeRange) {
          burnTimeRange.value = 65;
          burnTimeMax.textContent = 'Up to 65 hrs';
        }
        updateShop();
      });
    }

    function updateShop() {
      const productGrid = document.querySelector('.shop-product-grid');
      const countEl = document.querySelector('.results-count');
      if (!productGrid) return;

      // Show skeletons immediately to simulate network delay/SPA feel
      productGrid.innerHTML = `
        <div class="col-6 col-md-4">
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-price"></div>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-price"></div>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-price"></div>
          </div>
        </div>
      `;
      if (countEl) {
        countEl.textContent = 'Updating...';
      }

      setTimeout(() => {
        const activeFamilies = Array.from(checkboxes)
          .filter(cb => cb.checked)
          .map(cb => cb.value);

        const minPrice = parseFloat(priceMinInput?.value || '30');
        const maxPrice = parseFloat(priceMaxInput?.value || '100');
        const maxBurnTime = parseInt(burnTimeRange?.value || '65');

        let filtered = PRODUCTS_DATA.filter(p => {
          const matchesFamily = activeFamilies.includes(p.scentFamily);
          const currentPrice = getAdjustedPrice(p.price, selectedSize);
          const matchesPrice = currentPrice >= minPrice && currentPrice <= maxPrice;
          const matchesBurnTime = (p.burnTime || 60) <= maxBurnTime;
          const matchesSearch = searchQuery
            ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.scent.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

          return matchesFamily && matchesPrice && matchesBurnTime && matchesSearch;
        });

        const sortBy = sortSelect?.value || 'Sort By: Featured';
        if (sortBy.includes('Low to High')) {
          filtered.sort((a, b) => getAdjustedPrice(a.price, selectedSize) - getAdjustedPrice(b.price, selectedSize));
        } else if (sortBy.includes('High to Low')) {
          filtered.sort((a, b) => getAdjustedPrice(b.price, selectedSize) - getAdjustedPrice(a.price, selectedSize));
        } else if (sortBy.includes('Newest First')) {
          filtered.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortBy.includes('Best Selling')) {
          filtered.sort((a, b) => (b.reviews ? b.reviews.length : 0) - (a.reviews ? a.reviews.length : 0));
        } else if (sortBy.includes('Popularity')) {
          filtered.sort((a, b) => b.rating - a.rating);
        }

        if (countEl) {
          countEl.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'result' : 'results'}`;
        }

        if (filtered.length === 0) {
          productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
              <i class="bi bi-search" style="font-size: 3rem; color: var(--clr-text-muted);"></i>
              <h3 class="mt-3" style="font-family: var(--ff-heading); font-weight: 300;">No products found</h3>
              <p class="text-muted">Try adjusting your filters or search query to find what you're looking for.</p>
              <button class="btn-vesper mt-3" id="resetFiltersBtn"><span>Clear All Filters</span></button>
            </div>
          `;
          const resetBtn = document.getElementById('resetFiltersBtn');
          if (resetBtn) {
            resetBtn.addEventListener('click', () => {
              checkboxes.forEach(cb => cb.checked = true);
              if (priceMinInput && priceMaxInput) {
                priceMinInput.value = 30;
                priceMaxInput.value = 100;
                priceMinLabel.textContent = '$30';
                priceMaxLabel.textContent = '$100';
                updateTrack();
              }
              if (burnTimeRange) {
                burnTimeRange.value = 65;
                burnTimeMax.textContent = 'Up to 65 hrs';
              }
              updateShop();
            });
          }
        } else {
          productGrid.innerHTML = filtered.map(p => {
            const adjustedPrice = getAdjustedPrice(p.price, selectedSize);
            return `
              <div class="col-6 col-md-4 reveal delay-1 revealed">
                <div class="product-card" onclick="window.location='product.html?id=${p.id}'">
                  <div class="product-card-image">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                    <img src="${p.image}" alt="${p.name}">
                    <div class="product-card-overlay">
                      <button class="quick-add-btn" onclick="event.stopPropagation(); addToCart('${p.id}')">Quick Add</button>
                    </div>
                  </div>
                  <h4>${p.name}</h4>
                  <p class="product-scent">${p.scent}</p>
                  <div class="product-card-rating mb-1 text-warning" style="font-size: 0.75rem;">
                    ${'<i class="bi bi-star-fill"></i>'.repeat(Math.round(p.rating))}
                    ${'<i class="bi bi-star"></i>'.repeat(5 - Math.round(p.rating))}
                  </div>
                  <div class="product-card-review-link mb-2">
                    <a href="product.html?id=${p.id}#reviewsList" onclick="event.stopPropagation();">(${p.reviews ? p.reviews.length + 248 : 250}+ reviews)</a>
                  </div>
                  <p class="product-price">$${adjustedPrice.toFixed(2)}</p>
                  <div class="product-features-mini">
                    <span><i class="bi bi-fire"></i> ${p.burnTime || 60}h Burn</span>
                    <span><i class="bi bi-leaf"></i> 100% Soy</span>
                    <span><i class="bi bi-hand-index-thumb"></i> Hand Poured</span>
                  </div>
                </div>
              </div>
            `;
          }).join('');
        }
        
        if (typeof updateHeartButtons === 'function') {
          updateHeartButtons();
        }
      }, 300);
    }

    function getAdjustedPrice(basePrice, size) {
      if (size === '8') return basePrice - 10.0;
      if (size === 'travel') return basePrice - 15.0;
      return basePrice;
    }

    updateShop();
  }

  // ---------- Dynamic Product Details Injection & Reviews System ----------
  const isProductPage = window.location.pathname.includes('product.html');
  if (isProductPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'lavender-wild-honey';
    
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (product) {
      // 1. Populate standard elements
      document.title = `${product.name} — Vesper & Vine`;

      // Update Open Graph and Twitter Card tags dynamically
      updateMetaTag('og:title', `${product.name} — Vesper & Vine`);
      updateMetaTag('og:description', product.description);
      updateMetaTag('og:image', window.location.origin + '/' + product.image);
      updateMetaTag('og:url', window.location.href);
      updateMetaTag('og:type', 'product');
      updateMetaTag('twitter:title', `${product.name} — Vesper & Vine`);
      updateMetaTag('twitter:description', product.description);
      updateMetaTag('twitter:image', window.location.origin + '/' + product.image);

      function updateMetaTag(property, content) {
        const attribute = property.startsWith('twitter:') ? 'name' : 'property';
        let meta = document.querySelector(`meta[${attribute}="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attribute, property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      }

      // Inject SEO JSON-LD Product Schema
      let schemaScript = document.getElementById('productSchema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'productSchema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      
      const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": [
          window.location.origin + '/' + product.image
        ],
        "description": product.description,
        "sku": product.id,
        "mpn": product.id,
        "brand": {
          "@type": "Brand",
          "name": "Vesper & Vine"
        },
        "review": (product.reviews || []).map(r => ({
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": r.rating.toString(),
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": r.user
          },
          "datePublished": r.date,
          "reviewBody": r.text
        })),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating.toString(),
          "reviewCount": (product.reviews || []).length.toString()
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "USD",
          "price": product.price.toString(),
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Vesper & Vine"
          }
        }
      };
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
      
      const breadcrumb = document.querySelector('.breadcrumb-vesper');
      if (breadcrumb) {
        breadcrumb.innerHTML = `
          <a href="index.html">Home</a>
          <span>&rsaquo;</span>
          <a href="shop.html">Shop</a>
          <span>&rsaquo;</span>
          <span>${product.name}</span>
        `;
      }
      
      const titleEl = document.querySelector('.product-info h1');
      if (titleEl) titleEl.textContent = product.name;
      
      const priceEl = document.querySelector('.product-price-detail');
      if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
      
      const descEl = document.querySelector('.product-description');
      if (descEl) descEl.textContent = product.description;
      
      const tagsContainer = document.querySelector('.product-tags');
      if (tagsContainer) {
        tagsContainer.innerHTML = product.tags.map(t => `<span class="product-tag">${t}</span>`).join('');
      }
      
      const notesContainer = document.querySelector('.scent-notes');
      if (notesContainer) {
        notesContainer.innerHTML = `
          <div class="scent-note-item">
            <p class="scent-note-label">Top Notes</p>
            <p class="scent-note-value">${product.notes.top}</p>
          </div>
          <div class="scent-note-item">
            <p class="scent-note-label">Heart Notes</p>
            <p class="scent-note-value">${product.notes.heart}</p>
          </div>
          <div class="scent-note-item">
            <p class="scent-note-label">Base Notes</p>
            <p class="scent-note-value">${product.notes.base}</p>
          </div>
        `;
      }
      
      const mainImg = document.getElementById('mainProductImg');
      if (mainImg) {
        mainImg.src = product.image;
        mainImg.alt = `${product.name} candle`;
      }
      
      const thumbsContainer = document.querySelector('.product-thumbnails');
      if (thumbsContainer) {
        thumbsContainer.innerHTML = product.thumbnails.map((t, index) => `
          <div class="product-thumb ${index === 0 ? 'active' : ''}">
            <img src="${t}" alt="${product.name} view ${index + 1}">
          </div>
        `).join('');
        
        const thumbs = thumbsContainer.querySelectorAll('.product-thumb');
        thumbs.forEach(thumb => {
          thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainImg) {
              mainImg.style.opacity = '0';
              setTimeout(() => {
                mainImg.src = thumb.querySelector('img').src;
                mainImg.style.opacity = '1';
              }, 200);
            }
          });
        });
      }
      
      // Add to Bag Button Override
      const addToBagBtn = document.querySelector('.add-to-bag-btn');
      if (addToBagBtn) {
        addToBagBtn.removeAttribute('onclick');
        addToBagBtn.addEventListener('click', () => {
          const qty = parseInt(document.getElementById('qtyInput')?.value || '1');
          addToCartQuantity(product.id, qty);
        });
      }

      // Review Stars Dynamic Click Handler
      const ratingStars = document.querySelectorAll('.rating-star-btn');
      const ratingInput = document.getElementById('reviewRatingInput');
      ratingStars.forEach(star => {
        star.addEventListener('click', () => {
          const val = star.getAttribute('data-value');
          if (ratingInput) ratingInput.value = val;
          ratingStars.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= parseInt(val)) {
              s.className = 'bi bi-star-fill text-warning rating-star-btn';
            } else {
              s.className = 'bi bi-star rating-star-btn';
            }
          });
        });
      });

      // Submit Review Form
      const addReviewForm = document.getElementById('addReviewForm');
      if (addReviewForm) {
        addReviewForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const rating = parseInt(ratingInput?.value || '0');
          if (!rating) {
            showToast('Please select a star rating.');
            return;
          }
          
          const user = document.getElementById('reviewAuthor').value.trim();
          const title = document.getElementById('reviewTitle').value.trim();
          const text = document.getElementById('reviewText').value.trim();

          // Try server-side review posting first
          if (window.location.protocol.startsWith('http')) {
            try {
              const res = await fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, rating, title, text })
              });
              if (res.ok) {
                const updatedProduct = await res.json();
                const pIndex = PRODUCTS_DATA.findIndex(p => p.id === productId);
                if (pIndex !== -1) {
                  PRODUCTS_DATA[pIndex] = updatedProduct;
                  localStorage.setItem('vesperProducts', JSON.stringify(PRODUCTS_DATA));
                  renderProductReviews(updatedProduct);
                }
                
                addReviewForm.reset();
                if (ratingInput) ratingInput.value = '';
                ratingStars.forEach(s => s.className = 'bi bi-star rating-star-btn');
                
                showToast('Thank you! Your review has been submitted.');
                return;
              }
            } catch (e) {
              console.warn('Review API failed. Falling back to local storage.', e);
            }
          }
          
          const newReview = {
            user,
            rating,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            title,
            text
          };
          
          const pIndex = PRODUCTS_DATA.findIndex(p => p.id === productId);
          if (pIndex !== -1) {
            PRODUCTS_DATA[pIndex].reviews = PRODUCTS_DATA[pIndex].reviews || [];
            PRODUCTS_DATA[pIndex].reviews.unshift(newReview);
            
            const totalRating = PRODUCTS_DATA[pIndex].reviews.reduce((sum, r) => sum + r.rating, 0);
            PRODUCTS_DATA[pIndex].rating = parseFloat((totalRating / PRODUCTS_DATA[pIndex].reviews.length).toFixed(1));
            
            localStorage.setItem('vesperProducts', JSON.stringify(PRODUCTS_DATA));
            renderProductReviews(PRODUCTS_DATA[pIndex]);
            
            addReviewForm.reset();
            if (ratingInput) ratingInput.value = '';
            ratingStars.forEach(s => s.className = 'bi bi-star rating-star-btn');
            
            showToast('Thank you! Your review has been submitted.');
          }
        });
      }

      function renderProductReviews(p) {
        const listContainer = document.getElementById('reviewsList');
        const averageRatingEl = document.getElementById('summaryAverageRating');
        const averageStarsEl = document.getElementById('summaryAverageStars');
        const totalReviewsEl = document.getElementById('summaryTotalReviews');
        
        if (!listContainer) return;
        
        const reviews = p.reviews || [];
        const avg = reviews.length > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : '0.0';
          
        if (averageRatingEl) averageRatingEl.textContent = avg;
        if (totalReviewsEl) totalReviewsEl.textContent = `Based on ${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`;
        
        if (averageStarsEl) {
          const fullStars = Math.floor(avg);
          const halfStar = avg % 1 >= 0.5 ? 1 : 0;
          const emptyStars = 5 - fullStars - halfStar;
          
          averageStarsEl.innerHTML = `
            ${'<i class="bi bi-star-fill text-warning"></i>'.repeat(fullStars)}
            ${halfStar ? '<i class="bi bi-star-half text-warning"></i>' : ''}
            ${'<i class="bi bi-star text-warning"></i>'.repeat(emptyStars)}
          `;
        }
        
        if (reviews.length === 0) {
          listContainer.innerHTML = `<p class="text-center text-muted py-4">No reviews yet. Be the first to share your experience!</p>`;
        } else {
          listContainer.innerHTML = reviews.map(r => `
            <div class="review-item border-bottom py-3">
              <div class="d-flex justify-content-between mb-2">
                <div>
                  <span class="review-user fw-bold" style="color: var(--clr-text); font-size: 0.9rem;">${escapeHTML(r.user)}</span>
                  <span class="review-date text-muted ms-2" style="font-size: 0.75rem;">${r.date}</span>
                </div>
                <div class="review-stars text-warning" style="font-size: 0.8rem;">
                  ${'<i class="bi bi-star-fill"></i>'.repeat(r.rating)}
                  ${'<i class="bi bi-star"></i>'.repeat(5 - r.rating)}
                </div>
              </div>
              <h5 class="review-title mb-1" style="font-size: 0.9rem; color: var(--clr-text); font-weight: 500;">${escapeHTML(r.title)}</h5>
              <p class="review-text text-muted mb-0" style="font-size: 0.85rem; line-height: 1.5;">${escapeHTML(r.text)}</p>
            </div>
          `).join('');
        }
      }

      function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
          tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
          }[tag] || tag)
        );
      }

      function renderRelatedProducts(curr) {
        const relatedContainer = document.querySelector('.also-like-section .row');
        if (!relatedContainer) return;
        
        let related = PRODUCTS_DATA.filter(p => p.id !== curr.id && p.scentFamily === curr.scentFamily);
        if (related.length < 4) {
          const otherProducts = PRODUCTS_DATA.filter(p => p.id !== curr.id && p.scentFamily !== curr.scentFamily);
          related = related.concat(otherProducts).slice(0, 4);
        } else {
          related = related.slice(0, 4);
        }
        
        relatedContainer.innerHTML = related.map(p => `
          <div class="col-6 col-md-3 reveal delay-1 revealed">
            <div class="product-card" onclick="window.location='product.html?id=${p.id}'">
              <div class="product-card-image">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                <img src="${p.image}" alt="${p.name}">
                <div class="product-card-overlay">
                  <button class="quick-add-btn" onclick="event.stopPropagation(); addToCart('${p.id}')">Quick Add</button>
                </div>
              </div>
              <h4>${p.name}</h4>
              <p class="product-scent">${p.scent}</p>
              <div class="product-card-rating mb-1 text-warning" style="font-size: 0.75rem;">
                ${'<i class="bi bi-star-fill"></i>'.repeat(Math.round(p.rating))}
                ${'<i class="bi bi-star"></i>'.repeat(5 - Math.round(p.rating))}
              </div>
              <div class="product-card-review-link mb-2">
                <a href="product.html?id=${p.id}#reviewsList" onclick="event.stopPropagation();">(${p.reviews ? p.reviews.length + 248 : 250}+ reviews)</a>
              </div>
              <p class="product-price">$${p.price.toFixed(2)}</p>
              <div class="product-features-mini">
                <span><i class="bi bi-fire"></i> ${p.burnTime || 60}h Burn</span>
                <span><i class="bi bi-leaf"></i> 100% Soy</span>
                <span><i class="bi bi-hand-index-thumb"></i> Hand Poured</span>
              </div>
            </div>
          </div>
        `).join('');
      }

      renderProductReviews(product);
      renderRelatedProducts(product);
    }
  }

  // ---------- Unified Profile Drawer Injection & Logic ----------
  if (!document.getElementById('profileOffcanvas')) {
    const profileOffcanvasDiv = document.createElement('div');
    profileOffcanvasDiv.className = 'offcanvas offcanvas-end offcanvas-vesper-drawer';
    profileOffcanvasDiv.id = 'profileOffcanvas';
    profileOffcanvasDiv.tabIndex = -1;
    profileOffcanvasDiv.innerHTML = `
      <div class="offcanvas-header border-bottom-0 pb-0">
        <h5 class="offcanvas-title" style="font-family: var(--ff-heading); font-weight: 300;">My Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column py-3" style="gap: 1.25rem;">
        
        <!-- Logged In Header -->
        <div id="drawerLoggedInHeader" style="display: none;">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="avatar-circle-lux" id="drawerAvatarMonogram">U</div>
            <div class="flex-grow-1">
              <h4 class="welcome-heading mb-0" id="drawerUserNameHeading" style="font-family: var(--ff-heading); font-size: 1.35rem; font-weight: 400; line-height: 1.2;">Welcome Back, <span id="drawerUserName">Syashraj</span></h4>
              <div class="d-flex align-items-center gap-2 mt-1 flex-wrap">
                <span class="tier-badge-gold" id="drawerMembershipTier">Gold Member ✦</span>
                <span class="status-badge-active" id="drawerAccountStatus">Active</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Logged Out Guest Header -->
        <div id="drawerLoggedOutHeader" style="display: none;">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="avatar-circle-lux"><i class="bi bi-person"></i></div>
            <div>
              <h4 class="welcome-heading mb-0" style="font-family: var(--ff-heading); font-size: 1.35rem; font-weight: 400; line-height: 1.2;">Fragrance Concierge</h4>
              <span class="text-muted" style="font-size: 0.76rem;">Experience Vesper & Vine</span>
            </div>
          </div>
        </div>

        <!-- Logged Out Invite Card -->
        <div id="drawerLoggedOutInvite" class="guest-concierge-invite" style="display: none;">
          <h5 class="guest-concierge-title">Unveil the Scent Club</h5>
          <p class="guest-concierge-desc text-muted">Join to earn rewards, customize subscription shipments, and track orders.</p>
          <a href="login.html" class="btn btn-vesper w-100 py-2" style="font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;"><span>Sign In / Register</span></a>
        </div>

        <!-- Rewards Progress Card (Logged In Only) -->
        <div id="drawerRewardsCard" class="luxury-drawer-card" style="display: none;">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-uppercase text-muted" style="font-size: 0.65rem; letter-spacing: 0.08em; font-weight: 600;">Scent Sanctuary Rewards</span>
            <span class="fw-500" style="font-size: 0.75rem; font-family: var(--ff-body); color: var(--clr-gold);" id="drawerRewardsPoints">48 Points</span>
          </div>
          <div class="rewards-progress-track">
            <div class="rewards-progress-bar-fill" id="drawerRewardsBarFill" style="width: 48%;"></div>
          </div>
          <div class="d-flex justify-content-between align-items-center" style="font-size: 0.7rem; color: var(--clr-text-muted);">
            <span id="drawerPointsMinMax">48 / 100 points</span>
            <strong style="color: var(--clr-accent);" id="drawerPointsNeeded">52 points until Gold</strong>
          </div>
        </div>

        <!-- Quick Actions Grid (Logged In Only) -->
        <div id="drawerActionsGrid" class="actions-grid" style="display: none;">
          <a href="profile.html?tab=dashboard" class="action-card-lux">
            <i class="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
          <a href="profile.html?tab=orders" class="action-card-lux">
            <i class="bi bi-receipt"></i>
            <span>Orders</span>
          </a>
          <a href="profile.html?tab=wishlist" class="action-card-lux" id="drawerActionWishlistBtn">
            <i class="bi bi-heart"></i>
            <span>Wishlist</span>
          </a>
          <a href="profile.html?tab=addresses" class="action-card-lux">
            <i class="bi bi-geo-alt"></i>
            <span>Addresses</span>
          </a>
        </div>

        <!-- Shopping Bag Preview -->
        <div class="luxury-drawer-card" id="drawerCartPreviewCard">
          <div class="luxury-drawer-card-header">
            <h5 class="luxury-drawer-card-title">Shopping Bag (<span class="cart-preview-count">0</span>)</h5>
            <a href="shop.html" class="luxury-drawer-card-link" data-bs-dismiss="offcanvas">Shop All</a>
          </div>
          <div id="drawerCartPreviewItems">
            <!-- Dynamically populated -->
          </div>
          <div id="drawerCartPreviewFooter" style="display: none;">
            <!-- Shipping Threshold Progress Bar -->
            <div id="drawerShippingThresholdContainer" class="mb-3 pt-2">
              <div class="d-flex justify-content-between align-items-center mb-1" style="font-size: 0.72rem; font-family: var(--ff-body);">
                <span id="drawerShippingLabel" class="text-muted">Complimentary Shipping</span>
                <span id="drawerShippingDelta" style="font-weight: 500; color: var(--clr-accent);">$100.00 away</span>
              </div>
              <div class="rewards-progress-track" style="height: 4px; background: var(--clr-border-light);">
                <div class="rewards-progress-bar-fill" id="drawerShippingProgressBarFill" style="width: 0%; height: 100%; background: var(--clr-accent); transition: width 0.3s ease;"></div>
              </div>
            </div>

            <!-- Gifting Checkbox -->
            <div class="luxury-gifting-option mb-3 border-top pt-2" style="border-color: var(--clr-border-light) !important;">
              <label class="form-check-vesper d-flex align-items-center gap-2" style="font-size: 0.72rem; cursor: pointer; color: var(--clr-text-light);">
                <input type="checkbox" id="drawerGiftWrapCheckbox" style="transform: scale(1.05); margin-right: 4px;"> Include complimentary gift wrapping & note
              </label>
              <textarea id="drawerGiftNoteText" class="form-control mt-2" rows="2" placeholder="Write your personalized note here..." style="display: none; font-size: 0.72rem; border-color: var(--clr-border-light); border-radius: var(--radius-sm); resize: none;"></textarea>
            </div>

            <div class="d-flex justify-content-between mb-2 mt-3 fw-500" style="font-size: 0.85rem; color: var(--clr-text);">
              <span>Subtotal</span>
              <span id="drawerCartPreviewSubtotal">$0.00</span>
            </div>
            <button class="btn-vesper-gold w-100" id="drawerCheckoutBtnLux"><span>Checkout →</span></button>
            <p class="text-center mb-0 mt-2 text-muted" style="font-size: 0.68rem;">Complimentary scent samples with every order</p>
          </div>
        </div>

        <!-- Wishlist Preview -->
        <div class="luxury-drawer-card" id="drawerWishlistPreviewCard">
          <div class="luxury-drawer-card-header">
            <h5 class="luxury-drawer-card-title">Wishlist (<span class="wishlist-preview-count">0</span>)</h5>
            <span class="luxury-drawer-card-link" id="drawerWishlistPreviewLink">View Wishlist →</span>
          </div>
          <div id="drawerWishlistPreviewItems">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Subscription Card (Logged In Only) -->
        <div id="drawerSubscriptionCard" class="luxury-drawer-card" style="display: none;">
          <div class="luxury-drawer-card-header">
            <h5 class="luxury-drawer-card-title">Subscription</h5>
            <a href="profile.html?tab=subscriptions" class="luxury-drawer-card-link">Manage →</a>
          </div>
          <div class="subscription-preview-content">
            <p style="font-weight: 500; color: var(--clr-text); font-size: 0.82rem; margin-bottom: 2px;">Seasonal Discovery Box</p>
            <p class="text-muted mb-0" style="font-size: 0.76rem;">Next shipment: <span style="font-weight: 500; color: var(--clr-accent);" id="drawerSubDate">March 21</span></p>
          </div>
        </div>

        <!-- Recent Activity (Logged In Only) -->
        <div id="drawerActivityCard" class="luxury-drawer-card" style="display: none;">
          <div class="luxury-drawer-card-header">
            <h5 class="luxury-drawer-card-title">Recent Activity</h5>
          </div>
          <div class="activity-block">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span style="font-weight: 500; color: var(--clr-text);" id="drawerActivityOrderId">Order #VV-2947</span>
              <span class="activity-status-pill" id="drawerActivityStatus">Delivered</span>
            </div>
            <span class="text-muted" style="font-size: 0.72rem;" id="drawerActivityDate">Delivered on Jan 12</span>
          </div>
        </div>

        <!-- Appearance Section -->
        <div class="luxury-drawer-card">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="luxury-drawer-card-title">Appearance</span>
            <span id="drawerThemeModeName" class="text-muted" style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em;">Light Theme</span>
          </div>
          <div class="segmented-theme-control">
            <button class="segmented-theme-btn active" id="btnThemeLight">
              <i class="bi bi-sun"></i> Light
            </button>
            <button class="segmented-theme-btn" id="btnThemeDark">
              <i class="bi bi-moon-stars"></i> Dark
            </button>
          </div>
        </div>

        <!-- Logout Section (Logged In Only) -->
        <div id="drawerLogoutWrapper" class="drawer-footer-lux" style="display: none;">
          <button id="drawerLogoutBtnLux" class="btn-vesper-text-link">Sign Out</button>
        </div>

      </div>
    `;
    document.body.appendChild(profileOffcanvasDiv);
  }

  let wishlist = JSON.parse(localStorage.getItem('vesperWishlist') || '[]');

  // Update profile states inside drawer
  function updateDrawerProfile() {
    const user = JSON.parse(localStorage.getItem('vesperUser') || 'null');
    
    const loggedInHeader = document.getElementById('drawerLoggedInHeader');
    const loggedOutHeader = document.getElementById('drawerLoggedOutHeader');
    const loggedOutInvite = document.getElementById('drawerLoggedOutInvite');
    const rewardsCard = document.getElementById('drawerRewardsCard');
    const actionsGrid = document.getElementById('drawerActionsGrid');
    const subscriptionCard = document.getElementById('drawerSubscriptionCard');
    const activityCard = document.getElementById('drawerActivityCard');
    const logoutWrapper = document.getElementById('drawerLogoutWrapper');
    
    if (user && user.loggedIn) {
      if (loggedInHeader) loggedInHeader.style.display = 'block';
      if (loggedOutHeader) loggedOutHeader.style.display = 'none';
      if (loggedOutInvite) loggedOutInvite.style.display = 'none';
      if (rewardsCard) rewardsCard.style.display = 'block';
      if (actionsGrid) actionsGrid.style.display = 'grid';
      if (subscriptionCard) subscriptionCard.style.display = 'block';
      if (activityCard) activityCard.style.display = 'block';
      if (logoutWrapper) logoutWrapper.style.display = 'flex';
      
      const drawerUserName = document.getElementById('drawerUserName');
      const avatarCircle = document.getElementById('drawerAvatarMonogram');
      
      const firstName = user.firstName || 'Syashraj';
      if (drawerUserName) drawerUserName.textContent = firstName;
      if (avatarCircle) {
        const cachedPic = localStorage.getItem('vesperProfileAvatar');
        if (cachedPic) {
          avatarCircle.innerHTML = `<img src="${cachedPic}" alt="${firstName}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
          avatarCircle.style.background = 'none';
        } else {
          avatarCircle.textContent = firstName.charAt(0).toUpperCase();
          avatarCircle.style.background = '';
        }
      }

      // Rewards status calculation
      const rewardsPoints = document.getElementById('drawerRewardsPoints');
      const rewardsBarFill = document.getElementById('drawerRewardsBarFill');
      const pointsMinMax = document.getElementById('drawerPointsMinMax');
      const pointsNeeded = document.getElementById('drawerPointsNeeded');
      const membershipTier = document.getElementById('drawerMembershipTier');
      const accountStatus = document.getElementById('drawerAccountStatus');
      
      // Match prompt request values
      const points = 48; // Standard Gold tier starts at 48 pts
      const target = 100;
      const needed = target - points;
      const fillPercentage = Math.min(100, Math.round((points / target) * 100));
      
      if (rewardsPoints) rewardsPoints.textContent = `${points} Reward Points`;
      if (rewardsBarFill) {
        rewardsBarFill.style.width = '0%';
        setTimeout(() => {
          rewardsBarFill.style.width = `${fillPercentage}%`;
        }, 300);
      }
      if (pointsMinMax) pointsMinMax.textContent = `${points} / ${target} points`;
      if (pointsNeeded) pointsNeeded.textContent = `${needed} points until Gold`;
      if (membershipTier) membershipTier.textContent = 'Gold Member ✦';
      if (accountStatus) accountStatus.textContent = 'Active';

      // Recent Activity update
      const recentOrder = JSON.parse(localStorage.getItem('vesperOrders') || '[]');
      const localOrders = JSON.parse(localStorage.getItem('vesperOrdersMock') || '[]');
      const allOrders = [...recentOrder, ...localOrders];
      
      const activityOrderId = document.getElementById('drawerActivityOrderId');
      const activityStatus = document.getElementById('drawerActivityStatus');
      const activityDate = document.getElementById('drawerActivityDate');
      
      if (allOrders.length > 0) {
        const lastOrder = allOrders[0];
        if (activityOrderId) activityOrderId.textContent = `Order ${lastOrder.orderId}`;
        if (activityStatus) {
          activityStatus.textContent = lastOrder.status || 'Delivered';
          activityStatus.className = `activity-status-pill status-${lastOrder.status || 'delivered'}`;
        }
        if (activityDate) activityDate.textContent = `${lastOrder.status === 'delivered' ? 'Delivered' : 'Placed'} on ${lastOrder.date}`;
      } else {
        // Fallback standard
        if (activityOrderId) activityOrderId.textContent = 'Order #VV-2947';
        if (activityStatus) {
          activityStatus.textContent = 'Delivered';
          activityStatus.className = 'activity-status-pill';
        }
        if (activityDate) activityDate.textContent = 'Delivered on Jan 12';
      }
    } else {
      if (loggedInHeader) loggedInHeader.style.display = 'none';
      if (loggedOutHeader) loggedOutHeader.style.display = 'block';
      if (loggedOutInvite) loggedOutInvite.style.display = 'block';
      if (rewardsCard) rewardsCard.style.display = 'none';
      if (actionsGrid) actionsGrid.style.display = 'none';
      if (subscriptionCard) subscriptionCard.style.display = 'none';
      if (activityCard) activityCard.style.display = 'none';
      if (logoutWrapper) logoutWrapper.style.display = 'none';
    }
  }

  // Bind logout click inside drawer
  const drawerLogoutBtnLux = document.getElementById('drawerLogoutBtnLux');
  if (drawerLogoutBtnLux) {
    drawerLogoutBtnLux.addEventListener('click', async (e) => {
      e.preventDefault();
      if (window.location.protocol.startsWith('http')) {
        const token = localStorage.getItem('vesperAuthToken');
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } catch (error) {
          console.warn('API logout failed.', error);
        }
      }
      localStorage.removeItem('vesperUser');
      localStorage.removeItem('vesperAuthToken');
      updateDrawerProfile();
      showToast('Signed out successfully');
      if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'login.html';
      }
    });
  }

  updateDrawerProfile();

  // Segmented Theme Toggler in Drawer
  const btnThemeLight = document.getElementById('btnThemeLight');
  const btnThemeDark = document.getElementById('btnThemeDark');
  const themeModeName = document.getElementById('drawerThemeModeName');

  function updateThemeUI(isDark) {
    if (isDark) {
      if (btnThemeDark) btnThemeDark.classList.add('active');
      if (btnThemeLight) btnThemeLight.classList.remove('active');
      if (themeModeName) themeModeName.textContent = 'Dark Theme';
      document.documentElement.classList.add('dark-theme');
    } else {
      if (btnThemeLight) btnThemeLight.classList.add('active');
      if (btnThemeDark) btnThemeDark.classList.remove('active');
      if (themeModeName) themeModeName.textContent = 'Light Theme';
      document.documentElement.classList.remove('dark-theme');
    }
  }

  if (btnThemeLight && btnThemeDark) {
    const savedTheme = localStorage.getItem('vesperTheme') || 'light';
    updateThemeUI(savedTheme === 'dark');

    btnThemeLight.addEventListener('click', () => {
      localStorage.setItem('vesperTheme', 'light');
      updateThemeUI(false);
      showToast('Light theme activated');
      const pageThemeToggle = document.getElementById('pageThemeToggle');
      if (pageThemeToggle) pageThemeToggle.checked = false;
    });

    btnThemeDark.addEventListener('click', () => {
      localStorage.setItem('vesperTheme', 'dark');
      updateThemeUI(true);
      showToast('Dark theme activated');
      const pageThemeToggle = document.getElementById('pageThemeToggle');
      if (pageThemeToggle) pageThemeToggle.checked = true;
    });
  }

  // Hamburger toggler open class handler on collapse triggers
  const navbarCollapse = document.getElementById('navbarNav');
  const customHamburger = document.querySelector('.custom-hamburger');
  if (navbarCollapse && customHamburger) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      customHamburger.classList.add('open');
    });
    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      customHamburger.classList.remove('open');
    });
  }

  // Wishlist Actions
  window.toggleWishlist = function(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
      wishlist.push(productId);
      showToast('Item added to wishlist');
      
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('profileOffcanvas'));
      if (offcanvas) offcanvas.show();
      setTimeout(() => {
        const collapseWishlist = bootstrap.Collapse.getOrCreateInstance(document.getElementById('collapseWishlist'));
        if (collapseWishlist) collapseWishlist.show();
      }, 400);
    } else {
      wishlist.splice(index, 1);
      showToast('Item removed from wishlist');
    }
    localStorage.setItem('vesperWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
    updateHeartButtons();
  };

  // Wishlist Actions
  window.toggleWishlist = function(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
      wishlist.push(productId);
      showToast('Item added to wishlist');
      
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('profileOffcanvas'));
      if (offcanvas) offcanvas.show();
    } else {
      wishlist.splice(index, 1);
      showToast('Item removed from wishlist');
    }
    localStorage.setItem('vesperWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
    updateHeartButtons();
  };

  function updateWishlistCount() {
    const countElements = document.querySelectorAll('.wishlist-count');
    const total = wishlist.length;
    countElements.forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? 'flex' : 'none';
    });

    const drawerBadges = document.querySelectorAll('.wishlist-preview-count');
    drawerBadges.forEach(el => {
      el.textContent = total;
    });
  }

  function renderWishlist() {
    const wishlistBody = document.getElementById('wishlistBody');
    const drawerWishlistPreviewItems = document.getElementById('drawerWishlistPreviewItems');

    if (wishlistBody) {
      if (wishlist.length === 0) {
        wishlistBody.innerHTML = `
          <div class="text-center py-5">
            <i class="bi bi-heart" style="font-size: 2.5rem; color: var(--clr-text-muted);"></i>
            <p class="mt-3" style="color: var(--clr-text-muted); font-size: 0.9rem;">Your wishlist is empty</p>
            <a href="shop.html" class="btn-vesper-outline mt-2" style="display: inline-flex; text-decoration: none;" data-bs-dismiss="offcanvas">
              <span>Discover Scents</span>
            </a>
          </div>
        `;
      } else {
        const wishlistProducts = wishlist.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
        wishlistBody.innerHTML = wishlistProducts.map((p, i) => `
          <div class="cart-item">
            <div class="cart-item-img" onclick="window.location='product.html?id=${p.id}'; const off = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas')); if(off) off.hide();" style="cursor:pointer;">
              <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="cart-item-info" onclick="window.location='product.html?id=${p.id}'; const off = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas')); if(off) off.hide();" style="cursor:pointer; flex: 1;">
              <h5 style="font-size: 0.9rem; margin-bottom: 2px;">${p.name}</h5>
              <span class="cart-item-scent text-muted" style="font-size: 0.75rem; font-style: italic;">${p.scent}</span>
              <div class="cart-item-price fw-500" style="font-size: 0.85rem; margin-top: 4px;">$${p.price.toFixed(2)}</div>
            </div>
            <div class="d-flex flex-column gap-2 align-items-end justify-content-center">
              <button class="btn btn-sm p-1" onclick="addToCart('${p.id}'); toggleWishlist('${p.id}');" style="color: var(--clr-accent);" title="Move to Bag">
                <i class="bi bi-bag-plus fs-5"></i>
              </button>
              <button class="cart-item-remove position-static p-1" onclick="toggleWishlist('${p.id}')" title="Remove">
                <i class="bi bi-x-lg" style="font-size: 0.8rem;"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    if (drawerWishlistPreviewItems) {
      if (wishlist.length === 0) {
        drawerWishlistPreviewItems.innerHTML = `
          <div class="text-center py-3">
            <p class="text-muted mb-2" style="font-size: 0.8rem;">Your wishlist is empty.</p>
            <a href="shop.html" class="btn btn-sm btn-vesper-outline py-1 px-3 mt-1" data-bs-dismiss="offcanvas" style="font-size: 0.65rem; text-decoration: none;">
              <span>Discover Scents</span>
            </a>
          </div>
        `;
      } else {
        const wishlistProducts = wishlist.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
        drawerWishlistPreviewItems.innerHTML = wishlistProducts.map((p, i) => `
          <div class="lux-preview-item py-2 border-bottom" style="display: flex; align-items: center; gap: 1rem; border-color: var(--clr-border-light) !important;">
            <div class="lux-preview-img" onclick="window.location='product.html?id=${p.id}'; const off = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas')); if(off) off.hide();" style="cursor:pointer; width: 50px; height: 50px; border-radius: var(--radius-sm); overflow: hidden; background-color: var(--clr-bg-alt);">
              <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="lux-preview-info" style="flex: 1;">
              <h6 class="lux-preview-name mb-1" onclick="window.location='product.html?id=${p.id}'; const off = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas')); if(off) off.hide();" style="cursor:pointer; font-size: 0.82rem; font-weight: 500; color: var(--clr-text);">${p.name}</h6>
              <span class="lux-preview-scent" style="font-size: 0.7rem; color: var(--clr-text-muted); font-style: italic; display: block;">${p.scent}</span>
              <div class="lux-preview-price" style="font-size: 0.78rem; font-weight: 600; color: var(--clr-accent);">$${p.price.toFixed(2)}</div>
            </div>
            <div class="d-flex flex-column gap-2 align-items-end justify-content-center">
              <button class="btn btn-sm p-1 border-0 bg-transparent" onclick="addToCart('${p.id}'); toggleWishlist('${p.id}');" style="color: var(--clr-accent); margin-top: 4px;" title="Move to Bag">
                <i class="bi bi-bag-plus" style="font-size: 0.95rem;"></i>
              </button>
              <button class="btn btn-sm p-1 border-0 bg-transparent text-muted" onclick="toggleWishlist('${p.id}')" title="Remove">
                <i class="bi bi-x-lg" style="font-size: 0.7rem;"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // Bind Add All to Bag
  const drawerAddAllToBagBtn = document.getElementById('drawerAddAllToBagBtn');
  if (drawerAddAllToBagBtn) {
    drawerAddAllToBagBtn.addEventListener('click', () => {
      if (wishlist.length === 0) {
        showToast('Wishlist is empty');
        return;
      }
      wishlist.forEach(id => {
        const product = PRODUCTS_DATA.find(p => p.id === id);
        if (product) {
          const existing = cart.find(item => item.id === product.id);
          if (existing) {
            existing.qty++;
          } else {
            cart.push({ id: product.id, name: product.name, scent: product.scent, price: product.price, image: product.image, qty: 1 });
          }
        }
      });
      localStorage.setItem('vesperCart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
      
      wishlist = [];
      localStorage.setItem('vesperWishlist', JSON.stringify(wishlist));
      updateWishlistCount();
      renderWishlist();
      updateHeartButtons();
      
      showToast('All wishlist items moved to shopping bag!');
    });
  }

  // Bind Checkout button inside the drawer
  const drawerCheckoutBtnLux = document.getElementById('drawerCheckoutBtnLux');
  if (drawerCheckoutBtnLux) {
    drawerCheckoutBtnLux.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        showToast('Your bag is empty!');
        return;
      }
      const profileOff = bootstrap.Offcanvas.getInstance(document.getElementById('profileOffcanvas'));
      if (profileOff) profileOff.hide();
      
      setTimeout(() => {
        triggerCheckoutModal();
      }, 400);
    });
  }

  window.updateHeartButtons = function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      let id;
      const onclickAttr = card.getAttribute('onclick') || '';
      const idMatch = onclickAttr.match(/id=([a-zA-Z0-9\-]+)/);
      if (idMatch) {
        id = idMatch[1];
      } else {
        const title = card.querySelector('h4')?.textContent;
        if (title) {
          const p = PRODUCTS_DATA.find(item => item.name.toLowerCase() === title.toLowerCase());
          if (p) id = p.id;
        }
      }

      if (!id) return;

      const imageContainer = card.querySelector('.product-card-image');
      if (imageContainer) {
        let heartBtn = imageContainer.querySelector('.wishlist-heart-btn');
        if (!heartBtn) {
          heartBtn = document.createElement('button');
          heartBtn.className = 'wishlist-heart-btn';
          heartBtn.setAttribute('aria-label', 'Add to wishlist');
          heartBtn.innerHTML = `<i class="bi bi-heart" style="font-size: 0.95rem; color: var(--clr-text); transition: color 0.2s;"></i>`;
          heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(id);
            heartBtn.classList.add('pop');
            heartBtn.addEventListener('animationend', () => {
              heartBtn.classList.remove('pop');
            }, { once: true });
          });
          imageContainer.appendChild(heartBtn);
        }

        const heartIcon = heartBtn.querySelector('i');
        if (wishlist.includes(id)) {
          heartIcon.className = 'bi bi-heart-fill';
          heartIcon.style.color = 'var(--clr-accent)';
          heartBtn.style.backgroundColor = 'var(--clr-white)';
        } else {
          heartIcon.className = 'bi bi-heart';
          heartIcon.style.color = '';
          heartBtn.style.backgroundColor = '';
        }
      }
    });
  };

  updateWishlistCount();
  renderWishlist();
  updateHeartButtons();

  setTimeout(updateHeartButtons, 500);

  // ---------- Dynamic Policy Modals for Footer Links ----------
  const allLinks = document.querySelectorAll('footer a, .footer-bottom-links a');
  allLinks.forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (text === 'privacy policy' || text === 'terms of service' || text === 'accessibility' || text === 'careers' || text === 'sitemap') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openPolicyModal(link.textContent.trim());
      });
    }
  });

  function openPolicyModal(title) {
    let modalEl = document.getElementById('policyModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.className = 'modal fade';
      modalEl.id = 'policyModal';
      modalEl.tabIndex = -1;
      modalEl.setAttribute('aria-hidden', 'true');
      modalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content" style="border-radius: var(--radius-sm); border: none; background-color: var(--clr-bg);">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title" id="policyModalLabel" style="font-family: var(--ff-heading); font-weight: 400; color: var(--clr-text);"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-muted" id="policyModalBody" style="font-size: 0.85rem; line-height: 1.6; font-family: var(--ff-body);">
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn-vesper" data-bs-dismiss="modal" style="padding: 0.5rem 1.5rem; font-size: 0.7rem;"><span>Close</span></button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);
    }

    const modalTitle = modalEl.querySelector('.modal-title');
    const modalBody = modalEl.querySelector('.modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = getPolicyText(title);

    const bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bootstrapModal.show();
  }

  function getPolicyText(title) {
    const t = title.toLowerCase();
    if (t.includes('privacy')) {
      return `
        <p><strong>Last Updated: June 12, 2026</strong></p>
        <p>Welcome to Vesper & Vine. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">1. Information We Collect</h6>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact customer support. This information may include your name, email, billing address, and shipping address.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">2. How We Use Your Information</h6>
        <p>We use your information to process payments, ship orders, send promotional newsletter communications (with your consent), and improve our website's shopping experience.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">3. Data Security</h6>
        <p>We implement a variety of security measures to maintain the safety of your personal information. Your transactions are secure and processed through trusted encryption networks.</p>
      `;
    } else if (t.includes('terms')) {
      return `
        <p><strong>Last Updated: June 12, 2026</strong></p>
        <p>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">1. Store Conditions</h6>
        <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">2. Product Accuracy</h6>
        <p>We make every effort to display as accurately as possible the colors and images of our candles that appear in our store. Scent throws may vary depending on space conditions and placement.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">3. Pricing and Modifications</h6>
        <p>Prices for our candles are subject to change without notice. We reserve the right at any time to modify or discontinue products or services without notice.</p>
      `;
    } else if (t.includes('accessibility')) {
      return `
        <p><strong>Our Accessibility Statement</strong></p>
        <p>Vesper & Vine is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">1. Compliance Standards</h6>
        <p>We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. This helps make the web more user-friendly for people with visual, hearing, cognitive, and motor disabilities.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">2. Accessibility Features</h6>
        <p>Our website utilizes structured headings, alternative text formats for key image assets, high-contrast text color palettes, and accessible ARIA attributes to assist screen readers and keyboard navigation users.</p>
      `;
    } else if (t.includes('careers')) {
      return `
        <p><strong>Join the Vesper & Vine Team</strong></p>
        <p>We are always looking for passionate creators, candle pourers, fragrance curators, and builders who share our commitment to sustainability and slow living design.</p>
        <h6 class="mt-3" style="color: var(--clr-text); font-weight:500;">Open Positions:</h6>
        <ul style="padding-left: 20px;">
          <li><strong>Studio Assistant (Part-time)</strong> — Baltimore Atelier. Focus on small-batch candle pouring and quality check.</li>
          <li><strong>Social Media Specialist (Remote)</strong> — Management of Instagram, Pinterest, and TikTok community interactions.</li>
        </ul>
        <p class="mt-3">Interested in joining? Send your resume and cover letter to <em>careers@vesperandvine.com</em>.</p>
      `;
    } else if (t.includes('sitemap')) {
      return `
        <p><strong>Website Directory Sitemap</strong></p>
        <p>Find your way around our candle shop collection and journal notes easily.</p>
        <ul style="list-style: none; padding-left: 0;">
          <li class="mb-2"><a href="index.html" class="text-decoration-none" style="color: var(--clr-accent);">Home Page</a> — Intro to collections and philosophy</li>
          <li class="mb-2"><a href="shop.html" class="text-decoration-none" style="color: var(--clr-accent);">Shop All Collection</a> — Filter and order our candles</li>
          <li class="mb-2"><a href="about.html" class="text-decoration-none" style="color: var(--clr-accent);">About Us</a> — Sustainability and atelier details</li>
          <li class="mb-2"><a href="journal.html" class="text-decoration-none" style="color: var(--clr-accent);">The Journal</a> — Stories from our studio</li>
          <li class="mb-2"><a href="faq.html" class="text-decoration-none" style="color: var(--clr-accent);">FAQ Page</a> — Shipping and candle care guidelines</li>
        </ul>
      `;
    }
    return '';
  }

  // ---------- Scroll Progress Bar ----------
  const progressDiv = document.createElement('div');
  progressDiv.id = 'scrollProgress';
  document.body.appendChild(progressDiv);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressDiv.style.width = scrolled + '%';
  }, { passive: true });

  // Cleaned up old dynamic dark mode toggler insertion (moved to unified profile drawer)

  // ---------- Dynamic Mock Checkout Flow ----------
  document.addEventListener('click', (e) => {
    if (e.target.closest('.cart-footer button.btn-vesper') && !e.target.closest('#wishlistOffcanvas')) {
      e.preventDefault();
      if (cart.length === 0) {
        showToast('Your bag is empty!');
        return;
      }
      triggerCheckoutModal();
    }
  });

  function triggerCheckoutModal() {
    let modalEl = document.getElementById('checkoutModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.className = 'modal fade';
      modalEl.id = 'checkoutModal';
      modalEl.tabIndex = -1;
      modalEl.setAttribute('aria-hidden', 'true');
      modalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="border-radius: var(--radius-sm); border: none; background-color: var(--clr-bg);">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title" style="font-family: var(--ff-heading); font-weight: 400; color: var(--clr-text);">Secure Checkout</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="checkoutForm">
              <div class="modal-body text-muted" style="font-size: 0.85rem; line-height: 1.6; font-family: var(--ff-body);">
                <p>Please enter your details to complete your order. All billing and shipping are mocked for simulation.</p>
                <div class="mb-3">
                  <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Full Name</label>
                  <input type="text" class="form-control" id="checkoutName" style="font-size: 0.85rem;" required>
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Email Address</label>
                  <input type="email" class="form-control" id="checkoutEmail" style="font-size: 0.85rem;" required>
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Shipping Address</label>
                  <textarea class="form-control" id="checkoutAddress" rows="2" style="font-size: 0.85rem;" required></textarea>
                </div>
                <div class="row g-2 mb-3">
                  <div class="col-6">
                    <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Card Number</label>
                    <input type="text" class="form-control" placeholder="1234 5678 9101 1121" style="font-size: 0.85rem;" required>
                  </div>
                  <div class="col-3">
                    <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Expiry</label>
                    <input type="text" class="form-control" placeholder="MM/YY" style="font-size: 0.85rem;" required>
                  </div>
                  <div class="col-3">
                    <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">CVV</label>
                    <input type="password" class="form-control" placeholder="***" style="font-size: 0.85rem;" required>
                  </div>
                </div>
                <div class="d-flex justify-content-between fw-bold pt-2 border-top" style="color: var(--clr-text); font-size: 0.95rem;">
                  <span>Order Total</span>
                  <span id="checkoutTotalAmount">$0.00</span>
                </div>
              </div>
              <div class="modal-footer border-top-0">
                <button type="button" class="btn-vesper-outline" data-bs-dismiss="modal" style="padding: 0.5rem 1.5rem; font-size: 0.7rem;"><span>Cancel</span></button>
                <button type="submit" class="btn-vesper" style="padding: 0.5rem 1.5rem; font-size: 0.7rem;"><span>Complete Purchase</span></button>
              </div>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);

      const form = modalEl.querySelector('#checkoutForm');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const customer = {
          name: document.getElementById('checkoutName').value,
          email: document.getElementById('checkoutEmail').value,
          address: document.getElementById('checkoutAddress').value
        };

        // Try server-side order submission first
        if (window.location.protocol.startsWith('http')) {
          try {
            const res = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: cart, total, customer })
            });
            if (res.ok) {
              const savedOrder = await res.json();
              
              cart = [];
              localStorage.setItem('vesperCart', JSON.stringify(cart));
              updateCartCount();
              renderCart();

              const bootstrapModal = bootstrap.Modal.getInstance(modalEl);
              if (bootstrapModal) bootstrapModal.hide();

              const cartOff = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
              if (cartOff) cartOff.hide();

              showPurchaseSuccessModal(savedOrder.orderId);
              return;
            }
          } catch (e) {
            console.warn('Order API failed. Falling back to local storage.', e);
          }
        }

        const orderHistory = JSON.parse(localStorage.getItem('vesperOrders') || '[]');
        const newOrder = {
          orderId: 'V&V-' + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          items: [...cart],
          total: total,
          customer
        };
        orderHistory.push(newOrder);
        localStorage.setItem('vesperOrders', JSON.stringify(orderHistory));

        cart = [];
        localStorage.setItem('vesperCart', JSON.stringify(cart));
        updateCartCount();
        renderCart();

        const bootstrapModal = bootstrap.Modal.getInstance(modalEl);
        if (bootstrapModal) bootstrapModal.hide();

        const cartOff = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
        if (cartOff) cartOff.hide();

        showPurchaseSuccessModal(newOrder.orderId);
      });
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('checkoutTotalAmount').textContent = `$${total.toFixed(2)}`;

    const bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bootstrapModal.show();
  }

  function showPurchaseSuccessModal(orderId) {
    let successModalEl = document.getElementById('successModal');
    if (!successModalEl) {
      successModalEl = document.createElement('div');
      successModalEl.className = 'modal fade';
      successModalEl.id = 'successModal';
      successModalEl.tabIndex = -1;
      successModalEl.setAttribute('aria-hidden', 'true');
      successModalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered text-center">
          <div class="modal-content p-4" style="border-radius: var(--radius-sm); border: none; background-color: var(--clr-bg);">
            <div class="modal-body text-muted" style="font-size: 0.85rem; line-height: 1.6; font-family: var(--ff-body);">
              <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
              <h4 class="mt-3 mb-2" style="font-family: var(--ff-heading); font-weight: 300; color: var(--clr-text);">Order Placed Successfully!</h4>
              <p>Thank you for shopping with Vesper & Vine. Your mock order <strong id="successOrderId" style="color: var(--clr-text);"></strong> has been created.</p>
              <p>You can view your order log in LocalStorage.</p>
              <button type="button" class="btn-vesper mt-3" data-bs-dismiss="modal" style="padding: 0.5rem 2.0rem; font-size: 0.7rem;"><span>Continue Shopping</span></button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(successModalEl);
    }

    document.getElementById('successOrderId').textContent = orderId;
    const bootstrapModal = bootstrap.Modal.getOrCreateInstance(successModalEl);
    bootstrapModal.show();
  }

  // ---------- Unified Chatbot Assistant (Aura) ----------
  function initAuraChatbot() {
    if (document.getElementById('auraChatBubble')) return;

    const chatBubble = document.createElement('div');
    chatBubble.className = 'chatbot-bubble';
    chatBubble.id = 'auraChatBubble';
    chatBubble.innerHTML = '<i class="bi bi-chat-left-text-fill"></i>';

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chatbot-window';
    chatWindow.id = 'auraChatWindow';
    chatWindow.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <span class="chatbot-status-dot"></span>
          <h5>Aura — Scent Assistant</h5>
        </div>
        <button class="chatbot-close-btn" id="auraCloseBtn" aria-label="Close Chat"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="chatbot-messages" id="auraMessages">
        <div class="chat-msg bot">
          Hello! I am Aura, your Vesper & Vine fragrance assistant. Tell me what mood or scent profile you are looking for today, or ask me for a recommendation!
        </div>
        <div class="chat-chips-container" id="auraChips">
          <div class="chat-chip" data-query="calming">Calming & Sleep</div>
          <div class="chat-chip" data-query="woody">Woody & Warm</div>
          <div class="chat-chip" data-query="fresh">Fresh & Clean</div>
          <div class="chat-chip" data-query="best sellers">Best Sellers</div>
        </div>
      </div>
      <div class="chatbot-input-container">
        <input type="text" class="chatbot-input" id="auraInput" placeholder="Ask Aura about scents..." aria-label="Chat input">
        <button class="chatbot-send-btn" id="auraSendBtn" aria-label="Send message" disabled><i class="bi bi-send-fill"></i></button>
      </div>
    `;

    document.body.appendChild(chatBubble);
    document.body.appendChild(chatWindow);

    const closeBtn = document.getElementById('auraCloseBtn');
    const inputField = document.getElementById('auraInput');
    const sendBtn = document.getElementById('auraSendBtn');
    const messagesDiv = document.getElementById('auraMessages');

    // Toggle window
    chatBubble.addEventListener('click', () => {
      const isOpen = chatWindow.classList.toggle('active');
      chatBubble.classList.toggle('active', isOpen);
      if (isOpen) {
        chatBubble.innerHTML = '<i class="bi bi-x-lg"></i>';
        setTimeout(() => inputField.focus(), 300);
      } else {
        chatBubble.innerHTML = '<i class="bi bi-chat-left-text-fill"></i>';
      }
    });

    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
      chatBubble.classList.remove('active');
      chatBubble.innerHTML = '<i class="bi bi-chat-left-text-fill"></i>';
    });

    // Handle input enable/disable
    inputField.addEventListener('input', () => {
      sendBtn.disabled = !inputField.value.trim();
    });

    // Send action
    const sendMessage = (text) => {
      if (!text) return;
      
      // User message
      appendMessage(text, 'user');
      inputField.value = '';
      sendBtn.disabled = true;

      // Show typing indicator
      const typingInd = showTypingIndicator();

      // Recommend logic
      setTimeout(() => {
        typingInd.remove();
        generateBotResponse(text);
      }, 900);
    };

    sendBtn.addEventListener('click', () => {
      sendMessage(inputField.value.trim());
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage(inputField.value.trim());
      }
    });

    // Chips and Add to Cart event delegation
    messagesDiv.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-chip');
      if (chip) {
        sendMessage(chip.textContent);
        return;
      }

      // Add to cart delegation
      const buyBtn = e.target.closest('.btn-chat-add-to-cart');
      if (buyBtn) {
        const id = buyBtn.dataset.id;
        if (typeof window.addToCart === 'function') {
          window.addToCart(id);
        }
      }
    });

    function appendMessage(text, sender, htmlContent = null) {
      const msg = document.createElement('div');
      msg.className = `chat-msg ${sender}`;
      if (htmlContent) {
        msg.innerHTML = htmlContent;
      } else {
        msg.textContent = text;
      }
      messagesDiv.appendChild(msg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      return msg;
    }

    function showTypingIndicator() {
      const ind = document.createElement('div');
      ind.className = 'chat-msg bot chat-typing-indicator';
      ind.innerHTML = '<span></span><span></span><span></span>';
      messagesDiv.appendChild(ind);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      return ind;
    }

    function generateBotResponse(userText) {
      const query = userText.toLowerCase().trim();
      let replyText = '';
      let matchedProducts = [];

      // Keyword lists
      const isCalm = /calm|sleep|relax|lavender|sooth|rest/i.test(query);
      const isWoody = /wood|leather|sandal|study|library|dark|fig|cedar|spice|smoke|fire/i.test(query);
      const isFresh = /fresh|clean|grass|mint|ocean|sea|mineral|sage|spa|bath|morning/i.test(query);
      const isSweet = /sweet|vanilla|cozy|warm|honey|winter/i.test(query);
      const isBest = /best|popular|top|selling/i.test(query);
      const isGreeting = /hi|hello|hey|greetings/i.test(query);

      if (isCalm) {
        replyText = "Here is our most relaxing scent blend, perfect for bedtime rituals:";
        matchedProducts = PRODUCTS_DATA.filter(p => p.id === 'lavender-wild-honey');
      } else if (isWoody) {
        replyText = "I highly recommend these grounding, woody, and spiced fragrances:";
        matchedProducts = PRODUCTS_DATA.filter(p => ['tuscan-leather', 'midnight-fig', 'spiced-cedar'].includes(p.id));
      } else if (isFresh) {
        replyText = "These crisp, green, and ocean-fresh blends are perfect to revitalize your space:";
        matchedProducts = PRODUCTS_DATA.filter(p => ['sea-salt-sage', 'spring-meadow', 'eucalyptus-mint'].includes(p.id));
      } else if (isSweet) {
        replyText = "For something warm, sweet, and comforting, look no further than these:";
        matchedProducts = PRODUCTS_DATA.filter(p => ['smoked-vanilla', 'lavender-wild-honey'].includes(p.id));
      } else if (isBest) {
        replyText = "These are our current top-selling artisanal candles that customers love:";
        matchedProducts = PRODUCTS_DATA.filter(p => p.badge === 'Best Seller');
      } else if (isGreeting) {
        replyText = "Hello! Scent is a journey. Let me know what fragrance family (floral, woody, fresh) or mood you want, and I'll find your perfect match!";
      } else {
        replyText = "I couldn't find a direct match, but try typing 'woody', 'calming', 'fresh', or check out some of our best sellers:";
        matchedProducts = PRODUCTS_DATA.filter(p => p.badge === 'Best Seller');
      }

      // Append bot text message
      appendMessage(replyText, 'bot');

      // Append product card suggestions
      if (matchedProducts.length > 0) {
        matchedProducts.forEach(product => {
          const cardHtml = `
            <div class="chat-suggest-thumb">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="chat-suggest-info">
              <h6>${product.name}</h6>
              <span class="chat-suggest-scent">${product.scent}</span>
              <div class="chat-suggest-price">$${product.price.toFixed(2)}</div>
            </div>
            <div class="chat-suggest-actions">
              <a href="product.html?id=${product.id}" class="btn btn-sm btn-vesper-outline" style="text-decoration: none;"><span>Details</span></a>
              <button class="btn btn-sm btn-vesper btn-chat-add-to-cart" data-id="${product.id}"><span>Buy</span></button>
            </div>
          `;
          
          const cardContainer = document.createElement('div');
          cardContainer.className = 'chat-suggest-card';
          cardContainer.innerHTML = cardHtml;
          messagesDiv.appendChild(cardContainer);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }
    }
  }

  // ============================================
  // SCENT SIGNATURE QUIZ SYSTEM
  // ============================================
  const QUIZ_QUESTIONS = [
    {
      title: "What is your ideal atmosphere?",
      options: [
        { text: "A quiet cabin in the pines", family: "woody" },
        { text: "A fresh seaside cliff at dawn", family: "fresh" },
        { text: "A warm, sun-drenched meadow", family: "floral" },
        { text: "A cozy library with a crackling fire", family: "amber" }
      ]
    },
    {
      title: "Which fragrance notes draw you in most?",
      options: [
        { text: "Rich cedar, oakwood, and sandalwood", family: "woody" },
        { text: "Clean ozone, sea salt, and wild mint", family: "fresh" },
        { text: "Sweet honey, lavender, and soft botanicals", family: "floral" },
        { text: "Smoky vanilla, amber, and dark fig", family: "amber" }
      ]
    },
    {
      title: "How do you wish to feel in your space?",
      options: [
        { text: "Grounded, focused, and centered", family: "woody" },
        { text: "Refreshed, clear, and energized", family: "fresh" },
        { text: "Soothed, calm, and relaxed", family: "floral" },
        { text: "Comforted, warm, and cocooned", family: "amber" }
      ]
    }
  ];

  let currentQuizStep = 0;
  let quizAnswers = [];

  window.startScentQuiz = function() {
    const introState = document.getElementById('quiz-intro-state');
    const questionState = document.getElementById('quiz-question-state');
    const resultState = document.getElementById('quiz-result-state');
    
    if (introState) introState.style.display = 'none';
    if (resultState) resultState.style.display = 'none';
    if (questionState) questionState.style.display = 'block';
    
    currentQuizStep = 0;
    quizAnswers = [];
    renderQuizQuestion();
  };

  function renderQuizQuestion() {
    const questionTitle = document.getElementById('quizQuestionTitle');
    const stepCount = document.getElementById('quizStepCount');
    const progressBar = document.getElementById('quizProgressBar');
    const optionsContainer = document.getElementById('quizOptionsContainer');
    
    if (!questionTitle || !optionsContainer) return;
    
    const currentQuestion = QUIZ_QUESTIONS[currentQuizStep];
    questionTitle.textContent = currentQuestion.title;
    
    if (stepCount) {
      stepCount.textContent = `Question ${currentQuizStep + 1} of ${QUIZ_QUESTIONS.length}`;
    }
    
    if (progressBar) {
      const progress = ((currentQuizStep + 1) / QUIZ_QUESTIONS.length) * 100;
      progressBar.style.width = `${progress}%`;
    }
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${option.text}</span>`;
      btn.addEventListener('click', () => {
        quizAnswers.push(option.family);
        currentQuizStep++;
        if (currentQuizStep < QUIZ_QUESTIONS.length) {
          renderQuizQuestion();
        } else {
          showQuizResult();
        }
      });
      optionsContainer.appendChild(btn);
    });
  }

  function showQuizResult() {
    const questionState = document.getElementById('quiz-question-state');
    const resultState = document.getElementById('quiz-result-state');
    
    if (questionState) questionState.style.display = 'none';
    if (resultState) resultState.style.display = 'block';
    
    // Count occurrences of each family
    const counts = {};
    let maxFamily = 'woody';
    let maxCount = 0;
    
    quizAnswers.forEach(family => {
      counts[family] = (counts[family] || 0) + 1;
      if (counts[family] > maxCount) {
        maxCount = counts[family];
        maxFamily = family;
      }
    });
    
    // Map family to products
    const productMapping = {
      'woody': 'tuscan-leather',
      'fresh': 'spring-meadow',
      'floral': 'lavender-wild-honey',
      'amber': 'midnight-fig'
    };
    
    const recommendedId = productMapping[maxFamily] || 'tuscan-leather';
    const product = PRODUCTS_DATA.find(p => p.id === recommendedId) || PRODUCTS_DATA[0];
    
    const resultImg = document.getElementById('quizResultImg');
    const resultTitle = document.getElementById('quizResultTitle');
    const resultScent = document.getElementById('quizResultScent');
    const resultDesc = document.getElementById('quizResultDesc');
    const resultShopLink = document.getElementById('quizResultShopLink');
    
    if (product) {
      if (resultImg) resultImg.src = product.image;
      if (resultTitle) resultTitle.textContent = product.name;
      if (resultScent) resultScent.textContent = product.scent;
      if (resultDesc) resultDesc.textContent = product.description;
      if (resultShopLink) resultShopLink.href = `product.html?id=${product.id}`;
    }
  }

  window.resetScentQuiz = function() {
    const introState = document.getElementById('quiz-intro-state');
    const questionState = document.getElementById('quiz-question-state');
    const resultState = document.getElementById('quiz-result-state');
    
    if (introState) introState.style.display = 'block';
    if (questionState) questionState.style.display = 'none';
    if (resultState) resultState.style.display = 'none';
  };

  // Bind Quiz buttons if they exist
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', window.startScentQuiz);
  }
  const restartQuizBtn = document.getElementById('restartQuizBtn');
  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', window.resetScentQuiz);
  }


  // ============================================
  // RECENTLY VIEWED SYSTEM
  // ============================================
  window.trackRecentlyViewed = function(productId) {
    if (!productId) return;
    let viewed = JSON.parse(localStorage.getItem('vesperRecentlyViewed') || '[]');
    viewed = viewed.filter(id => id !== productId);
    viewed.unshift(productId);
    if (viewed.length > 4) {
      viewed = viewed.slice(0, 4);
    }
    localStorage.setItem('vesperRecentlyViewed', JSON.stringify(viewed));
    
    // Auto-render if recentlyViewedSection exists on the page to show immediate updates
    if (document.getElementById('recentlyViewedSection') && typeof window.renderRecentlyViewed === 'function') {
      window.renderRecentlyViewed();
    }
  };

  window.renderRecentlyViewed = function() {
    const section = document.getElementById('recentlyViewedSection');
    const grid = document.getElementById('recentlyViewedGrid');
    const divider = document.getElementById('recentlyViewedDivider');
    
    if (!section || !grid) return;
    
    const viewedIds = JSON.parse(localStorage.getItem('vesperRecentlyViewed') || '[]');
    if (viewedIds.length === 0) {
      section.style.display = 'none';
      if (divider) divider.style.display = 'none';
      return;
    }
    
    const products = viewedIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
    if (products.length === 0) {
      section.style.display = 'none';
      if (divider) divider.style.display = 'none';
      return;
    }
    
    section.style.display = 'block';
    if (divider) divider.style.display = 'block';
    
    grid.innerHTML = products.map(p => `
      <div class="col-6 col-md-3 reveal">
        <div class="product-card" onclick="window.location='product.html?id=${p.id}'">
          <div class="product-card-image">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="product-card-overlay">
              <div class="d-flex flex-column gap-2 w-100 px-3">
                <button class="quick-view-btn" onclick="event.stopPropagation(); openQuickView('${p.id}');">Quick View</button>
                <button class="quick-add-btn" onclick="event.stopPropagation(); addToCart('${p.id}');">Quick Add</button>
              </div>
            </div>
          </div>
          <h4>${p.name}</h4>
          <p class="product-scent">${p.scent}</p>
          <div class="product-card-rating mb-1 text-warning" style="font-size: 0.75rem;">
            ${'<i class="bi bi-star-fill"></i>'.repeat(Math.round(p.rating))}
            ${'<i class="bi bi-star"></i>'.repeat(5 - Math.round(p.rating))}
          </div>
          <div class="product-card-review-link mb-2">
            <a href="product.html?id=${p.id}#reviewsList" onclick="event.stopPropagation();">(${p.reviews ? p.reviews.length + 248 : 250}+ reviews)</a>
          </div>
          <p class="product-price">$${p.price.toFixed(2)}</p>
          <div class="product-features-mini">
            <span><i class="bi bi-fire"></i> ${p.burnTime || 55}h Burn</span>
            <span><i class="bi bi-leaf"></i> 100% Soy</span>
            <span><i class="bi bi-hand-index-thumb"></i> Hand Poured</span>
          </div>
        </div>
      </div>
    `).join('');
    
    // Inject heart icons
    if (window.updateHeartButtons) {
      window.updateHeartButtons();
    }

    // Observe dynamic scroll-reveal elements so they fade in/reveal properly
    if (typeof revealObserver !== 'undefined' && revealObserver) {
      grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }
  };


  // ============================================
  // QUICK VIEW SYSTEM
  // ============================================
  window.openQuickView = function(productId) {
    if (!productId) return;
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    
    // Track in recently viewed
    window.trackRecentlyViewed(productId);
    
    const imgEl = document.getElementById('quickViewImg');
    const titleEl = document.getElementById('quickViewTitle');
    const scentEl = document.getElementById('quickViewScent');
    const badgeEl = document.getElementById('quickViewBadge');
    const starsEl = document.getElementById('quickViewStars');
    const reviewsEl = document.getElementById('quickViewReviews');
    const priceEl = document.getElementById('quickViewPrice');
    const descEl = document.getElementById('quickViewDesc');
    const burnTimeEl = document.getElementById('quickViewBurnTime');
    const topNotesEl = document.getElementById('quickViewTopNotes');
    const heartNotesEl = document.getElementById('quickViewHeartNotes');
    const baseNotesEl = document.getElementById('quickViewBaseNotes');
    const addBtn = document.getElementById('quickViewAddBtn');
    const detailsLink = document.getElementById('quickViewDetailsLink');
    
    if (imgEl) {
      imgEl.src = product.image;
      imgEl.alt = product.name;
    }
    if (titleEl) titleEl.textContent = product.name;
    if (scentEl) scentEl.textContent = product.scent;
    
    if (badgeEl) {
      if (product.badge) {
        badgeEl.textContent = product.badge;
        badgeEl.style.display = 'inline-block';
      } else {
        badgeEl.style.display = 'none';
      }
    }
    
    if (starsEl) {
      const rating = Math.round(product.rating || 5);
      starsEl.innerHTML = '<i class="bi bi-star-fill"></i>'.repeat(rating) + '<i class="bi bi-star"></i>'.repeat(5 - rating);
    }
    
    if (reviewsEl) {
      reviewsEl.textContent = `(${product.reviews ? product.reviews.length + 248 : 250}+ reviews)`;
    }
    
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
    if (descEl) descEl.textContent = product.description;
    if (burnTimeEl) burnTimeEl.textContent = `${product.burnTime || 55}h`;
    
    if (product.notes) {
      if (topNotesEl) topNotesEl.textContent = product.notes.top || '—';
      if (heartNotesEl) heartNotesEl.textContent = product.notes.heart || '—';
      if (baseNotesEl) baseNotesEl.textContent = product.notes.base || '—';
    } else {
      if (topNotesEl) topNotesEl.textContent = '—';
      if (heartNotesEl) heartNotesEl.textContent = '—';
      if (baseNotesEl) baseNotesEl.textContent = '—';
    }
    
    if (addBtn) {
      // Clear previous listeners by replacing the element
      const newAddBtn = addBtn.cloneNode(true);
      addBtn.parentNode.replaceChild(newAddBtn, addBtn);
      newAddBtn.addEventListener('click', () => {
        addToCart(product.id);
        const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
        if (modal) modal.hide();
      });
    }
    
    if (detailsLink) {
      detailsLink.href = `product.html?id=${product.id}`;
    }
    
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('quickViewModal'));
    if (modal) modal.show();
  };

  // Trigger trackRecentlyViewed if we are on a product page
  const isProductPageDetail = window.location.pathname.includes('product.html');
  if (isProductPageDetail) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'lavender-wild-honey';
    window.trackRecentlyViewed(productId);
  }

  // Trigger renderRecentlyViewed if the section is present in the DOM
  setTimeout(() => {
    if (typeof window.renderRecentlyViewed === 'function') {
      window.renderRecentlyViewed();
    }
  }, 500);

  // Initialize Aura Assistant
  initAuraChatbot();
});
