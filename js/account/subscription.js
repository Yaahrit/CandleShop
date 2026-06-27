/* ============================================
   VESPER & VINE - Scent Membership (Subscription) Tab Controller
   ============================================ */

let isPaused = false;
let currentShipmentDate = new Date('2026-09-21');
const simulatedToday = new Date('2026-09-03'); // Fixed context baseline to match prompt's "18 Days until Sept 21"

/**
 * Format date utility
 * @param {Date} date 
 * @returns {string}
 */
function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Render subscription details panel
 */
export function renderSubscriptionTab() {
  const container = document.getElementById('subscriptionSection');
  if (!container) return;

  const cardContainer = container.querySelector('.profile-content-card');
  if (!cardContainer) return;

  // Calculate days remaining dynamically
  const diffTime = currentShipmentDate - simulatedToday;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const countdownText = isPaused ? 'Membership Suspended' : `${diffDays} Days`;

  // Render plan layouts
  cardContainer.innerHTML = `
    <!-- Top Header -->
    <div class="sub-luxury-header mb-4">
      <h3 class="serif-heading mb-1" style="font-family: var(--ff-heading); font-size: 1.8rem; font-weight: 350;">Scent Sanctuary Membership</h3>
      <p class="text-muted" style="font-size: 0.85rem;">Your private fragrance club. Curated seasonal edit, hand-poured in Charleston.</p>
    </div>

    <!-- Main Grid: Left (Hero, Upcoming Shipment, Journey) and Right (Stats, Perks, Preferences) -->
    <div class="row g-4">
      
      <!-- Left Column -->
      <div class="col-lg-7">
        
        <!-- centerpiece Membership Hero Card -->
        <div class="sub-hero-card-luxury p-4 mb-4">
          <div class="sub-glass-glow"></div>
          <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
              <span class="sub-hero-label">CURRENT MEMBERSHIP</span>
              <h4 class="sub-hero-title">SEASONAL DISCOVERY</h4>
            </div>
            <div>
              <span class="badge-sub-status ${isPaused ? 'paused' : 'active'}">
                ${isPaused ? 'Paused ✕' : 'Active Member ✦'}
              </span>
            </div>
          </div>

          <div class="sub-countdown-row">
            <div class="countdown-stat">
              <span class="countdown-label">NEXT FRAGRANCE ARRIVES IN</span>
              <h3 class="countdown-value ${isPaused ? 'paused' : ''}">${isPaused ? '—' : countdownText}</h3>
            </div>
            <div class="countdown-date-stat text-sm-end mt-3 mt-sm-0">
              <span class="countdown-label">ESTIMATED SHIPMENT DATE</span>
              <span class="countdown-date-val">${isPaused ? 'Suspended' : formatDate(currentShipmentDate)}</span>
            </div>
          </div>
        </div>

        <!-- Upcoming Shipment Presentation Card -->
        <div class="upcoming-shipment-card p-4 mb-4 border rounded">
          <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div style="flex: 1; min-width: 250px;">
              <span class="upcoming-shipment-lbl">YOUR NEXT SCENT DELIVERY</span>
              <h4 class="upcoming-shipment-title">Autumn Discovery Collection</h4>
              <p class="upcoming-shipment-desc text-muted mb-3">
                A comforting collection containing a premium hand-poured amber glass candle featuring our signature seasonal scent, <strong>Autumn Ember</strong>, crafted exclusively for your profile.
              </p>
              <button class="btn btn-sm btn-vesper py-2 px-3 btn-preview-collection">
                <span>Preview Collection</span>
              </button>
            </div>
            <div class="upcoming-shipment-status-box text-center">
              <div class="upcoming-shipment-icon"><i class="bi bi-box-seam-fill"></i></div>
              <span class="upcoming-shipment-status-lbl">STATUS</span>
              <strong class="upcoming-shipment-status-val text-uppercase">${isPaused ? 'Paused' : 'Preparing'}</strong>
            </div>
          </div>
        </div>

        <!-- Subscription Journey Timeline -->
        <div class="sub-timeline-section p-4 border rounded mb-4 bg-light-card">
          <h5 class="section-card-title mb-4">Your Fragrance Journey Timeline</h5>
          <div class="sub-journey-timeline">
            
            <!-- Step 1 (Completed) -->
            <div class="sub-timeline-step completed">
              <div class="sub-step-indicator"><i class="bi bi-check"></i></div>
              <div class="sub-step-info">
                <span class="sub-step-season">Spring 2026</span>
                <span class="sub-step-status-tag">Delivered</span>
              </div>
            </div>

            <!-- Step 2 (Completed) -->
            <div class="sub-timeline-step completed">
              <div class="sub-step-indicator"><i class="bi bi-check"></i></div>
              <div class="sub-step-info">
                <span class="sub-step-season">Summer 2026</span>
                <span class="sub-step-status-tag">Delivered</span>
              </div>
            </div>

            <!-- Step 3 (Current/Active) -->
            <div class="sub-timeline-step ${isPaused ? 'paused' : 'active'}">
              <div class="sub-step-indicator"><i class="bi bi-hourglass-split"></i></div>
              <div class="sub-step-info">
                <span class="sub-step-season">Autumn 2026</span>
                <span class="sub-step-status-tag">${isPaused ? 'Paused' : 'Preparing'}</span>
              </div>
            </div>

            <!-- Step 4 (Locked Future) -->
            <div class="sub-timeline-step locked">
              <div class="sub-step-indicator"><i class="bi bi-lock-fill"></i></div>
              <div class="sub-step-info">
                <span class="sub-step-season">Winter 2026</span>
                <span class="sub-step-status-tag">Locked</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Collapsible Membership Admin (Billing / Address details) -->
        <div class="manage-membership-collapsible border rounded p-3 mb-4">
          <button class="btn-collapsible-trigger w-100" id="membershipCollapsibleBtn">
            <span>Manage Membership Details (Billing & Shipping)</span>
            <i class="bi bi-chevron-down collapsible-arrow"></i>
          </button>
          
          <div class="collapsible-content-wrapper mt-3" id="membershipCollapsibleContent" style="display: none;">
            <div class="row g-3">
              <div class="col-md-6 border-end" style="border-color: var(--clr-border-light) !important;">
                <h6 class="mb-3 font-heading" style="font-family: var(--ff-heading); font-size: 1.05rem; font-weight: 500;">Payment Method</h6>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-credit-card fs-4"></i>
                  <div>
                    <strong class="d-block" style="font-size: 0.85rem;">Mastercard ending in 4820</strong>
                    <span class="text-muted" style="font-size: 0.72rem;">Expires: 06/2029</span>
                  </div>
                </div>
                <button class="btn btn-sm btn-vesper-outline py-2 px-3 btn-edit-billing">
                  <span>Edit Payment Card</span>
                </button>
              </div>
              <div class="col-md-6 ps-md-4">
                <h6 class="mb-3 font-heading" style="font-family: var(--ff-heading); font-size: 1.05rem; font-weight: 500;">Shipping Sanctuary</h6>
                <p class="mb-3" style="font-size: 0.82rem; color: var(--clr-text-light); line-height: 1.5;">
                  Flora Merrit<br>
                  142 King Street<br>
                  Charleston, SC 29401
                </p>
                <button class="btn btn-sm btn-vesper-outline py-2 px-3 btn-edit-address">
                  <span>Edit Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="col-lg-5">
        
        <!-- Value Dashboard statistics cards -->
        <div class="sub-stats-section mb-4">
          <h5 class="section-card-title mb-3">Scent Club Value statistics</h5>
          <div class="row g-2">
            <div class="col-6">
              <div class="sub-stat-card-luxury">
                <span class="sub-stat-num">8</span>
                <span class="sub-stat-lbl">Deliveries Received</span>
              </div>
            </div>
            <div class="col-6">
              <div class="sub-stat-card-luxury">
                <span class="sub-stat-num">$124</span>
                <span class="sub-stat-lbl">Money Saved</span>
              </div>
            </div>
            <div class="col-6">
              <div class="sub-stat-card-luxury">
                <span class="sub-stat-num">14</span>
                <span class="sub-stat-lbl">Exclusive Scents</span>
              </div>
            </div>
            <div class="col-6">
              <div class="sub-stat-card-luxury">
                <span class="sub-stat-num">2024</span>
                <span class="sub-stat-lbl">Member Since</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scent Preference Profile -->
        <div class="scent-preferences-section mb-4 p-4 border rounded">
          <h5 class="section-card-title mb-3">Your Scent preferences</h5>
          <div class="preference-pills-row">
            <span class="preference-pill-luxury"><i class="bi bi-tag-fill"></i> Woody</span>
            <span class="preference-pill-luxury"><i class="bi bi-tag-fill"></i> Amber</span>
            <span class="preference-pill-luxury"><i class="bi bi-tag-fill"></i> Leather</span>
            <span class="preference-pill-luxury"><i class="bi bi-tag-fill"></i> Vanilla</span>
          </div>
        </div>

        <!-- Loyalty points integration -->
        <div class="sub-rewards-card p-4 border rounded mb-4 border-gold-glow">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="rewards-lbl-title text-gold-accent"><i class="bi bi-stars"></i> Subscription Rewards</span>
            <span class="rewards-badge-points">128 Points</span>
          </div>
          <p class="rewards-desc-msg text-muted mb-0">
            Earn <strong>+20 Scent Points</strong> automatically with your upcoming seasonal candle dispatch.
          </p>
        </div>

        <!-- Curated Discovery Teaser (Coming next season) -->
        <div class="curated-teaser-card p-4 border rounded mb-4">
          <div class="curated-teaser-blur-overlay"></div>
          <span class="teaser-label">COMING NEXT SEASON</span>
          <h4 class="teaser-title">Autumn Ember</h4>
          <div class="teaser-scent-notes mt-2 mb-2">
            <span class="note-pill">Smoked Cedar</span>
            <span class="note-pill">Amber Resin</span>
            <span class="note-pill">Vanilla Bark</span>
          </div>
          <p class="teaser-desc text-muted mb-0">A rich, comforting harvest aroma designed to warm your cooler evenings.</p>
        </div>

        <!-- Aspirational Upgrade Experience Tiers -->
        <div class="upgrade-tiers-section mb-4">
          <h5 class="section-card-title mb-3">Explore Higher Scent Tiers</h5>
          <div class="upgrade-tiers-list">
            
            <!-- Tier 1 -->
            <div class="tier-upgrade-item current">
              <div class="tier-upgrade-header">
                <span class="tier-upgrade-name">Seasonal Discovery</span>
                <span class="tier-upgrade-status">CURRENT PLAN</span>
              </div>
              <p class="tier-upgrade-desc text-muted">1 master candle delivered every season. $42/quarter.</p>
            </div>

            <!-- Tier 2 -->
            <div class="tier-upgrade-item locked btn-trigger-atelier">
              <div class="tier-upgrade-header">
                <span class="tier-upgrade-name">Monthly Scent Atelier</span>
                <span class="tier-upgrade-status unlocked-tag">UPGRADE →</span>
              </div>
              <p class="tier-upgrade-desc text-muted">1 signature candle + room mist delivered monthly. $32/month.</p>
            </div>

            <!-- Tier 3 -->
            <div class="tier-upgrade-item locked btn-trigger-reserve">
              <div class="tier-upgrade-header">
                <span class="tier-upgrade-name">VIP Reserve Concierge</span>
                <span class="tier-upgrade-status unlocked-tag">UPGRADE →</span>
              </div>
              <p class="tier-upgrade-desc text-muted">Bespoke formulations, private blending sessions, and concierge. $55/month.</p>
            </div>

          </div>
        </div>

        <!-- Club Membership Actions -->
        <div class="club-actions-section">
          <h5 class="section-card-title mb-3">Membership Actions</h5>
          <div class="club-actions-grid">
            
            <!-- Action 1 -->
            <div class="action-card-luxury btn-sub-skip">
              <div class="action-icon"><i class="bi bi-skip-end"></i></div>
              <h6 class="action-title">Skip Next Box</h6>
              <p class="action-desc text-muted mb-0">Skip autumn delivery and push order schedule.</p>
            </div>

            <!-- Action 2 -->
            <div class="action-card-luxury btn-sub-pause">
              <div class="action-icon"><i class="bi ${isPaused ? 'bi-play' : 'bi-pause'}"></i></div>
              <h6 class="action-title">${isPaused ? 'Resume Plan' : 'Pause Membership'}</h6>
              <p class="action-desc text-muted mb-0">${isPaused ? 'Re-activate seasonal candle dispatches.' : 'Temporarily suspend scent deliveries.'}</p>
            </div>

            <!-- Action 3 -->
            <div class="action-card-luxury btn-trigger-preferences">
              <div class="action-icon"><i class="bi bi-sliders"></i></div>
              <h6 class="action-title">Preferences</h6>
              <p class="action-desc text-muted mb-0">Modify scent profiles and sizes.</p>
            </div>

          </div>
        </div>

    </div>

    </div>
  `;

  // Ensure the card is visible (fix reveal animation race condition)
  requestAnimationFrame(() => {
    cardContainer.classList.add('revealed');
  });

  // Animate the progress bar fill on load
  setTimeout(() => {
    const fill = container.querySelector('.card-progress-fill');
    if (fill) fill.style.width = `100%`; // Simple animation trigger
  }, 150);

  // Wire up collapsible membership details toggle listener
  const collapsibleBtn = document.getElementById('membershipCollapsibleBtn');
  const collapsibleContent = document.getElementById('membershipCollapsibleContent');
  if (collapsibleBtn && collapsibleContent) {
    collapsibleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCollapsed = collapsibleContent.style.display === 'none';
      collapsibleContent.style.display = isCollapsed ? 'block' : 'none';
      collapsibleBtn.querySelector('.collapsible-arrow').style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }
}

