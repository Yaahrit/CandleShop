/* ============================================
   VESPER & VINE - Luxury Delivery Destinations Controller
   Premium Address Management Experience
   ============================================ */

let addresses = [];

/* Address type configuration with icons and labels */
const ADDRESS_TYPES = {
  home:     { icon: 'bi-house-heart', label: 'Home',              color: 'var(--clr-accent)' },
  office:   { icon: 'bi-building',    label: 'Office',            color: 'var(--clr-sage)' },
  gift:     { icon: 'bi-gift',        label: 'Gift Destination',  color: '#C4A265' },
  retreat:  { icon: 'bi-tree',        label: 'Retreat',           color: 'var(--clr-sage)' }
};

/**
 * Fetch cached addresses or load mock defaults
 * @returns {array}
 */
function getAddresses() {
  let list = JSON.parse(localStorage.getItem('vesperAddresses') || 'null');

  // Migration: clear old format without type/label fields
  if (list && list.length > 0 && !list[0].type) {
    list = null;
    localStorage.removeItem('vesperAddresses');
  }

  if (!list) {
    list = [
      {
        id: 'addr-1',
        label: 'Home',
        type: 'home',
        firstName: 'Flora',
        lastName: 'Merrit',
        street: '142 King Street',
        city: 'Charleston',
        state: 'SC',
        zip: '29401',
        country: 'United States',
        phone: '+1 (555) 123-4567',
        isDefault: true,
        lastUsed: 'Jun 14, 2026',
        orderCount: 8,
        preferredFor: 'Seasonal Discovery Subscription',
        hasSubscription: true,
        subscriptionName: 'Autumn Discovery Box',
        subscriptionDate: 'Sep 21, 2026'
      },
      {
        id: 'addr-2',
        label: 'Office',
        type: 'office',
        firstName: 'Flora',
        lastName: 'Merrit',
        street: '87 Broad Street, Suite 400',
        city: 'Charleston',
        state: 'SC',
        zip: '29401',
        country: 'United States',
        phone: '+1 (555) 987-6543',
        isDefault: false,
        lastUsed: 'May 28, 2026',
        orderCount: 3,
        preferredFor: 'Gift Orders',
        hasSubscription: false
      },
      {
        id: 'addr-3',
        label: 'Mom\'s House',
        type: 'gift',
        firstName: 'Catherine',
        lastName: 'Merrit',
        street: '22 Tradd Street',
        city: 'Charleston',
        state: 'SC',
        zip: '29401',
        country: 'United States',
        phone: '+1 (555) 456-7890',
        isDefault: false,
        lastUsed: 'Apr 10, 2026',
        orderCount: 2,
        preferredFor: 'Gift Deliveries',
        hasSubscription: false
      }
    ];
    localStorage.setItem('vesperAddresses', JSON.stringify(list));
  }

  // Migrate old format addresses
  list = list.map(a => ({
    ...a,
    type: a.type || 'home',
    label: a.label || 'Home',
    lastUsed: a.lastUsed || 'Not yet used',
    orderCount: a.orderCount || 0,
    preferredFor: a.preferredFor || '',
    hasSubscription: a.hasSubscription || false
  }));

  return list;
}

/**
 * Render the luxury Delivery Destinations panel
 */
export function renderAddressesTab() {
  addresses = getAddresses();

  const section = document.getElementById('addressesSection');
  if (!section) return;

  const cardContainer = section.querySelector('.profile-content-card');
  if (!cardContainer) return;

  const defaultAddr = addresses.find(a => a.isDefault);
  const addressCount = addresses.length;

  // Build the full luxury layout
  cardContainer.innerHTML = `
    <!-- Premium Header -->
    <div class="addr-luxury-header mb-4">
      <h3 class="serif-heading mb-1" style="font-family: var(--ff-heading); font-size: 1.8rem; font-weight: 350;">Delivery Destinations</h3>
      <p class="text-muted" style="font-size: 0.85rem;">Manage where your fragrances, gifts, and seasonal discoveries arrive.</p>
    </div>

    <!-- Summary Stats Row -->
    <div class="addr-stats-row mb-4">
      <div class="addr-stat-card">
        <span class="addr-stat-number">${addressCount}</span>
        <span class="addr-stat-label">Saved Addresses</span>
      </div>
      <div class="addr-stat-card">
        <span class="addr-stat-number">${defaultAddr ? defaultAddr.label : '—'}</span>
        <span class="addr-stat-label">Primary Address</span>
      </div>
      <div class="addr-stat-card">
        <span class="addr-stat-number">${defaultAddr ? defaultAddr.label : '—'}</span>
        <span class="addr-stat-label">Upcoming Shipment</span>
      </div>
      <div class="addr-stat-card">
        <span class="addr-stat-number">2024</span>
        <span class="addr-stat-label">Member Since</span>
      </div>
    </div>

    <!-- Destination Cards Grid -->
    <div class="addr-destinations-grid" id="addressesGrid">
      ${addresses.length > 0 ? renderAddressCards(addresses) : renderEmptyState()}
      ${renderAddNewCard()}
    </div>
  `;

  // Ensure the card is visible (fix reveal animation race condition)
  requestAnimationFrame(() => {
    cardContainer.classList.add('revealed');
  });

  // Bind all interactive listeners
  bindAddressListeners(cardContainer);

  // Stagger animate cards entrance
  setTimeout(() => {
    cardContainer.querySelectorAll('.addr-destination-card, .addr-add-new-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('addr-card-visible'), i * 80);
    });
  }, 60);
}

