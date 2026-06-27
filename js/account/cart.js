/* ============================================
   VESPER & VINE - Cart Tab controller
   ============================================ */

/**
 * Render the Shopping Bag panel
 */
export function renderCartTab() {
  const cart = JSON.parse(localStorage.getItem('vesperCart') || '[]');
  const list = document.getElementById('profileCartList');
  const summary = document.getElementById('profileCartSummary');
  if (!list) return;

  // Empty state handling
  if (cart.length === 0) {
    list.innerHTML = `
      <div class="empty-state-card reveal">
        <i class="bi bi-bag empty-state-icon"></i>
        <h4 style="font-family: var(--ff-heading); font-weight: 400; margin-bottom: 0.5rem;">Your Shopping Bag is empty</h4>
        <p class="text-muted mb-4" style="font-size: 0.85rem;">Discover artisanal fragrances to elevate your daily ritual.</p>
        <a href="shop.html" class="btn-vesper" style="display: inline-block; text-decoration: none;">
          <span>Explore Scent Collection</span>
        </a>
      </div>
    `;
    if (summary) summary.style.display = 'none';
    return;
  }

  // Populate dynamic cart items using DocumentFragment for rendering efficiency
  const fragment = document.createDocumentFragment();
  
  cart.forEach((item, index) => {
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item py-3 d-flex align-items-center gap-3 border-bottom';
    itemRow.style.borderColor = 'var(--clr-border-light)';
    itemRow.innerHTML = `
      <div class="cart-item-img" style="cursor: pointer; width: 70px; height: 70px; border-radius: var(--radius-sm); overflow: hidden; background-color: var(--clr-bg-alt);">
        <img src="${item.image}" alt="${item.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="cart-item-info" style="flex: 1;">
        <h5 class="mb-1" style="font-size: 0.95rem; font-family: var(--ff-heading); cursor: pointer;">${item.name}</h5>
        <span class="cart-item-scent text-muted d-block mb-1" style="font-size: 0.75rem; font-style: italic;">${item.scent}</span>
        <div class="cart-item-price fw-500" style="font-size: 0.85rem;">$${item.price.toFixed(2)}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="quantity-selector d-flex align-items-center border rounded" style="border-color: var(--clr-border) !important; padding: 2px;">
          <button type="button" class="btn btn-sm px-2 py-0 border-0 btn-qty-dec" data-index="${index}" style="font-size: 0.85rem; background: none; color: var(--clr-text);"><i class="bi bi-minus"></i></button>
          <span class="px-2" style="font-size: 0.85rem; font-weight: 500; min-width: 20px; text-align: center;">${item.qty}</span>
          <button type="button" class="btn btn-sm px-2 py-0 border-0 btn-qty-inc" data-index="${index}" style="font-size: 0.85rem; background: none; color: var(--clr-text);"><i class="bi bi-plus"></i></button>
        </div>
        <button type="button" class="btn btn-sm p-1 border-0 btn-cart-remove" data-index="${index}" style="color: var(--clr-text-muted);" title="Remove">
          <i class="bi bi-trash3 fs-6"></i>
        </button>
      </div>
    `;

    // Navigate to product detail on photo/name clicks
    const goDetail = () => { window.location.href = `product.html?id=${item.id}`; };
    itemRow.querySelector('.cart-item-img').addEventListener('click', goDetail);
    itemRow.querySelector('.cart-item-info h5').addEventListener('click', goDetail);

    fragment.appendChild(itemRow);
  });

  list.innerHTML = '';
  list.appendChild(fragment);

  // Render totals summary section
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalPriceEl = document.getElementById('profileCartTotalPrice');
  if (totalPriceEl) totalPriceEl.textContent = `$${total.toFixed(2)}`;
  if (summary) summary.style.display = 'block';
}

/**
 * Setup event handlers and triggers
 */
export function initCartSection() {
  const list = document.getElementById('profileCartList');
  if (!list) return;

  // Use event delegation for quantity dec/inc and item deletes
  list.addEventListener('click', (e) => {
    const decBtn = e.target.closest('.btn-qty-dec');
    const incBtn = e.target.closest('.btn-qty-inc');
    const removeBtn = e.target.closest('.btn-cart-remove');

    if (!decBtn && !incBtn && !removeBtn) return;

    let cart = JSON.parse(localStorage.getItem('vesperCart') || '[]');
    
    if (decBtn) {
      const idx = parseInt(decBtn.dataset.index);
      if (cart[idx]) {
        cart[idx].qty--;
        if (cart[idx].qty <= 0) {
          cart.splice(idx, 1);
        }
      }
    } else if (incBtn) {
      const idx = parseInt(incBtn.dataset.index);
      if (cart[idx]) {
        cart[idx].qty++;
      }
    } else if (removeBtn) {
      const idx = parseInt(removeBtn.dataset.index);
      cart.splice(idx, 1);
    }

    localStorage.setItem('vesperCart', JSON.stringify(cart));
    
    // Dispatch custom events to keep other sections (like navbar icons and profile drawer) in sync
    const event = new CustomEvent('vesper:cart-updated', { bubbles: true });
    document.dispatchEvent(event);
  });

  // Listen for changes from other components (like navbar profile offcanvas additions)
  document.addEventListener('vesper:cart-updated', () => {
    renderCartTab();
  });
}
