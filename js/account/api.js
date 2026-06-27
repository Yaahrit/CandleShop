/* ============================================
   VESPER & VINE - Account API Service
   ============================================ */

/**
 * Checks if the application is running via HTTP/HTTPS server
 * @returns {boolean}
 */
export function isHttpMode() {
  return window.location.protocol.startsWith('http');
}

/**
 * Fetch customer profile, orders history, and rewards info
 * @returns {Promise<object>}
 */
export async function fetchProfileData() {
  const token = localStorage.getItem('vesperAuthToken');
  const user = JSON.parse(localStorage.getItem('vesperUser') || 'null');

  // If user is not logged in, reject early
  if (!user || !user.loggedIn) {
    return Promise.reject(new Error('User not authenticated'));
  }

  // If served via HTTP, try to query backend server APIs
  if (isHttpMode() && token) {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Cache profile user back to localStorage
        const firstName = data.user.name.split(' ')[0] || '';
        const lastName = data.user.name.split(' ').slice(1).join(' ') || '';
        
        const cachedUser = {
          firstName,
          lastName,
          email: data.user.email,
          loggedIn: true
        };
        localStorage.setItem('vesperUser', JSON.stringify(cachedUser));
        return {
          user: cachedUser,
          orders: data.orders || []
        };
      }
    } catch (err) {
      console.warn('Network call failed, relying on mock databases.', err);
    }
  }

  // Mock fallbacks (Local direct/offline file mode)
  // Query orders for this user from localStorage or mock defaults
  let localOrders = JSON.parse(localStorage.getItem('vesperOrdersMock') || 'null');
  if (!localOrders) {
    localOrders = [
      {
        orderId: 'VV-294723',
        date: 'Jun 10, 2026',
        status: 'delivered',
        items: [
          { id: 'lavender-wild-honey', name: 'Lavender & Wild Honey', qty: 1, price: 52, image: 'images/candle_lavender.png', scent: 'French Lavender & Honey' },
          { id: 'spiced-cedar', name: 'Spiced Cedar', qty: 1, price: 50, image: 'images/candle_spiced_cedar.png', scent: 'Cedar & Cinnamon' }
        ],
        total: 102.00,
        address: '142 King Street, Charleston SC 29401'
      },
      {
        orderId: 'VV-359610',
        date: 'Jun 14, 2026',
        status: 'shipped',
        items: [
          { id: 'midnight-fig', name: 'Midnight Fig', qty: 1, price: 52, image: 'images/candle_midnight_fig.png', scent: 'Black Fig & Cedar' }
        ],
        total: 52.00,
        address: '142 King Street, Charleston SC 29401'
      },
      {
        orderId: 'VV-482019',
        date: 'Jun 15, 2026',
        status: 'processing',
        items: [
          { id: 'tuscan-leather', name: 'Tuscan Leather', qty: 1, price: 48, image: 'images/candle_tuscan_leather.png', scent: 'Sandalwood & Amber' }
        ],
        total: 48.00,
        address: '142 King Street, Charleston SC 29401'
      },
      {
        orderId: 'VV-120485',
        date: 'May 12, 2026',
        status: 'cancelled',
        items: [
          { id: 'eucalyptus-mint', name: 'Eucalyptus Mint', qty: 1, price: 42, image: 'images/candle_eucalyptus.png', scent: 'Fresh Mint & Herb' }
        ],
        total: 42.00,
        address: '142 King Street, Charleston SC 29401'
      }
    ];
    localStorage.setItem('vesperOrdersMock', JSON.stringify(localOrders));
  }

  return {
    user: user,
    orders: localOrders
  };
}

/**
 * Save updated settings profile preferences
 * @param {object} profileSettings 
 * @returns {Promise<object>}
 */
export async function saveProfileSettings(profileSettings) {
  const token = localStorage.getItem('vesperAuthToken');
  const user = JSON.parse(localStorage.getItem('vesperUser') || '{}');

  if (isHttpMode() && token) {
    try {
      const response = await fetch('/api/auth/profile/update', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(profileSettings)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Save settings API call failed, saving locally.');
    }
  }

  // Local mock save
  const updatedUser = {
    ...user,
    firstName: profileSettings.firstName,
    lastName: profileSettings.lastName,
    email: profileSettings.email
  };
  localStorage.setItem('vesperUser', JSON.stringify(updatedUser));
  return updatedUser;
}

/**
 * Clear session local storage credentials
 * @returns {Promise<void>}
 */
export async function performLogout() {
  const token = localStorage.getItem('vesperAuthToken');
  
  if (isHttpMode() && token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {
      console.warn('Logout API invocation failed.');
    }
  }

  localStorage.removeItem('vesperUser');
  localStorage.removeItem('vesperAuthToken');
}