/**
 * Hook event listeners and alerts
 */
export function initSubscriptionSection() {
  const container = document.getElementById('subscriptionSection');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const skipBtn = e.target.closest('.btn-sub-skip');
    const pauseBtn = e.target.closest('.btn-sub-pause');
    const previewBtn = e.target.closest('.btn-preview-collection');
    
    const billingBtn = e.target.closest('.btn-edit-billing') || e.target.closest('.btn-edit-address');
    const upgradeAtelier = e.target.closest('.btn-trigger-atelier');
    const upgradeReserve = e.target.closest('.btn-trigger-reserve');
    const prefBtn = e.target.closest('.btn-trigger-preferences');

    if (!skipBtn && !pauseBtn && !previewBtn && !billingBtn && !upgradeAtelier && !upgradeReserve && !prefBtn) return;
    e.preventDefault();

    if (skipBtn) {
      if (isPaused) {
        if (window.showToast) {
          window.showToast("Your plan is currently paused. Please resume first.");
        } else {
          alert("Your plan is currently paused. Please resume first.");
        }
        return;
      }
      // Advance date by 3 months
      currentShipmentDate.setMonth(currentShipmentDate.getMonth() + 3);
      const msg = `Next shipment skipped. Your next candle will deliver on ${formatDate(currentShipmentDate)}.`;
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
      renderSubscriptionTab();
    } else if (pauseBtn) {
      isPaused = !isPaused;
      const msg = isPaused ? 'Subscription paused successfully.' : 'Subscription resumed successfully!';
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
      renderSubscriptionTab();
    } else if (previewBtn) {
      const msg = `Preview: Autumn Discovery Collection features 'Autumn Ember' (Smoked Cedar, Amber Resin, and Vanilla Bark) in custom hand-numbered amber glass jars. Selection locked on Sept 10.`;
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
    } else if (billingBtn) {
      const msg = `Secure billing management is integrated with Stripe and Mastercard encryption. Redirection to Stripe details page initiated.`;
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
    } else if (upgradeAtelier) {
      const msg = `Switching from Seasonal Discovery ($42/quarter) to Monthly Scent Atelier ($32/month). Plan updated successfully! Scent mist and candle unlocked.`;
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
    } else if (upgradeReserve) {
      const msg = `Switching to VIP Reserve Concierge ($55/month). Plan updated successfully! Blending session booking email dispatched.`;
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
    } else if (prefBtn) {
      const msg = `Scent profile configuration portal loading. You can adjust your preference notes (Woody, Amber, Leather, Vanilla).`;
      if (window.showToast) {
        window.showToast(msg);
      } else {
        alert(msg);
      }
    }
  });
}
