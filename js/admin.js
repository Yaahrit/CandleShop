/* ============================================
   VESPER & VINE - Administrative Control Center Controller
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Authorize role on load
  const token = localStorage.getItem('vesperAuthToken');
  const currentUser = JSON.parse(localStorage.getItem('vesperUser') || '{}');
  
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  
  if (currentUser.role !== 'admin') {
    window.location.href = 'profile.html';
    return;
  }

  // Set welcome message
  const welcomeEl = document.getElementById('adminWelcomeName');
  if (welcomeEl) {
    welcomeEl.textContent = `Atelier Administrator: ${currentUser.firstName || ''} ${currentUser.lastName || 'Admin'}`;
  }

  // 2. Tab Navigation Orchestrator
  const navLinks = document.querySelectorAll('.admin-sidebar-nav a');
  const sections = document.querySelectorAll('.admin-panel-section');

  function showSection(hash) {
    const activeSectionId = hash.replace('#', 'panel-');
    sections.forEach(s => {
      s.style.display = s.id === activeSectionId ? 'block' : 'none';
    });

    navLinks.forEach(link => {
      const active = link.getAttribute('href') === hash;
      link.classList.toggle('active', active);
    });

    // Trigger tab-specific loaders
    if (hash === '#analytics') loadAnalytics();
    if (hash === '#catalog') loadCatalog();
    if (hash === '#orders') loadOrders();
    if (hash === '#customers') loadCustomers();
    if (hash === '#reviews') loadReviews();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href');
      window.location.hash = hash;
      showSection(hash);
    });
  });

  // Load default tab
  const initialHash = window.location.hash || '#analytics';
  window.location.hash = initialHash;
  showSection(initialHash);


  /* ============================================
     ANALYTICS & SALES CHART LOADER
     ============================================ */
  async function loadAnalytics() {
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to load analytics.');
      const data = await res.json();

      document.getElementById('statRevenue').textContent = `$${data.revenue.toFixed(2)}`;
      document.getElementById('statOrders').textContent = data.ordersCount;
      document.getElementById('statAov').textContent = `$${data.aov.toFixed(2)}`;

      drawSalesChart(data.dailySales);
    } catch (err) {
      console.error('Analytics loading failed:', err);
    }
  }

  function drawSalesChart(dailySales) {
    if (!dailySales || dailySales.length === 0) return;

    const chartPath = document.getElementById('chartPath');
    const chartArea = document.getElementById('chartArea');
    const labelsGroup = document.getElementById('chartLabels');
    const dotsGroup = document.getElementById('chartDots');
    
    if (!chartPath || !chartArea) return;

    // Standard dimensions of SVG viewport: 800 x 280
    const paddingLeft = 60;
    const paddingRight = 50;
    const chartWidth = 800 - paddingLeft - paddingRight;
    const chartHeight = 180;
    const baseY = 230; // Y coordinate for zero-value baseline

    // Compute max sales to calibrate Y scale
    const maxVal = Math.max(...dailySales.map(d => d.sales), 100);
    const yMaxLimit = maxVal * 1.2; // Add 20% breathing room

    const points = dailySales.map((d, i) => {
      const x = paddingLeft + (i * (chartWidth / (dailySales.length - 1)));
      const y = baseY - ((d.sales / yMaxLimit) * chartHeight);
      return { x, y, day: d.day, val: d.sales };
    });

    // Build Line Path Description
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    chartPath.setAttribute('d', pathD);

    // Build Area Path Description
    const areaD = `${pathD} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
    chartArea.setAttribute('d', areaD);

    // Draw Labels & Intersection dots
    labelsGroup.innerHTML = '';
    dotsGroup.innerHTML = '';

    points.forEach(p => {
      // Day label below chart
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', p.x);
      text.setAttribute('y', baseY + 20);
      text.setAttribute('fill', '#9c958f');
      text.setAttribute('font-size', '10');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = p.day;
      labelsGroup.appendChild(text);

      // Value tooltip label above dot
      const valText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valText.setAttribute('x', p.x);
      valText.setAttribute('y', p.y - 10);
      valText.setAttribute('fill', 'var(--clr-gold)');
      valText.setAttribute('font-size', '10');
      valText.setAttribute('font-weight', '500');
      valText.setAttribute('text-anchor', 'middle');
      valText.textContent = `$${Math.round(p.val)}`;
      labelsGroup.appendChild(valText);

      // Dot element
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', p.x);
      circle.setAttribute('cy', p.y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', '#ffffff');
      circle.setAttribute('stroke', 'var(--clr-gold)');
      circle.setAttribute('stroke-width', '2.5');
      dotsGroup.appendChild(circle);
    });
  }


  /* ============================================
     CATALOG MANAGEMENT (CRUD)
     ============================================ */
  let productsList = [];
  const modalEl = document.getElementById('productCrudModal');
  const crudModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const crudForm = document.getElementById('productCrudForm');

  async function loadCatalog() {
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      productsList = data.catalog || [];

      const body = document.getElementById('catalogTableBody');
      if (!body) return;

      body.innerHTML = productsList.map(p => `
        <tr>
          <td><img src="${p.image}" alt="${p.name}" width="50" height="50" style="object-fit: cover; border-radius: var(--radius-sm);"></td>
          <td><strong>${p.name}</strong></td>
          <td><span style="text-transform: capitalize; color: var(--clr-gold); font-size: 0.8rem;">${p.scentFamily}</span></td>
          <td>$${p.price.toFixed(2)}</td>
          <td>${p.burnTime || 55} hours</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-light me-1 btn-edit-product" data-id="${p.id}" style="font-size: 0.72rem; border-color: rgba(255,255,255,0.15);">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-danger btn-delete-product" data-id="${p.id}" style="font-size: 0.72rem;">
              <i class="bi bi-trash"></i> Delete
            </button>
          </td>
        </tr>
      `).join('');

      bindCatalogActions();
    } catch (err) {
      console.error('Catalog load failed:', err);
    }
  }

  function bindCatalogActions() {
    document.querySelectorAll('.btn-edit-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prod = productsList.find(p => p.id === id);
        if (!prod) return;

        document.getElementById('productModalTitle').textContent = 'Modify Product details';
        document.getElementById('crudProductId').value = prod.id;
        document.getElementById('crudProductName').value = prod.name;
        document.getElementById('crudProductScent').value = prod.scent;
        document.getElementById('crudProductPrice').value = prod.price;
        document.getElementById('crudProductBurn').value = prod.burnTime || 55;
        document.getElementById('crudProductFamily').value = prod.scentFamily || 'woody';
        document.getElementById('crudProductImg').value = prod.image;
        document.getElementById('crudProductDesc').value = prod.description;
        document.getElementById('crudNotesTop').value = prod.notes?.top || '';
        document.getElementById('crudNotesHeart').value = prod.notes?.heart || '';
        document.getElementById('crudNotesBase').value = prod.notes?.base || '';

        crudModal.show();
      });
    });

    document.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Are you sure you want to remove this scent from the catalog? This action cannot be undone.')) return;

        try {
          const res = await fetch('/api/admin/products', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId: id })
          });
          if (res.ok) {
            loadCatalog();
            if (window.showToast) window.showToast('Product successfully removed from catalog.');
          }
        } catch (err) {
          console.error('Product deletion failed:', err);
        }
      });
    });
  }

  // Trigger Add Scent modal
  const btnAddScent = document.getElementById('btnAdminAddProduct');
  if (btnAddScent) {
    btnAddScent.addEventListener('click', () => {
      document.getElementById('productModalTitle').textContent = 'Create Scent Product';
      crudForm.reset();
      document.getElementById('crudProductId').value = '';
      crudModal.show();
    });
  }

  // Form Submit Add / Update Product
  if (crudForm) {
    crudForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const productId = document.getElementById('crudProductId').value;
      const productData = {
        name: document.getElementById('crudProductName').value.trim(),
        scent: document.getElementById('crudProductScent').value.trim(),
        price: parseFloat(document.getElementById('crudProductPrice').value),
        burnTime: parseInt(document.getElementById('crudProductBurn').value),
        scentFamily: document.getElementById('crudProductFamily').value,
        image: document.getElementById('crudProductImg').value.trim(),
        description: document.getElementById('crudProductDesc').value.trim(),
        notes: {
          top: document.getElementById('crudNotesTop').value.trim(),
          heart: document.getElementById('crudNotesHeart').value.trim(),
          base: document.getElementById('crudNotesBase').value.trim()
        }
      };

      try {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: productId || null, productData })
        });
        if (res.ok) {
          crudModal.hide();
          loadCatalog();
          if (window.showToast) window.showToast('Atelier catalog saved successfully.');
        }
      } catch (err) {
        console.error('Product save failed:', err);
      }
    });
  }


  /* ============================================
     ORDERS MANAGER & INVOICES
     ============================================ */
  let ordersList = [];

  async function loadOrders() {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      ordersList = await res.json();

      const body = document.getElementById('ordersTableBody');
      if (!body) return;

      body.innerHTML = ordersList.map(o => {
        const statusVal = (o.status || 'processing').toLowerCase();
        return `
          <tr>
            <td><strong>#${o.orderId}</strong></td>
            <td>
              <div style="font-weight: 500;">${o.shippingAddress?.firstName || ''} ${o.shippingAddress?.lastName || ''}</div>
              <div class="text-muted" style="font-size: 0.75rem;">${o.shippingAddress?.city || ''}, ${o.shippingAddress?.state || ''}</div>
            </td>
            <td>${o.date}</td>
            <td>${(o.items || []).reduce((sum, item) => sum + item.qty, 0)} items</td>
            <td>$${o.total.toFixed(2)}</td>
            <td>
              <select class="form-select form-select-sm select-order-status" data-id="${o.orderId}" style="width: 130px; font-size: 0.72rem; background-color: #141211; border-color: rgba(255,255,255,0.08); color: var(--clr-white);">
                <option value="processing" ${statusVal === 'processing' ? 'selected' : ''}>Processing</option>
                <option value="shipped" ${statusVal === 'shipped' ? 'selected' : ''}>Shipped</option>
                <option value="delivered" ${statusVal === 'delivered' ? 'selected' : ''}>Delivered</option>
              </select>
            </td>
            <td class="text-end">
              <a href="/api/orders/${o.orderId}/invoice" class="btn btn-sm btn-outline-light me-1" style="font-size: 0.7rem; border-color: rgba(255,255,255,0.1);">
                <i class="bi bi-file-pdf"></i> Invoice
              </a>
            </td>
          </tr>
        `;
      }).join('');

      bindOrdersActions();
    } catch (err) {
      console.error('Orders load failed:', err);
    }
  }

  function bindOrdersActions() {
    document.querySelectorAll('.select-order-status').forEach(select => {
      select.addEventListener('change', async (e) => {
        const orderId = select.getAttribute('data-id');
        const newStatus = select.value;

        try {
          const res = await fetch(`/api/admin/orders/${orderId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
          });
          if (res.ok) {
            if (window.showToast) window.showToast(`Order status updated to ${newStatus}.`);
          }
        } catch (err) {
          console.error('Order status update failed:', err);
        }
      });
    });
  }

  // Export Orders to CSV
  const btnExportOrders = document.getElementById('btnExportOrdersCsv');
  if (btnExportOrders) {
    btnExportOrders.addEventListener('click', () => {
      if (ordersList.length === 0) return;
      
      const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Date', 'Items Count', 'Grand Total', 'Status'];
      const rows = ordersList.map(o => [
        o.orderId,
        `${o.shippingAddress?.firstName || ''} ${o.shippingAddress?.lastName || ''}`,
        o.userEmail || '',
        o.date,
        (o.items || []).reduce((sum, item) => sum + item.qty, 0),
        o.total.toFixed(2),
        o.status
      ]);

      downloadCsvFile('orders-report.csv', headers, rows);
    });
  }


  /* ============================================
     CUSTOMER DIRECTORY LEDGER
     ============================================ */
  let customersList = [];

  async function loadCustomers() {
    try {
      const res = await fetch('/api/admin/customers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      customersList = await res.json();

      const body = document.getElementById('customersTableBody');
      if (!body) return;

      body.innerHTML = customersList.map(c => `
        <tr>
          <td><strong>${c.firstName || ''} ${c.lastName || ''}</strong></td>
          <td>${c.email}</td>
          <td>Jun 15, 2026</td>
          <td>$${(c.points || 0) * 0.45 + 120 > 0 ? ((c.points || 0) * 0.45 + 120).toFixed(2) : '0.00'}</td>
          <td><span class="badge" style="background-color: var(--clr-gold); color: var(--clr-black); font-family: var(--ff-body);">${c.points || 0} pts</span></td>
          <td class="text-end">
            <div class="d-inline-flex align-items-center gap-1">
              <input type="number" class="form-control form-control-sm input-points-adjust" data-id="${c.id}" placeholder="+/- Pts" style="width: 80px; font-size: 0.72rem; background-color: #141211; border-color: rgba(255,255,255,0.08); color: var(--clr-white);">
              <button class="btn btn-sm btn-vesper py-1 px-2 btn-apply-points" data-id="${c.id}" style="font-size: 0.65rem;">Apply</button>
            </div>
          </td>
        </tr>
      `).join('');

      bindCustomersActions();
    } catch (err) {
      console.error('Customers load failed:', err);
    }
  }

  function bindCustomersActions() {
    document.querySelectorAll('.btn-apply-points').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.getAttribute('data-id');
        const input = document.querySelector(`.input-points-adjust[data-id="${userId}"]`);
        const change = parseInt(input?.value || '0');

        if (isNaN(change) || change === 0) return;

        try {
          const res = await fetch(`/api/admin/customers/${userId}/points`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ pointsChange: change })
          });
          if (res.ok) {
            const updated = await res.json();
            loadCustomers();
            if (window.showToast) window.showToast(`Updated customer points balance successfully.`);
          }
        } catch (err) {
          console.error('Loyalty balance modification failed:', err);
        }
      });
    });
  }

  // Export Customers Ledger to CSV
  const btnExportCustomers = document.getElementById('btnExportCustomersCsv');
  if (btnExportCustomers) {
    btnExportCustomers.addEventListener('click', () => {
      if (customersList.length === 0) return;

      const headers = ['User ID', 'First Name', 'Last Name', 'Email Address', 'Points Balance', 'Role'];
      const rows = customersList.map(c => [
        c.id,
        c.firstName || '',
        c.lastName || '',
        c.email,
        c.points || 0,
        c.role
      ]);

      downloadCsvFile('customers-ledger.csv', headers, rows);
    });
  }


  /* ============================================
     REVIEWS FEEDBACK HUB & REPLIES
     ============================================ */
  async function loadReviews() {
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      const catalog = data.catalog || [];

      // Extract all reviews across all catalog products
      let allReviews = [];
      catalog.forEach(p => {
        if (p.reviews && p.reviews.length > 0) {
          p.reviews.forEach(r => {
            allReviews.push({ ...r, productName: p.name, productId: p.id });
          });
        }
      });

      const feed = document.getElementById('adminReviewsFeed');
      if (!feed) return;

      if (allReviews.length === 0) {
        feed.innerHTML = `
          <div class="text-center py-5 text-muted">
            <i class="bi bi-chat-left-dots" style="font-size: 3rem;"></i>
            <h5 class="mt-3">No reviews recorded</h5>
            <p class="text-sm">Feedback on product pages will pop up here for administrative replies.</p>
          </div>
        `;
        return;
      }

      feed.innerHTML = allReviews.map(r => `
        <div class="review-feedback-item p-4 mb-3 rounded-sm border" style="background-color: var(--clr-admin-card); border-color: var(--clr-admin-border);">
          <div class="d-flex justify-content-between mb-2">
            <div>
              <strong style="color: var(--clr-white); font-family: var(--ff-heading); font-size: 1.1rem;">${r.user}</strong>
              <span class="text-muted text-xs ms-2">on product <strong>${r.productName}</strong></span>
            </div>
            <div class="text-warning">
              ${'<i class="bi bi-star-fill"></i>'.repeat(r.rating)}
              ${'<i class="bi bi-star"></i>'.repeat(5 - r.rating)}
            </div>
          </div>
          
          <p style="font-size: 0.88rem; line-height: 1.5; color: #c8c0b7;">"${r.text}"</p>
          
          <!-- Existing Reply block -->
          ${r.reply ? `
            <div class="mt-3 p-3 rounded-sm" style="background-color: #141211; border-left: 2px solid var(--clr-gold);">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--clr-gold); font-weight: 500; margin-bottom: 4px;">Atelier Response:</div>
              <p class="mb-0 text-xs" style="font-style: italic; color: #a49c95;">"${r.reply}"</p>
            </div>
          ` : `
            <!-- Reply input form -->
            <div class="mt-3 d-flex gap-2">
              <input type="text" class="form-control form-control-sm form-control-admin input-review-reply" data-product="${r.productId}" data-review="${r.id}" placeholder="Type administrative response to review..." style="font-size: 0.78rem;">
              <button class="btn btn-sm btn-vesper py-1 px-3 btn-submit-reply" data-product="${r.productId}" data-review="${r.id}" style="font-size: 0.7rem;">Submit</button>
            </div>
          `}
        </div>
      `).join('');

      bindReviewsActions();
    } catch (err) {
      console.error('Reviews loading failed:', err);
    }
  }

  function bindReviewsActions() {
    document.querySelectorAll('.btn-submit-reply').forEach(btn => {
      btn.addEventListener('click', async () => {
        const productId = btn.getAttribute('data-product');
        const reviewId = btn.getAttribute('data-review');
        const input = document.querySelector(`.input-review-reply[data-product="${productId}"][data-review="${reviewId}"]`);
        const replyText = input?.value.trim();

        if (!replyText) return;

        try {
          const res = await fetch('/api/admin/reviews/reply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, reviewId, replyText })
          });
          if (res.ok) {
            loadReviews();
            if (window.showToast) window.showToast('Reply successfully published.');
          }
        } catch (err) {
          console.error('Reply submission failed:', err);
        }
      });
    });
  }


  /* ============================================
     CSV FILE DOWNLOAD DOWNSTREAM HELPER
     ============================================ */
  function downloadCsvFile(filename, headers, rows) {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
