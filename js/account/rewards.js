/* ============================================
   VESPER & VINE - Luxury Loyalty & Rewards Tab Controller
   ============================================ */

/**
 * Render the premium Rewards & loyalty dashboard
 * @param {object} user 
 */
export function renderRewardsTab(user) {
  const container = document.getElementById('rewardsSection');
  if (!container) return;

  const cardContainer = container.querySelector('.profile-content-card');
  if (!cardContainer) return;

  // Determine loyalty balance based on user email
  const points = user.email === 'tester@vesper.com' ? 148 : 128;
  const targetPoints = 200;
  const needed = targetPoints - points;
  const fillPercentage = Math.round((points / targetPoints) * 100);

  // Render Your Fragrance Journey layout
  cardContainer.innerHTML = `
      <!-- Header -->
      <div class="rewards-luxury-header mb-4">
        <h3 class="serif-heading mb-1" style="font-family: var(--ff-heading); font-size: 1.8rem; font-weight: 350;">Your Fragrance Journey</h3>
        <p class="text-muted" style="font-size: 0.85rem;">Discovering sensory sanctuaries, rewarded by intention.</p>
      </div>

      <!-- Main Columns Grid -->
      <div class="row g-4">
        
        <!-- Left Column: Hero, Tier Journey, Next Target, Benefits -->
        <div class="col-lg-7">
          
          <!-- centerpiece Wallet Hero Card -->
          <div class="loyalty-card-luxury p-4 mb-4">
            <div class="card-glass-glow"></div>
            <div class="d-flex justify-content-between align-items-start mb-4">
              <div>
                <span class="card-membership-label">Your Membership Status</span>
                <h4 class="card-tier-title">GOLD MEMBER <span class="card-star">✦</span></h4>
              </div>
              <div class="text-end">
                <span class="card-points-label">Scent Balance</span>
                <div class="card-points-value">${points} <span class="card-points-unit">Points</span></div>
              </div>
            </div>

            <!-- Custom Progress visualization -->
            <div class="card-progress-wrapper mt-3">
              <div class="card-progress-track">
                <div class="card-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="d-flex justify-content-between mt-2 card-progress-meta">
                <span class="progress-lbl">${points} / ${targetPoints} Points</span>
                <span class="progress-remaining">Only ${needed} points separate you from Platinum privileges.</span>
              </div>
            </div>
          </div>

          <!-- Horizontal Tier Journey Visualization -->
          <div class="tier-journey-section mb-4 p-4 border rounded bg-light-card">
            <h5 class="section-card-title mb-4">Journey Tiers</h5>
            <div class="tier-journey-map">
              <div class="tier-connection-line">
                <div class="connection-line-fill" style="width: 66%;"></div>
              </div>
              
              <!-- Bronze Node -->
              <div class="tier-node done" data-tier="Bronze">
                <div class="tier-indicator"><i class="bi bi-check"></i></div>
                <span class="tier-name">Bronze</span>
              </div>

              <!-- Silver Node -->
              <div class="tier-node done" data-tier="Silver">
                <div class="tier-indicator"><i class="bi bi-check"></i></div>
                <span class="tier-name">Silver</span>
              </div>

              <!-- Gold Node (Active) -->
              <div class="tier-node active" data-tier="Gold">
                <div class="tier-indicator"><i class="bi bi-stars"></i></div>
                <span class="tier-name">Gold</span>
                <span class="you-are-here-badge">You Are Here</span>
              </div>

              <!-- Platinum Node (Locked) -->
              <div class="tier-node locked" data-tier="Platinum">
                <div class="tier-indicator"><i class="bi bi-lock-fill"></i></div>
                <span class="tier-name">Platinum</span>
              </div>
            </div>
          </div>

          <!-- Next Reward Target Box -->
          <div class="next-reward-card-luxury mb-4 p-4 border rounded">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <span class="next-reward-label">YOUR NEXT REWARD</span>
                <h4 class="next-reward-title">Exclusive Fragrance Discovery Box</h4>
                <p class="next-reward-desc text-muted mb-0">Contains 4 small-batch sample selections curated for your profile.</p>
              </div>
              <div class="next-reward-target-stat">
                <span class="target-needed-pts">${needed}</span>
                <span class="target-needed-lbl">points away</span>
              </div>
            </div>
          </div>

          <!-- Redesigned Scent Tier Benefits -->
          <div class="benefits-section mb-4">
            <h5 class="section-card-title mb-3">Tier Privileges & Benefits</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="benefit-card-luxury">
                  <div class="benefit-icon-wrapper"><i class="bi bi-gift"></i></div>
                  <div>
                    <h6 class="benefit-title">Complimentary Gift Wrapping</h6>
                    <p class="benefit-desc">Bespoke luxury cotton wraps and wax seals on every single order.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="benefit-card-luxury">
                  <div class="benefit-icon-wrapper"><i class="bi bi-chat-heart"></i></div>
                  <div>
                    <h6 class="benefit-title">Private Scent Consultations</h6>
                    <p class="benefit-desc">Book live video sessions directly with our master fragrance blending chandlers.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="benefit-card-luxury">
                  <div class="benefit-icon-wrapper"><i class="bi bi-truck-flatbed"></i></div>
                  <div>
                    <h6 class="benefit-title">Premium Courier Dispatch</h6>
                    <p class="benefit-desc">Complimentary carbon-neutral courier transport on purchases over $75.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="benefit-card-luxury">
                  <div class="benefit-icon-wrapper"><i class="bi bi-cup-hot"></i></div>
                  <div>
                    <h6 class="benefit-title">Early Discovery Access</h6>
                    <p class="benefit-desc">Pre-order privileges on limited small-batch collection edits 48h before release.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Stats, Gamification, Redeems, Logs -->
        <div class="col-lg-5">

          <!-- Lifetime loyalty Stats cards -->
          <div class="lifetime-stats-section mb-4">
            <h5 class="section-card-title mb-3">Lifetime Loyalty Statistics</h5>
            <div class="row g-2">
              <div class="col-6">
                <div class="stat-card-luxury">
                  <span class="stat-num-val">548</span>
                  <span class="stat-lbl-tag">Points Earned</span>
                </div>
              </div>
              <div class="col-6">
                <div class="stat-card-luxury">
                  <span class="stat-num-val">12</span>
                  <span class="stat-lbl-tag">Orders Completed</span>
                </div>
              </div>
              <div class="col-6">
                <div class="stat-card-luxury">
                  <span class="stat-num-val">4</span>
                  <span class="stat-lbl-tag">Rewards Claimed</span>
                </div>
              </div>
              <div class="col-6">
                <div class="stat-card-luxury">
                  <span class="stat-num-val">2024</span>
                  <span class="stat-lbl-tag">Member Since</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Gamified Challenges -->
          <div class="challenges-section mb-4 p-4 border rounded bg-light-card border-gold-glow">
            <h5 class="section-card-title mb-3 text-gold-accent"><i class="bi bi-lightning-charge"></i> Scent Challenges</h5>
            
            <div class="challenge-item mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="challenge-name">Complete 1 More Purchase</span>
                <span class="challenge-reward">+20 Bonus Pts</span>
              </div>
              <p class="challenge-desc text-muted mb-0">Order any candle from our winter collection to trigger reward.</p>
            </div>
            <div class="challenge-item-divider"></div>
            <div class="challenge-item">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="challenge-name">Unlock Platinum Level</span>
                <span class="challenge-reward">Spend $48 More</span>
              </div>
              <p class="challenge-desc text-muted mb-0">Qualify for elite benefits, priority shipping, and birthday gifts.</p>
            </div>
          </div>

          <!-- Exclusive Member Perks (Available rewards to redeem) -->
          <div class="perks-section mb-4">
            <h5 class="section-card-title mb-3">Available Scent Rewards</h5>
            <div class="row g-2">
              
              <!-- Reward 1 -->
              <div class="col-12">
                <div class="reward-perk-card">
                  <div class="perk-info">
                    <span class="perk-cost">50 Points</span>
                    <h6 class="perk-title">Free Carbon-Neutral Courier Shipping</h6>
                  </div>
                  <button class="btn btn-sm btn-vesper-outline py-2 btn-redeem-perk" data-perk="Free Shipping Voucher" data-cost="50">
                    <span>Redeem</span>
                  </button>
                </div>
              </div>

              <!-- Reward 2 -->
              <div class="col-12">
                <div class="reward-perk-card">
                  <div class="perk-info">
                    <span class="perk-cost">100 Points</span>
                    <h6 class="perk-title">Signature Candle Sample Scent (2 oz)</h6>
                  </div>
                  <button class="btn btn-sm btn-vesper-outline py-2 btn-redeem-perk" data-perk="Bespoke Scent Sample" data-cost="100">
                    <span>Redeem</span>
                  </button>
                </div>
              </div>

              <!-- Reward 3 -->
              <div class="col-12">
                <div class="reward-perk-card locked">
                  <div class="perk-info">
                    <span class="perk-cost">150 Points</span>
                    <h6 class="perk-title">Artisanal Scent Discovery Selection Box</h6>
                  </div>
                  <button class="btn btn-sm btn-vesper-outline py-2 btn-redeem-perk" disabled data-perk="Discovery Box" data-cost="150">
                    <span>Locked</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Point History Activity Timeline -->
          <div class="history-section">
            <h5 class="section-card-title mb-3">Loyalty Milestone Timeline</h5>
            <div class="rewards-timeline-logs">
              
              <!-- Log Row 1 -->
              <div class="timeline-log-row">
                <div class="log-indicator"><i class="bi bi-bag-check"></i></div>
                <div class="log-info">
                  <span class="log-date">Jan 03, 2026</span>
                  <h6 class="log-title">Tuscan Leather Purchase</h6>
                  <p class="log-subtitle text-muted mb-0">Order Reference #VV-482019</p>
                </div>
                <span class="log-points positive">+48 Points</span>
              </div>

              <!-- Log Row 2 -->
              <div class="timeline-log-row">
                <div class="log-indicator"><i class="bi bi-bag-check"></i></div>
                <div class="log-info">
                  <span class="log-date">Dec 15, 2025</span>
                  <h6 class="log-title">Lavender & Wild Honey Purchase</h6>
                  <p class="log-subtitle text-muted mb-0">Order Reference #VV-294723</p>
                </div>
                <span class="log-points positive">+52 Points</span>
              </div>

              <!-- Log Row 3 -->
              <div class="timeline-log-row">
                <div class="log-indicator"><i class="bi bi-gift"></i></div>
                <div class="log-info">
                  <span class="log-date">Nov 10, 2025</span>
                  <h6 class="log-title">Sanctuary Account Registration</h6>
                  <p class="log-subtitle text-muted mb-0">Atelier Sign-in Bonus Granted</p>
                </div>
                <span class="log-points positive">+28 Points</span>
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
    if (fill) fill.style.width = `${fillPercentage}%`;
  }, 150);
}

/**
 * Initialize rewards interactive event triggers
 */
export function initRewardsSection() {
  const container = document.getElementById('rewardsSection');
  if (!container) return;

  // Event delegation for Redeem buttons
  container.addEventListener('click', (e) => {
    const redeemBtn = e.target.closest('.btn-redeem-perk');
    if (!redeemBtn) return;
    
    e.preventDefault();
    const perkName = redeemBtn.dataset.perk;
    const cost = redeemBtn.dataset.cost;

    // Simulate custom promotional code generation
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'VV-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const alertMsg = `Success! Claimed "${perkName}" for ${cost} points. Promotional Code: ${code}. Apply at checkout.`;
    if (window.showToast) {
      window.showToast(alertMsg);
    } else {
      alert(alertMsg);
    }
  });
}
