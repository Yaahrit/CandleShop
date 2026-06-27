/* ============================================
   VESPER & VINE - Customer Account Orchestrator
   ============================================ */
import { fetchProfileData, performLogout } from './api.js';
import { renderDashboard, initDashboardSection } from './profile.js';
import { initOrdersSection } from './orders.js';
import { renderCartTab, initCartSection } from './cart.js';
import { renderWishlistTab, initWishlistSection } from './wishlist.js';
import { initSettingsSection } from './settings.js';
import { renderRewardsTab, initRewardsSection } from './rewards.js';
import { renderSubscriptionTab, initSubscriptionSection } from './subscription.js';
import { renderAddressesTab } from './addresses.js';

// Router section mappings
const SECTIONS = {
  '#dashboard': { id: 'dashboardSection', title: 'My Account' },
  '#orders': { id: 'ordersSection', title: 'Orders History' },
  '#cart': { id: 'cartSection', title: 'Shopping Bag' },
  '#wishlist': { id: 'wishlistSection', title: 'Saved Scent Favorites' },
  '#settings': { id: 'settingsSection', title: 'Account Settings' },
  '#rewards': { id: 'rewardsSection', title: 'Loyalty Rewards' },
  '#addresses': { id: 'addressesSection', title: 'Address Book' },
  '#subscription': { id: 'subscriptionSection', title: 'Scent Subscription' }
};

let currentUser = null;
let currentOrders = [];

/**
 * Handle URL Location Hash Routing
 */