/**
 * Render all address destination cards
 * @param {array} list
 * @returns {string}
 */
function renderAddressCards(list) {
  // Sort: default first
  const sorted = [...list].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));

  return sorted.map(addr => {
    const typeConfig = ADDRESS_TYPES[addr.type] || ADDRESS_TYPES.home;

    return `
      <div class="addr-destination-card ${addr.isDefault ? 'addr-primary' : ''}" data-addr-id="${addr.id}">
        ${addr.isDefault ? '<div class="addr-primary-badge"><span class="addr-primary-star">✦</span> Primary Delivery Address</div>' : ''}

        <!-- Card Header -->
        <div class="addr-card-header">
          <div class="addr-type-icon-wrapper" style="--addr-type-color: ${typeConfig.color};">
            <i class="bi ${typeConfig.icon}"></i>
          </div>
          <div class="addr-card-header-info">
            <span class="addr-card-type-label">${typeConfig.label}</span>
            <h5 class="addr-card-custom-label">${addr.label}</h5>
          </div>
        </div>

        <!-- Recipient & Address -->
        <div class="addr-card-body">
          <div class="addr-recipient-name">${addr.firstName} ${addr.lastName}</div>
          <div class="addr-street-line">${addr.street}</div>
          <div class="addr-city-line">${addr.city}, ${addr.state} ${addr.zip}</div>
          <div class="addr-phone-line">
            <i class="bi bi-telephone"></i>
            <span>${addr.phone}</span>
          </div>
        </div>

        <!-- Delivery Context -->
        <div class="addr-delivery-context">
          <div class="addr-context-item">
            <span class="addr-context-label">Last Used</span>
            <span class="addr-context-value">${addr.lastUsed}</span>
          </div>
          <div class="addr-context-divider"></div>
          <div class="addr-context-item">
            <span class="addr-context-label">Used For</span>
            <span class="addr-context-value">${addr.orderCount} ${addr.orderCount === 1 ? 'Order' : 'Orders'}</span>
          </div>
          ${addr.preferredFor ? `
            <div class="addr-context-divider"></div>
            <div class="addr-context-item">
              <span class="addr-context-label">Preferred For</span>
              <span class="addr-context-value addr-context-pref">${addr.preferredFor}</span>
            </div>
          ` : ''}
        </div>

        ${addr.hasSubscription ? `
          <!-- Subscription Integration -->
          <div class="addr-subscription-strip">
            <div class="addr-sub-icon"><i class="bi bi-box-seam-fill"></i></div>
            <div class="addr-sub-info">
              <span class="addr-sub-label">Current Subscription Ships Here</span>
              <span class="addr-sub-name">${addr.subscriptionName}</span>
            </div>
            <span class="addr-sub-date">${addr.subscriptionDate}</span>
          </div>
        ` : ''}

        <!-- Action Buttons -->
        <div class="addr-actions-row">
          <button class="addr-action-btn btn-edit-addr" data-id="${addr.id}" title="Edit">
            <i class="bi bi-pencil"></i>
            <span>Edit</span>
          </button>
          ${!addr.isDefault ? `
            <button class="addr-action-btn btn-set-default" data-id="${addr.id}" title="Make Primary">
              <i class="bi bi-geo-alt"></i>
              <span>Make Primary</span>
            </button>
          ` : ''}
          <button class="addr-action-btn addr-action-danger btn-delete-addr" data-id="${addr.id}" title="Remove">
            <i class="bi bi-trash3"></i>
            <span>Remove</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render the premium Add New Destination card
 * @returns {string}
 */
function renderAddNewCard() {
  return `
    <div class="addr-add-new-card" id="btnAddNewAddress">
      <div class="addr-add-new-icon-ring">
        <i class="bi bi-plus-lg"></i>
      </div>
      <h5 class="addr-add-new-title">Add New Destination</h5>
      <p class="addr-add-new-desc">Store a new delivery location for future orders.</p>
    </div>
  `;
}

/**
 * Render the elegant empty state
 * @returns {string}
 */
function renderEmptyState() {
  return `
    <div class="addr-empty-state">
      <div class="addr-empty-icon">
        <i class="bi bi-geo-alt"></i>
      </div>
      <h4 class="addr-empty-title">No Delivery Destinations Yet</h4>
      <p class="addr-empty-desc">Add your first address to begin your fragrance journey.</p>
    </div>
  `;
}

/**
 * Bind all interactive event listeners on the addresses panel
 * @param {HTMLElement} root
 */
function bindAddressListeners(root) {
  root.addEventListener('click', (e) => {
    // Add New Address
    const addBtn = e.target.closest('#btnAddNewAddress');
    if (addBtn) {
      openAddressModal();
      return;
    }

    // Edit Address
    const editBtn = e.target.closest('.btn-edit-addr');
    if (editBtn) {
      e.preventDefault();
      const id = editBtn.dataset.id;
      const addr = addresses.find(a => a.id === id);
      if (addr) openAddressModal(addr);
      return;
    }

    // Delete Address
    const deleteBtn = e.target.closest('.btn-delete-addr');
    if (deleteBtn) {
      e.preventDefault();
      deleteAddress(deleteBtn.dataset.id);
      return;
    }

    // Set Default
    const defaultBtn = e.target.closest('.btn-set-default');
    if (defaultBtn) {
      e.preventDefault();
      setDefaultAddress(defaultBtn.dataset.id);
      return;
    }
  });
}

/**
 * Open Premium Address Add/Edit Modal
 * @param {object|null} addr
 */
function openAddressModal(addr = null) {
  let modalEl = document.getElementById('addressModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.className = 'modal fade';
    modalEl.id = 'addressModal';
    modalEl.tabIndex = -1;
    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 luxury-modal-content">
          <div class="modal-header border-0 luxury-modal-header p-4">
            <div>
              <span class="modal-subtitle">Delivery Destinations</span>
              <h5 class="modal-title" id="addressModalTitle">Add New Destination</h5>
            </div>
            <button type="button" class="btn-close shadow-none btn-close-luxury" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="addressForm">
            <div class="modal-body p-4 pt-0">
              <input type="hidden" id="addrId">

              <!-- Address Label & Type -->
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="form-group-vesper mb-0">
                    <label for="addrLabel">Address Label</label>
                    <input type="text" class="form-input-vesper" id="addrLabel" placeholder="e.g. Home, Office" required>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group-vesper mb-0">
                    <label for="addrType">Address Type</label>
                    <select class="form-input-vesper" id="addrType" required>
                      <option value="home">🏠 Home</option>
                      <option value="office">🏢 Office</option>
                      <option value="gift">🎁 Gift Destination</option>
                      <option value="retreat">🌿 Retreat</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Name -->
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="form-group-vesper mb-0">
                    <label for="addrFirstName">First Name</label>
                    <input type="text" class="form-input-vesper" id="addrFirstName" required>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group-vesper mb-0">
                    <label for="addrLastName">Last Name</label>
                    <input type="text" class="form-input-vesper" id="addrLastName" required>
                  </div>
                </div>
              </div>

              <!-- Street -->
              <div class="form-group-vesper mb-3">
                <label for="addrStreet">Street Address</label>
                <input type="text" class="form-input-vesper" id="addrStreet" required>
              </div>

              <!-- City / State / ZIP -->
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="form-group-vesper mb-0">
                    <label for="addrCity">City</label>
                    <input type="text" class="form-input-vesper" id="addrCity" required>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-group-vesper mb-0">
                    <label for="addrState">State</label>
                    <input type="text" class="form-input-vesper" id="addrState" required>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-group-vesper mb-0">
                    <label for="addrZip">ZIP Code</label>
                    <input type="text" class="form-input-vesper" id="addrZip" required>
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="form-group-vesper mb-3">
                <label for="addrPhone">Phone Number</label>
                <input type="tel" class="form-input-vesper" id="addrPhone" placeholder="+1 (555) 000-0000" required>
              </div>

              <!-- Default -->
              <label class="form-check-vesper">
                <input type="checkbox" id="addrDefault"> Set as primary delivery address
              </label>
            </div>
            <div class="modal-footer border-0 luxury-modal-footer p-4 pt-0 d-flex gap-2">
              <button type="button" class="btn-vesper-outline py-2" data-bs-dismiss="modal" style="flex: 1;"><span>Cancel</span></button>
              <button type="submit" class="btn-vesper py-2" style="flex: 1;"><span>Save Destination</span></button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    // Bind form submit listener
    const form = document.getElementById('addressForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveAddress();
    });
  }

  // Set titles and values
  document.getElementById('addressModalTitle').textContent = addr ? 'Edit Destination' : 'Add New Destination';
  document.getElementById('addrId').value = addr ? addr.id : '';
  document.getElementById('addrLabel').value = addr ? addr.label : '';
  document.getElementById('addrType').value = addr ? addr.type : 'home';
  document.getElementById('addrFirstName').value = addr ? addr.firstName : '';
  document.getElementById('addrLastName').value = addr ? addr.lastName : '';
  document.getElementById('addrStreet').value = addr ? addr.street : '';
  document.getElementById('addrCity').value = addr ? addr.city : '';
  document.getElementById('addrState').value = addr ? addr.state : '';
  document.getElementById('addrZip').value = addr ? addr.zip : '';
  document.getElementById('addrPhone').value = addr ? addr.phone : '';
  document.getElementById('addrDefault').checked = addr ? addr.isDefault : false;

  // Show Modal
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

/**
 * Save address (Add / Update)
 */
function saveAddress() {
  const id = document.getElementById('addrId').value;
  const label = document.getElementById('addrLabel').value.trim();
  const type = document.getElementById('addrType').value;
  const firstName = document.getElementById('addrFirstName').value.trim();
  const lastName = document.getElementById('addrLastName').value.trim();
  const street = document.getElementById('addrStreet').value.trim();
  const city = document.getElementById('addrCity').value.trim();
  const state = document.getElementById('addrState').value.trim();
  const zip = document.getElementById('addrZip').value.trim();
  const phone = document.getElementById('addrPhone').value.trim();
  const isDefault = document.getElementById('addrDefault').checked;

  let list = getAddresses();

  if (isDefault) {
    list.forEach(a => a.isDefault = false);
  }

  if (id) {
    // Update existing address
    const idx = list.findIndex(a => a.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        label, type, firstName, lastName, street, city, state, zip, phone, isDefault,
        country: 'United States'
      };
    }
  } else {
    // Add new address
    const newId = 'addr-' + Math.random().toString(36).substr(2, 9);
    list.push({
      id: newId, label, type, firstName, lastName, street, city, state, zip, phone, isDefault,
      country: 'United States',
      lastUsed: 'Not yet used',
      orderCount: 0,
      preferredFor: '',
      hasSubscription: false
    });
  }

  // Ensure at least one address is default if list is not empty
  if (list.length > 0 && !list.some(a => a.isDefault)) {
    list[0].isDefault = true;
  }

  localStorage.setItem('vesperAddresses', JSON.stringify(list));
  renderAddressesTab();

  // Dismiss modal
  const modalEl = document.getElementById('addressModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  if (window.showToast) {
    window.showToast('Destination saved successfully');
  }
}

/**
 * Delete Address
 * @param {string} id
 */
function deleteAddress(id) {
  if (confirm('Remove this delivery destination? This action cannot be undone.')) {
    let list = getAddresses();
    const target = list.find(a => a.id === id);
    list = list.filter(a => a.id !== id);

    // If we deleted the default, set a new default
    if (target && target.isDefault && list.length > 0) {
      list[0].isDefault = true;
    }

    localStorage.setItem('vesperAddresses', JSON.stringify(list));
    renderAddressesTab();

    if (window.showToast) {
      window.showToast('Destination removed from your address book');
    }
  }
}

/**
 * Set Address as default
 * @param {string} id
 */
function setDefaultAddress(id) {
  let list = getAddresses();
  list.forEach(a => {
    a.isDefault = (a.id === id);
  });
  localStorage.setItem('vesperAddresses', JSON.stringify(list));
  renderAddressesTab();

  if (window.showToast) {
    window.showToast('Primary delivery destination updated');
  }
}
