/* ============================================
   VESPER & VINE - Luxury Orders Tab Controller
   ============================================ */

let cachedOrders = [];
let activeStatusFilter = 'all';

/**
 * Format order status badge with luxury symbols and design
 * @param {string} status 
 * @returns {string}
 */
function getStatusBadge(status) {
  const cleanStatus = (status || 'processing').toLowerCase();
  let label = 'Processing';
  let icon = '✦';
  
  if (cleanStatus === 'shipped') {
    label = 'In Transit';
    icon = '→';
  } else if (cleanStatus === 'delivered') {
    label = 'Delivered';
    icon = '✓';
  } else if (cleanStatus === 'cancelled') {
    label = 'Cancelled';
    icon = '✕';
  }
  
  return `
    <span class="badge-vesper-status-luxury ${cleanStatus}">
      <span class="badge-icon">${icon}</span>
      <span class="badge-label">${label}</span>
    </span>
  `;
}

/**
 * Calculate the timeline progress bar fill width percentage
 * @param {string} status 
 * @returns {string}
 */
function getTimelineProgressWidth(status) {
  const s = (status || 'processing').toLowerCase();
  if (s === 'shipped') return '65%';
  if (s === 'delivered') return '100%';
  if (s === 'cancelled') return '0%';
  return '25%'; // processing
}

/**
 * Open luxury shipment tracking modal with dynamic parcel location and logs
 * @param {object} o order object
 */