function handleRouting() {
  const hash = window.location.hash || '#dashboard';
  const section = SECTIONS[hash] || SECTIONS['#dashboard'];

  // Toggle visible sections
  document.querySelectorAll('.profile-content-section').forEach(el => {
    el.style.display = 'none';
  });

  const activePanel = document.getElementById(section.id);
  if (activePanel) {
    activePanel.style.display = 'block';
    
    // Trigger animations
    activePanel.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.remove('revealed');
      setTimeout(() => el.classList.add('revealed'), 50);
    });
  }

  // Sync Sidebar Active Links
  document.querySelectorAll('.profile-nav a[data-section]').forEach(link => {
    const sectionAttr = link.getAttribute('data-section');
    const expectedHash = `#${sectionAttr}`;
    if (expectedHash === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Dynamically update document title
  document.title = `${section.title} — Vesper & Vine`;

  // Render content blocks based on selected view
  renderView(hash);
}

/**
 * Render modules depending on active hash
 * @param {string} hash 
 */
function renderView(hash) {
  if (!currentUser) return;

  switch (hash) {
    case '#dashboard':
      renderDashboard(currentUser, currentOrders);
      break;
    case '#orders':
      // orders filters will automatically apply and draw
      break;
    case '#cart':
      renderCartTab();
      break;
    case '#wishlist':
      renderWishlistTab();
      break;
    case '#rewards':
      renderRewardsTab(currentUser);
      break;
    case '#addresses':
      renderAddressesTab();
      break;
    case '#subscription':
      renderSubscriptionTab();
      break;
  }
}

/**
 * Display Skeleton Shimmer Loader elements
 */
function showSkeletonLoaders() {
  // 1. Dashboard skeleton
  const dbSection = document.getElementById('dashboardSection');
  if (dbSection) {
    dbSection.innerHTML = `
      <div class="row g-4 mb-4">
        <div class="col-4">
          <div class="skeleton-wrapper text-center">
            <span class="skeleton-shimmer skeleton-circle mb-3"></span>
            <div class="skeleton-shimmer skeleton-text short mx-auto"></div>
          </div>
        </div>
        <div class="col-4">
          <div class="skeleton-wrapper text-center">
            <span class="skeleton-shimmer skeleton-circle mb-3"></span>
            <div class="skeleton-shimmer skeleton-text short mx-auto"></div>
          </div>
        </div>
        <div class="col-4">
          <div class="skeleton-wrapper text-center">
            <span class="skeleton-shimmer skeleton-circle mb-3"></span>
            <div class="skeleton-shimmer skeleton-text short mx-auto"></div>
          </div>
        </div>
      </div>
      <div class="skeleton-wrapper">
        <span class="skeleton-shimmer skeleton-title"></span>
        <div class="skeleton-shimmer skeleton-text"></div>
        <div class="skeleton-shimmer skeleton-text"></div>
        <div class="skeleton-shimmer skeleton-text short"></div>
      </div>
    `;
  }

  // 2. Orders skeleton
  const ordersList = document.getElementById('fullOrdersList');
  if (ordersList) {
    ordersList.innerHTML = `
      <div class="skeleton-wrapper p-4 mb-3">
        <span class="skeleton-shimmer skeleton-title" style="width: 30%;"></span>
        <div class="skeleton-shimmer skeleton-text mt-3"></div>
        <div class="skeleton-shimmer skeleton-text"></div>
      </div>
      <div class="skeleton-wrapper p-4">
        <span class="skeleton-shimmer skeleton-title" style="width: 25%;"></span>
        <div class="skeleton-shimmer skeleton-text mt-3"></div>
        <div class="skeleton-shimmer skeleton-text"></div>
      </div>
    `;
  }
}

/**
 * Update Sidebar Name, Email, and Avatar display based on authenticated user
 * @param {object} user 
 */
function updateSidebarProfileDisplay(user) {
  const nameEl = document.getElementById('profileName');
  const emailEl = document.getElementById('profileEmail');
  if (nameEl) {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    nameEl.textContent = fullName || 'Guest User';
  }
  if (emailEl) {
    emailEl.textContent = user.email || '';
  }

  // Load avatar picture if cached in localStorage
  const cachedPic = localStorage.getItem('vesperProfileAvatar');
  const sidebarAvatarImg = document.getElementById('sidebarAvatarImg');
  const sidebarAvatarPlaceholder = document.getElementById('sidebarAvatarPlaceholder');
  if (cachedPic && sidebarAvatarImg) {
    sidebarAvatarImg.src = cachedPic;
    sidebarAvatarImg.classList.remove('d-none');
    if (sidebarAvatarPlaceholder) sidebarAvatarPlaceholder.classList.add('d-none');
  } else if (sidebarAvatarImg) {
    sidebarAvatarImg.classList.add('d-none');
    if (sidebarAvatarPlaceholder) sidebarAvatarPlaceholder.classList.remove('d-none');
  }
}

/**
 * Setup sidebar avatar click listener to trigger hidden photo upload input
 */
function initSidebarAvatarUpload() {
  const sidebarAvatar = document.querySelector('.profile-sidebar .profile-avatar');
  if (sidebarAvatar) {
    sidebarAvatar.addEventListener('click', () => {
      // Find the hidden settings avatar input element
      const fileInput = document.getElementById('settingsAvatarFile');
      if (fileInput) {
        fileInput.click();
      }
    });
  }
}

/**
 * Initialize accounts application
 */
async function initAccountApp() {
  // Show initial shimmer loaders
  showSkeletonLoaders();

  try {
    // 1. Check Authentication and get profile
    const profile = await fetchProfileData();
    currentUser = profile.user;
    currentOrders = profile.orders;

    // Simulate luxury loader shimmer delay (500ms) for smoother paint transitions
    setTimeout(() => {
      // Restore dashboard structure
      restoreDashboardDOM();

      // Update Sidebar details with logged-in user data
      updateSidebarProfileDisplay(currentUser);

      // Wire up sidebar photo upload handler
      initSidebarAvatarUpload();

      // Initialize all modules
      initDashboardSection();
      initOrdersSection(currentOrders);
      initCartSection();
      initWishlistSection();
      initSettingsSection(currentUser);
      initRewardsSection();
      initSubscriptionSection();

      // Setup Routing
      window.addEventListener('hashchange', handleRouting);
      handleRouting();
    }, 500);

  } catch (err) {
    console.error('Authentication check failed:', err);
    window.location.href = 'login.html';
  }
}

/**
 * Restore Dashboard inner elements after skeleton loaders
 */
function restoreDashboardDOM() {
  const dbSection = document.getElementById('dashboardSection');
  if (!dbSection) return;

  dbSection.innerHTML = `
    <!-- Welcomer -->
    <h3 id="dashboardWelcome" class="mb-4 font-italic" style="font-family: var(--ff-heading); font-size: 1.85rem; font-weight: 350;">Welcome back</h3>
    
    <!-- Stats -->
    <div class="profile-stats reveal delay-1">
      <div class="profile-stat-card">
        <span class="stat-number">0</span>
        <span class="stat-label">Orders</span>
      </div>
      <div class="profile-stat-card">
        <span class="stat-number">0</span>
        <span class="stat-label">Wishlist</span>
      </div>
      <div class="profile-stat-card">
        <span class="stat-number">0</span>
        <span class="stat-label">Sanctuary Points</span>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <h4 class="mt-5 mb-3" style="font-family: var(--ff-heading); font-size: 1.15rem; font-weight: 500;">Quick Actions</h4>
    <div class="row g-3 reveal delay-2">
      <div class="col-6 col-sm-4">
        <a href="#orders" class="action-card-track text-decoration-none d-block border p-3 text-center rounded bg-light-card" style="background-color: var(--clr-bg-alt); border-color: var(--clr-border-light) !important; transition: all 0.2s ease;">
          <i class="bi bi-box-seam d-block fs-3 mb-2" style="color: var(--clr-accent);"></i>
          <span style="font-size: 0.85rem; color: var(--clr-text); font-weight: 500;">Track Orders</span>
        </a>
      </div>
      <div class="col-6 col-sm-4">
        <a href="#orders" class="action-card-reorder text-decoration-none d-block border p-3 text-center rounded bg-light-card" style="background-color: var(--clr-bg-alt); border-color: var(--clr-border-light) !important; transition: all 0.2s ease;">
          <i class="bi bi-arrow-repeat d-block fs-3 mb-2" style="color: var(--clr-accent);"></i>
          <span style="font-size: 0.85rem; color: var(--clr-text); font-weight: 500;">Reorder Favorites</span>
        </a>
      </div>
      <div class="col-6 col-sm-4">
        <a href="#subscription" class="action-card-sub text-decoration-none d-block border p-3 text-center rounded bg-light-card" style="background-color: var(--clr-bg-alt); border-color: var(--clr-border-light) !important; transition: all 0.2s ease;">
          <i class="bi bi-stars d-block fs-3 mb-2" style="color: var(--clr-accent);"></i>
          <span style="font-size: 0.85rem; color: var(--clr-text); font-weight: 500;">Manage Plan</span>
        </a>
      </div>
      <div class="col-6 col-sm-4">
        <a href="#wishlist" class="action-card-wishlist text-decoration-none d-block border p-3 text-center rounded bg-light-card" style="background-color: var(--clr-bg-alt); border-color: var(--clr-border-light) !important; transition: all 0.2s ease;">
          <i class="bi bi-heart d-block fs-3 mb-2" style="color: var(--clr-accent);"></i>
          <span style="font-size: 0.85rem; color: var(--clr-text); font-weight: 500;">View Wishlist</span>
        </a>
      </div>
      <div class="col-6 col-sm-4">
        <a href="#settings" class="action-card-settings text-decoration-none d-block border p-3 text-center rounded bg-light-card" style="background-color: var(--clr-bg-alt); border-color: var(--clr-border-light) !important; transition: all 0.2s ease;">
          <i class="bi bi-gear d-block fs-3 mb-2" style="color: var(--clr-accent);"></i>
          <span style="font-size: 0.85rem; color: var(--clr-text); font-weight: 500;">Edit Settings</span>
        </a>
      </div>
    </div>

    <!-- Active Subscription Card -->
    <div class="profile-content-card mt-4 reveal delay-3">
      <h3>Scent Subscription</h3>
      <p>You're on the <strong>Seasonal Discovery</strong> plan — a curated candle delivered every season.</p>
      <div class="d-flex align-items-center gap-3 flex-wrap mt-3">
        <div style="flex: 1; min-width: 200px;">
          <div style="font-size: 0.72rem; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem;">Next Shipment Date</div>
          <div style="font-family: var(--ff-heading); font-size: 1.15rem; font-weight: 500; color: var(--clr-accent);">September 21, 2026</div>
        </div>
        <a href="#subscription" class="btn-vesper-outline" style="text-decoration: none;">
          <span>Manage Plan</span>
        </a>
      </div>
    </div>
  `;
  
  // Setup quick card hover animations
  dbSection.querySelectorAll('.row.g-3 a').forEach(a => {
    a.addEventListener('mouseover', () => {
      a.style.transform = 'translateY(-3px)';
      a.style.borderColor = 'var(--clr-accent)';
    });
    a.addEventListener('mouseout', () => {
      a.style.transform = 'translateY(0)';
      a.style.borderColor = 'var(--clr-border-light)';
    });
  });
}

// Bind Logout button actions
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to sign out?')) {
      await performLogout();
      window.location.href = 'login.html';
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAccountApp);
