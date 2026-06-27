/* ============================================
   VESPER & VINE - Wishlist Tab controller


 * Render wishlist items grid layout
 */
export function renderWishlistTab() {
  const wishlist = JSON.parse(localStorage.getItem('vesperWishlist') || '[]');
  const grid = document.getElementById('profileWishlistGrid');
  if (!grid) return;

  // Render empty state
  if (wishlist.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="empty-state-card reveal">
          <i class="bi bi-heart empty-state-icon"></i>
          <h4 style="font-family: var(--ff-heading); font-weight: 400; margin-bottom: 0.5rem;">Your Wishlist is empty</h4>
          <p class="text-muted mb-4" style="font-size: 0.85rem;">Save your favorite scents here to keep track of them.</p>
          <a href="shop.html" class="btn-vesper" style="display: inline-block; text-decoration: none;">
            <span>Explore Fragrance Scents</span>
          </a>
        </div>
      </div>
    `;
    return;
  }

  // Get current products catalog
  // main.js defines a global getProductsData function
  let products = [];
  if (typeof window.getProductsData === 'function') {
    products = window.getProductsData();
  } else {
    products = JSON.parse(localStorage.getItem('vesperProducts') || '[]');
  }

  const wishlistProducts = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);
  const fragment = document.createDocumentFragment();

  wishlistProducts.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 mb-4';
    
    // Draw product rating stars if available
    let starsHtml = '';
    const roundedRating = Math.round(p.rating || 5);
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<i class="bi ${i <= roundedRating ? 'bi-star-fill text-warning' : 'bi-star'}"></i>`;
    }

    col.innerHTML = `
      <div class="product-card" style="cursor: pointer;">
        <div class="product-card-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-card-overlay">
            <button class="quick-add-btn btn-wishlist-add-to-cart" data-id="${p.id}">Quick Add</button>
          </div>
          <button class="wishlist-remove-btn btn-wishlist-remove" data-id="${p.id}" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255, 255, 255, 0.9); border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08); color: var(--clr-accent); transition: all 0.2s ease;" title="Remove from Wishlist">
            <i class="bi bi-heart-fill"></i>
          </button>
        </div>
        <div class="mt-2">
          <div class="product-rating-stars mb-1" style="font-size: 0.72rem;">
            ${starsHtml} <span class="text-muted" style="font-size: 0.7rem;">(${p.reviews ? p.reviews.length : 1})</span>
          </div>
          <h4 style="font-family: var(--ff-heading); font-size: 1rem; font-weight: 500; margin-bottom: 2px;">${p.name}</h4>
          <p class="product-scent text-muted" style="font-size: 0.75rem; font-style: italic; margin-bottom: 4px;">${p.scent}</p>
          <p class="product-price fw-500" style="font-size: 0.85rem; color: var(--clr-accent);">$${p.price.toFixed(2)}</p>
        </div>
      </div>
    `;

    // Navigation on image or details click
    const goDetail = () => { window.location.href = `product.html?id=${p.id}`; };
    col.querySelector('.product-card-image img').addEventListener('click', goDetail);
    col.querySelector('h4').addEventListener('click', goDetail);

    // Bind remove button animation feedback
    const removeBtn = col.querySelector('.btn-wishlist-remove');
    removeBtn.addEventListener('mouseover', () => { removeBtn.style.transform = 'scale(1.1)'; });
    removeBtn.addEventListener('mouseout', () => { removeBtn.style.transform = 'scale(1)'; });

    fragment.appendChild(col);
  });

  grid.innerHTML = '';
  grid.appendChild(fragment);
}

/**
 * Initialize Wishlist action triggers
 */
export function initWishlistSection() {
  const grid = document.getElementById('profileWishlistGrid');
  if (!grid) return;

  // Bind cart convert and removal triggers via delegation
  grid.addEventListener('click', (e) => {
    const addToCartBtn = e.target.closest('.btn-wishlist-add-to-cart');
    const removeBtn = e.target.closest('.btn-wishlist-remove');

    if (!addToCartBtn && !removeBtn) return;

    let wishlist = JSON.parse(localStorage.getItem('vesperWishlist') || '[]');

    if (addToCartBtn) {
      e.stopPropagation();
      const productId = addToCartBtn.dataset.id;
      
      // Dispatch cart addition call via window.addToCart
      if (typeof window.addToCart === 'function') {
        window.addToCart(productId);
      }
      
      // Remove item from wishlist and notify changes
      const idx = wishlist.indexOf(productId);
      if (idx !== -1) {
        wishlist.splice(idx, 1);
        localStorage.setItem('vesperWishlist', JSON.stringify(wishlist));
        
        // Dispatch custom events for state sync
        document.dispatchEvent(new CustomEvent('vesper:wishlist-updated', { bubbles: true }));
        document.dispatchEvent(new CustomEvent('vesper:cart-updated', { bubbles: true }));
      }
    } else if (removeBtn) {
      e.stopPropagation();
      const productId = removeBtn.dataset.id;
      const idx = wishlist.indexOf(productId);
      if (idx !== -1) {
        wishlist.splice(idx, 1);
        localStorage.setItem('vesperWishlist', JSON.stringify(wishlist));
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('vesper:wishlist-updated', { bubbles: true }));
      }
    }
  });

  // Event listener for syncing wishlists modified externally (drawer)
  document.addEventListener('vesper:wishlist-updated', () => {
    renderWishlistTab();
  });
}