function showTrackingDetails(o) {
  const modalBody = document.getElementById('trackingModalBody');
  if (!modalBody) return;

  const cleanStatus = (o.status || 'processing').toLowerCase();
  
  // Calculate delivery date + 4 days
  let estArrivalText = 'Arriving soon';
  try {
    const orderDateObj = new Date(o.date);
    if (!isNaN(orderDateObj.getTime())) {
      orderDateObj.setDate(orderDateObj.getDate() + 4);
      estArrivalText = `Arriving ${orderDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
  } catch (e) {
    console.warn('Date parsing failed:', e);
  }

  let trackingContent = '';
  
  if (cleanStatus === 'delivered') {
    trackingContent = `
      <!-- Location Title Header -->
      <div class="tracking-summary-luxury mb-4">
        <div class="tracking-summary-status delivered">
          <i class="bi bi-check-circle-fill status-main-icon"></i>
          <div>
            <div class="tracking-status-title">Parcel Delivered Successfully</div>
            <div class="tracking-status-desc">Signed by Flora Merrit at Front Door • Arrived on ${o.date}</div>
          </div>
        </div>
      </div>
      
      <!-- Luxury Route Map -->
      <div class="tracking-route-map mb-4">
        <div class="route-map-container">
          <div class="map-connection-line solid"></div>
          <div class="map-node start done" data-label="Charleston Scent Atelier">
            <div class="node-dot"><i class="bi bi-shop"></i></div>
          </div>
          <div class="map-node center done" data-label="DHL Sorting Facility (Atlanta, GA)">
            <div class="node-dot"><i class="bi bi-truck"></i></div>
          </div>
          <div class="map-node end done active" data-label="Your Sanctuary (Charleston, SC)">
            <div class="node-dot"><i class="bi bi-house-heart"></i></div>
          </div>
        </div>
      </div>
      
      <!-- Detailed Activity Log -->
      <h6 class="timeline-log-title mb-3">Shipment Progress Logs</h6>
      <div class="tracking-logs-timeline">
        <div class="log-row active">
          <span class="log-time">${o.date}, 02:45 PM</span>
          <span class="log-details">
            <strong>Delivered</strong>
            <span class="log-loc">Charleston, SC 29401 — Package placed at front door. Signature: Flora Merrit.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">${o.date}, 09:15 AM</span>
          <span class="log-details">
            <strong>Out for Delivery</strong>
            <span class="log-loc">Charleston Regional Facility — Parcel out with local courier.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 09, 2026, 11:30 PM</span>
          <span class="log-details">
            <strong>Arrival Scan</strong>
            <span class="log-loc">Charleston Sorting Facility — Package arrived at delivery station.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 08, 2026, 04:10 PM</span>
          <span class="log-details">
            <strong>In Transit / Hub Departed</strong>
            <span class="log-loc">Atlanta Distribution Center, GA — Dispatched from regional hub.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 07, 2026, 10:00 AM</span>
          <span class="log-details">
            <strong>Carrier Picked Up</strong>
            <span class="log-loc">Charleston Scent Atelier — Scent creations collected by DHL Express.</span>
          </span>
        </div>
      </div>
    `;
  } else if (cleanStatus === 'shipped') {
    trackingContent = `
      <!-- Location Title Header -->
      <div class="tracking-summary-luxury mb-4">
        <div class="tracking-summary-status shipped">
          <i class="bi bi-arrow-right-circle-fill status-main-icon pulsing"></i>
          <div>
            <div class="tracking-status-title">In Transit — ${estArrivalText}</div>
            <div class="tracking-status-desc">Currently processing at the Logistics Distribution Hub in Atlanta, GA.</div>
          </div>
        </div>
      </div>
      
      <!-- Luxury Route Map -->
      <div class="tracking-route-map mb-4">
        <div class="route-map-container">
          <div class="map-connection-line partial-shipped"></div>
          <div class="map-node start done" data-label="Charleston Scent Atelier">
            <div class="node-dot"><i class="bi bi-shop"></i></div>
          </div>
          <div class="map-node center active" data-label="DHL Sorting Facility (Atlanta, GA)">
            <div class="node-dot"><i class="bi bi-truck"></i><span class="ping-ring"></span></div>
          </div>
          <div class="map-node end" data-label="Your Sanctuary (Charleston, SC)">
            <div class="node-dot"><i class="bi bi-house-heart"></i></div>
          </div>
        </div>
      </div>
      
      <!-- Detailed Activity Log -->
      <h6 class="timeline-log-title mb-3">Shipment Progress Logs</h6>
      <div class="tracking-logs-timeline">
        <div class="log-row active">
          <span class="log-time">Jun 15, 2026, 10:30 PM</span>
          <span class="log-details">
            <strong>Departed Sort Facility</strong>
            <span class="log-loc">Atlanta Distribution Hub, GA — En route to local Charleston station.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 15, 2026, 08:00 AM</span>
          <span class="log-details">
            <strong>Arrival Scan</strong>
            <span class="log-loc">Atlanta Distribution Hub, GA — Scent package scanned at regional sorting center.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 14, 2026, 03:20 PM</span>
          <span class="log-details">
            <strong>Carrier Picked Up</strong>
            <span class="log-loc">Charleston Scent Atelier — Collected and sorted at local depot.</span>
          </span>
        </div>
      </div>
    `;
  } else {
    // Processing / Formulation
    trackingContent = `
      <!-- Location Title Header -->
      <div class="tracking-summary-luxury mb-4">
        <div class="tracking-summary-status processing">
          <i class="bi bi-stars status-main-icon pulsing"></i>
          <div>
            <div class="tracking-status-title">Hand-Pouring Scent Request</div>
            <div class="tracking-status-desc">Your custom creation is being prepared. Formulation completed, awaiting carrier pickup.</div>
          </div>
        </div>
      </div>
      
      <!-- Luxury Route Map -->
      <div class="tracking-route-map mb-4">
        <div class="route-map-container">
          <div class="map-connection-line partial-processing"></div>
          <div class="map-node start active" data-label="Charleston Scent Atelier">
            <div class="node-dot"><i class="bi bi-shop"></i><span class="ping-ring"></span></div>
          </div>
          <div class="map-node center" data-label="DHL Sorting Facility (Atlanta, GA)">
            <div class="node-dot"><i class="bi bi-truck"></i></div>
          </div>
          <div class="map-node end" data-label="Your Sanctuary (Charleston, SC)">
            <div class="node-dot"><i class="bi bi-house-heart"></i></div>
          </div>
        </div>
      </div>
      
      <!-- Detailed Activity Log -->
      <h6 class="timeline-log-title mb-3">Shipment Progress Logs</h6>
      <div class="tracking-logs-timeline">
        <div class="log-row active">
          <span class="log-time">Jun 16, 2026, 09:00 AM</span>
          <span class="log-details">
            <strong>Formulation Completed</strong>
            <span class="log-loc">Charleston Scent Atelier — Soy wax poured and curing finalized. Scent profile approved.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 15, 2026, 06:15 PM</span>
          <span class="log-details">
            <strong>Ritual Packaging Completed</strong>
            <span class="log-loc">Charleston Scent Atelier — Placed in bespoke cotton wrap and signed batch label applied.</span>
          </span>
        </div>
        <div class="log-row">
          <span class="log-time">Jun 15, 2026, 02:00 PM</span>
          <span class="log-details">
            <strong>Order Placed & Confirmed</strong>
            <span class="log-loc">Charleston Scent Atelier — Scent portal payment verified. Batch allocation locked.</span>
          </span>
        </div>
      </div>
    `;
  }

  modalBody.innerHTML = trackingContent;

  // Display Bootstrap Modal safely
  const modalEl = document.getElementById('trackingModal');
  if (modalEl && window.bootstrap) {
    const bootstrapModal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    bootstrapModal.show();
  }
}

/**
 * Update the Order summary stats at the top dynamically
 * @param {array} orders 
 */
function updateOrderStats(orders) {
  const totalOrdersEl = document.getElementById('statTotalOrders');
  const lifetimeSpendEl = document.getElementById('statLifetimeSpend');
  const inProgressEl = document.getElementById('statInProgress');

  if (!orders) return;

  const totalCount = orders.length;
  const totalSpend = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const inProgressCount = orders.filter(o => {
    const status = (o.status || 'processing').toLowerCase();
    return status === 'processing' || status === 'shipped';
  }).length;

  if (totalOrdersEl) {
    totalOrdersEl.innerHTML = `<span class="stat-number-value">${totalCount}</span> <span class="stat-number-unit">${totalCount === 1 ? 'Order' : 'Orders'}</span>`;
  }
  if (lifetimeSpendEl) {
    lifetimeSpendEl.textContent = `$${Math.round(totalSpend)}`;
  }
  if (inProgressEl) {
    inProgressEl.innerHTML = `<span class="stat-number-value">${inProgressCount}</span> <span class="stat-number-unit">${inProgressCount === 1 ? 'Journey' : 'Journeys'} Active</span>`;
  }
}

/**
 * Render orders list dynamically in luxury grid design
 * @param {array} orders 
 */
export function renderOrders(orders) {
  const fullList = document.getElementById('fullOrdersList');
  if (!fullList) return;

  if (orders.length === 0) {
    fullList.innerHTML = `
      <div class="empty-state-card reveal">
        <i class="bi bi-box empty-state-icon"></i>
        <h4 style="font-family: var(--ff-heading); font-weight: 400; margin-bottom: 0.5rem;">No orders found</h4>
        <p class="text-muted mb-4" style="font-size: 0.85rem;">We couldn't find any orders matching your criteria.</p>
        <a href="shop.html" class="btn-vesper" style="display: inline-block; text-decoration: none;">
          <span>Explore Scent Collections</span>
        </a>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  orders.forEach((o) => {
    const card = document.createElement('div');
    card.className = 'order-card-luxury reveal';
    
    // Sum quantities
    const totalQty = o.items.reduce((sum, item) => sum + item.qty, 0);
    const subtotalText = `$${o.total.toFixed(2)}`;

    // Build items HTML list
    const itemsHtml = o.items.map(item => {
      const primaryScent = item.scent || 'Artisanal Blend';
      const imagePath = item.image || 'images/candle_lavender.png';
      
      // Split scent notes dynamically for beautiful text formatting
      const scentParts = primaryScent.split(/[&,]/).map(s => s.trim());
      const scentHtml = scentParts.map(sp => `<span class="scent-note-tag">${sp}</span>`).join('<span class="scent-dot">•</span>');

      return `
        <div class="order-product-hero-row">
          <div class="order-product-image-container">
            <img class="order-product-image" src="${imagePath}" alt="${item.name}" loading="lazy">
          </div>
          <div class="order-product-details">
            <h4 class="order-product-title">${item.name}</h4>
            <div class="order-product-scent">
              ${scentHtml}
            </div>
            <div class="order-product-meta">
              <span class="order-product-qty">Qty ${item.qty}</span>
              <span class="order-product-divider">|</span>
              <span class="order-product-price">$${item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Status timeline mapping
    const cleanStatus = (o.status || 'processing').toLowerCase();
    const statusIndexMap = {
      'processing': 1,
      'shipped': 2,
      'delivered': 3,
      'cancelled': 0
    };
    const statusIndex = statusIndexMap[cleanStatus] || 1;
    const progressWidth = getTimelineProgressWidth(cleanStatus);
    
    // Estimate delivery arrival (date + 4 days)
    let estArrivalText = 'Arriving soon';
    try {
      const orderDateObj = new Date(o.date);
      if (!isNaN(orderDateObj.getTime())) {
        orderDateObj.setDate(orderDateObj.getDate() + 4);
        estArrivalText = `Arriving ${orderDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
      }
    } catch (e) {
      console.warn('Error formatting date:', e);
    }

    // Points calculation (10% of total)
    const pointsEarned = Math.round(o.total * 0.1);

    card.innerHTML = `
      <!-- Card Header -->
      <div class="order-card-meta-header">
        <div class="meta-left">
          <span class="order-number-title">Order #${o.orderId}</span>
          <span class="order-date-text">${o.date}</span>
        </div>
        <div class="meta-right">
          ${getStatusBadge(o.status)}
        </div>
      </div>

      <div class="order-card-content">
        <!-- Products Column (Hero layout) -->
        <div class="order-products-section">
          ${itemsHtml}
        </div>

        <!-- Progress Timeline & Details Column -->
        <div class="order-status-timeline-section">
          <div class="order-delivery-status-info">
            <span class="info-label">${cleanStatus === 'delivered' ? 'Completed Journey' : (cleanStatus === 'cancelled' ? 'Status' : 'Estimated Arrival')}</span>
            <span class="info-value ${cleanStatus === 'cancelled' ? 'cancelled' : ''}">${cleanStatus === 'delivered' ? `Arrived ${o.date}` : (cleanStatus === 'cancelled' ? 'Cancelled' : estArrivalText)}</span>
          </div>

          <!-- Custom visual timeline bar -->
          ${cleanStatus !== 'cancelled' ? `
          <div class="order-timeline-track">
            <div class="timeline-bar">
              <div class="timeline-bar-fill ${cleanStatus}" style="width: ${progressWidth};"></div>
            </div>
            <div class="timeline-steps">
              <div class="timeline-step active">
                <span class="step-indicator"></span>
                <span class="step-name">Placed</span>
              </div>
              <div class="timeline-step ${statusIndex >= 1 ? 'active' : ''} ${cleanStatus === 'processing' ? 'pulsing' : ''}">
                <span class="step-indicator"></span>
                <span class="step-name">Processing</span>
              </div>
              <div class="timeline-step ${statusIndex >= 2 ? 'active' : ''} ${cleanStatus === 'shipped' ? 'pulsing' : ''}">
                <span class="step-indicator"></span>
                <span class="step-name">In Transit</span>
              </div>
              <div class="timeline-step ${statusIndex >= 3 ? 'active' : ''}">
                <span class="step-indicator"></span>
                <span class="step-name">Delivered</span>
              </div>
            </div>
          </div>
          ` : `
          <div class="order-cancelled-notice">
            <i class="bi bi-x-circle-fill"></i>
            <span>This order was cancelled and fully refunded to your original payment method.</span>
          </div>
          `}

          <!-- Footer highlights -->
          <div class="order-card-footer-highlights">
            <div class="highlight-item reward-points">
              <i class="bi bi-stars"></i>
              <span>+${pointsEarned} Scent Points Earned</span>
            </div>
            ${cleanStatus === 'delivered' ? `
            <div class="highlight-item refill-suggestion">
              <i class="bi bi-hourglass-split"></i>
              <span>You may need a refill soon</span>
            </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Actions bar at the bottom -->
      <div class="order-card-actions-bar">
        <div class="order-value-label">
          <span class="val-lbl">Total Value</span>
          <span class="val-price">${subtotalText}</span>
          <span class="val-qty">(${totalQty} ${totalQty === 1 ? 'item' : 'items'})</span>
        </div>
        
        <div class="order-actions-links">
          ${cleanStatus !== 'cancelled' ? `
          <a href="#" class="btn-track-package action-link-luxury" data-id="${o.orderId}" aria-label="Track package ${o.orderId}">
            <span>Track</span> <i class="bi bi-arrow-right-short link-arrow"></i>
          </a>
          ` : ''}
          <a href="#" class="btn-invoice action-link-luxury" data-id="${o.orderId}" aria-label="Download invoice ${o.orderId}">
            <span>Invoice</span> <i class="bi bi-arrow-right-short link-arrow"></i>
          </a>
          <a href="#" class="btn-buy-again action-link-luxury" data-id="${o.orderId}" aria-label="Reorder candle ${o.orderId}">
            <span>Reorder</span> <i class="bi bi-arrow-right-short link-arrow"></i>
          </a>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  fullList.innerHTML = '';
  fullList.appendChild(fragment);
  
  // Re-trigger visual animations
  setTimeout(() => {
    fullList.querySelectorAll('.reveal').forEach((el, index) => {
      setTimeout(() => el.classList.add('revealed'), index * 80);
    });
  }, 30);
}

/**
 * Handle filtering and search matching
 */
function applyFilters() {
  const query = document.getElementById('ordersSearchInput')?.value.trim().toLowerCase() || '';

  let results = [...cachedOrders];

  // 1. Text Search Filter (match orderId or item names or scent names)
  if (query) {
    results = results.filter(o => {
      const matchId = o.orderId.toLowerCase().includes(query);
      const matchItems = o.items.some(item => 
        item.name.toLowerCase().includes(query) || 
        (item.scent && item.scent.toLowerCase().includes(query))
      );
      return matchId || matchItems;
    });
  }

  // 2. Pill Filter logic
  if (activeStatusFilter !== 'all') {
    results = results.filter(o => (o.status || 'processing').toLowerCase() === activeStatusFilter.toLowerCase());
  }

  // Always sort newest orders first in a premium portal
  results.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderOrders(results);
}

/**
 * Setup order filters, search inputs, and dynamic action buttons
 * @param {array} orders 
 */
export function initOrdersSection(orders) {
  cachedOrders = orders || [];
  
  const searchInput = document.getElementById('ordersSearchInput');
  const statusPillsContainer = document.getElementById('ordersStatusPills');
  const ordersContainer = document.getElementById('fullOrdersList');

  // Debouncing search updates for better scrolling experience
  let debounceTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(applyFilters, 200);
    });
  }

  // Handle Pill clicks
  if (statusPillsContainer) {
    // Reset all status pills to active state 'all' on init
    statusPillsContainer.querySelectorAll('.filter-pill').forEach(btn => {
      if (btn.dataset.value === 'all') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    activeStatusFilter = 'all';

    statusPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      
      statusPillsContainer.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.remove('active');
      });
      pill.classList.add('active');
      
      activeStatusFilter = pill.dataset.value;
      applyFilters();
    });
  }

  // Dynamic calculations for the top statistics cards (overall profile level)
  updateOrderStats(cachedOrders);

  // Bind order card actions using event delegation
  if (ordersContainer) {
    ordersContainer.addEventListener('click', (e) => {
      const trackBtn = e.target.closest('.btn-track-package');
      const invoiceBtn = e.target.closest('.btn-invoice');
      const buyAgainBtn = e.target.closest('.btn-buy-again');

      if (!trackBtn && !invoiceBtn && !buyAgainBtn) return;
      e.preventDefault();

      if (trackBtn) {
        const orderId = trackBtn.dataset.id;
        const targetOrder = cachedOrders.find(o => o.orderId === orderId);
        if (targetOrder) {
          showTrackingDetails(targetOrder);
        }
      } else if (invoiceBtn) {
        const orderId = invoiceBtn.dataset.id;
        const msg = `Invoice for order #${orderId} generated and download initiated.`;
        if (window.showToast) {
          window.showToast(msg);
        } else {
          alert(msg);
        }
      } else if (buyAgainBtn) {
        const orderId = buyAgainBtn.dataset.id;
        const targetOrder = cachedOrders.find(o => o.orderId === orderId);
        if (targetOrder && typeof window.addToCart === 'function') {
          targetOrder.items.forEach(item => {
            window.addToCart(item.id);
          });
          const msg = `Reordered ${targetOrder.items.length} items to shopping bag.`;
          if (window.showToast) {
            window.showToast(msg);
          } else {
            alert(msg);
          }
          // Notify cart changes
          document.dispatchEvent(new CustomEvent('vesper:cart-updated', { bubbles: true }));
        }
      }
    });
  }

  // Draw initial layout
  applyFilters();
}
