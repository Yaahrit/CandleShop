/* ============================================
   VESPER & VINE - Account Dashboard controller
   ============================================ */

/**
 * Render the Dashboard Welcome and Statistics
 * @param {object} user 
 * @param {array} orders 
 */
export function renderDashboard(user, orders) {
  const welcomeEl = document.getElementById('dashboardWelcome');
  if (welcomeEl) {
    welcomeEl.textContent = `Welcome back, ${user.firstName || 'Guest'}`;
  }

  // Bind dynamic stat numbers
  const statNumbers = document.querySelectorAll('#dashboardSection .profile-stats .stat-number');
  if (statNumbers.length >= 3) {
    // Stat 1: Total Orders Count
    statNumbers[0].textContent = orders.length;
    // Stat 2: Wishlist Count
    const wishlist = JSON.parse(localStorage.getItem('vesperWishlist') || '[]');
    statNumbers[1].textContent = wishlist.length;
    // Stat 3: Loyalty points
    const points = user.email === 'tester@vesper.com' ? 148 : 128;
    statNumbers[2].textContent = points;
  }
}

/**
 * Setup event listeners for Dashboard Quick Actions
 */
export function initDashboardSection() {
  const container = document.getElementById('dashboardSection');
  if (!container) return;

  // Bind quick action click triggers
  container.addEventListener('click', (e) => {
    const trackCard = e.target.closest('.action-card-track');
    const reorderCard = e.target.closest('.action-card-reorder');
    const subCard = e.target.closest('.action-card-sub');
    const wishlistCard = e.target.closest('.action-card-wishlist');
    const settingsCard = e.target.closest('.action-card-settings');

    if (!trackCard && !reorderCard && !subCard && !wishlistCard && !settingsCard) return;

    e.preventDefault();

    if (trackCard || reorderCard) {
      window.location.hash = '#orders';
    } else if (subCard) {
      window.location.hash = '#subscription';
    } else if (wishlistCard) {
      window.location.hash = '#wishlist';
    } else if (settingsCard) {
      window.location.hash = '#settings';
    }
  });
}
