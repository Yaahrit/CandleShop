/* ============================================
   VESPER & VINE - Notification Center Controller
   ============================================ */
import { isHttpMode } from './api.js';

let notifications = [];

/**
 * Retrieve cached notifications from local storage
 */
function getCachedNotifications() {
  const cachedUser = JSON.parse(localStorage.getItem('vesperUser') || '{}');
  return cachedUser.notifications || [
    {
      id: 'notif-1',
      title: 'Welcome to the Scent Atelier',
      message: 'Thank you for registering. You have been awarded 100 scent points to start your journey.',
      date: 'Jun 15, 2026',
      read: false
    }
  ];
}

/**
 * Update unread badge indicators globally on the page
 */
export function updateUnreadNotificationsBadge(notifs) {
  const badge = document.getElementById('notifUnreadBadge');
  if (!badge) return;

  const unreadCount = (notifs || getCachedNotifications()).filter(n => !n.read).length;
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.classList.remove('d-none');
  } else {
    badge.classList.add('d-none');
  }
}

/**
 * Render notifications layout in dashboard
 */
export function renderNotificationsTab() {
  const container = document.getElementById('notificationsSection');
  if (!container) return;

  const cardContainer = container.querySelector('.profile-content-card');
  if (!cardContainer) return;

  notifications = getCachedNotifications();

  // Draw inbox cards list
  const listHtml = notifications.map(n => `
    <div class="notification-row p-3 mb-3 border rounded bg-light-card" style="position: relative; transition: all 0.2s ease; ${!n.read ? 'border-left: 3px solid var(--clr-gold) !important; background-color: var(--clr-cream);' : ''}">
      <div class="d-flex justify-content-between mb-1">
        <strong style="font-family: var(--ff-heading); font-size: 1.1rem; color: var(--clr-text);">${n.title}</strong>
        <span class="text-muted" style="font-size: 0.72rem;">${n.date}</span>
      </div>
      <p class="text-muted mb-0" style="font-size: 0.85rem; line-height: 1.5;">${n.message}</p>
    </div>
  `).join('');

  cardContainer.innerHTML = `
    <div class="mb-4">
      <h3 class="serif-heading mb-1" style="font-family: var(--ff-heading); font-size: 1.8rem; font-weight: 350;">Scent Notification Center</h3>
      <p class="text-muted mb-0" style="font-size: 0.85rem;">Inbox feed for updates, order milestones, and sanctuary points.</p>
    </div>

    <div class="notifications-feed mt-3">
      ${notifications.length === 0 ? `
        <div class="text-center py-5">
          <i class="bi bi-bell-slash text-muted" style="font-size: 3rem;"></i>
          <h5 class="mt-3 text-muted">Your inbox is clear</h5>
          <p class="text-muted text-sm">We'll alert you here when new collections or tracking milestones are ready.</p>
        </div>
      ` : listHtml}
    </div>
  `;

  // Trigger mark read after rendering the panel
  markNotificationsAsRead();
}

/**
 * Mark notifications read and sync with backend
 */
async function markNotificationsAsRead() {
  // Mark all read locally
  notifications.forEach(n => n.read = true);
  const cachedUser = JSON.parse(localStorage.getItem('vesperUser') || '{}');
  cachedUser.notifications = notifications;
  localStorage.setItem('vesperUser', JSON.stringify(cachedUser));

  // Sync badge count
  updateUnreadNotificationsBadge(notifications);

  // Call API to persist state
  const token = localStorage.getItem('vesperAuthToken');
  if (isHttpMode() && token) {
    try {
      await fetch('/api/auth/notifications/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.warn('Notifications API read sync failed.', err);
    }
  }
}

/**
 * Controller initialization
 */
export function initNotificationsSection() {
  // Sync unread badge count on dashboard load
  const userNotifs = getCachedNotifications();
  updateUnreadNotificationsBadge(userNotifs);
}
