/* ============================================
   VESPER & VINE - Customer Payment Methods Controller
   ============================================ */
import { isHttpMode } from './api.js';

let paymentMethods = [];

/**
   Get active payment methods list from localStorage (fallback) or user cached settings
 */
function getPaymentMethods() {
  const cachedUser = JSON.parse(localStorage.getItem('vesperUser') || '{}');
  return cachedUser.paymentMethods || [
    {
      id: 'pm-1',
      cardholderName: 'Flora Merrit',
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '12/28',
      cardType: 'Visa',
      isDefault: true
    }
  ];
}

/**
 * Render the Payment Methods tab
 */
export function renderPaymentsTab() {
  const container = document.getElementById('paymentsSection');
  if (!container) return;

  const cardContainer = container.querySelector('.profile-content-card');
  if (!cardContainer) return;

  paymentMethods = getPaymentMethods();

  const cardsHtml = paymentMethods.map(pm => `
    <div class="col-md-6 mb-4">
      <div class="payment-card-visual p-4 rounded-sm border" style="background: linear-gradient(135deg, var(--clr-bg-dark) 0%, var(--clr-black) 100%); color: var(--clr-white); min-height: 180px; display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(255,255,255,0.08); box-shadow: var(--shadow-md); position: relative; overflow: hidden;">
        <div style="position: absolute; width: 120px; height: 120px; background: radial-gradient(circle, rgba(196, 169, 125, 0.15) 0%, transparent 70%); top: -40px; right: -40px;"></div>
        
        <div class="d-flex justify-content-between align-items-start">
          <span style="font-family: var(--ff-body); font-size: 0.65rem; letter-spacing: 0.15em; font-weight: 500; opacity: 0.7;">VESPER & VINE SANCTUARY CARD</span>
          <span style="font-family: var(--ff-heading); font-size: 1.1rem; font-style: italic; font-weight: 300; color: var(--clr-gold);">${pm.cardType}</span>
        </div>

        <div class="my-3">
          <div style="font-size: 1.15rem; letter-spacing: 0.12em; font-family: var(--ff-body); font-weight: 350;">${pm.cardNumber}</div>
        </div>

        <div class="d-flex justify-content-between align-items-end">
          <div>
            <div style="font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.6; margin-bottom: 2px;">Cardholder</div>
            <div style="font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em;">${pm.cardholderName}</div>
          </div>
          <div class="text-end">
            <div style="font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.6; margin-bottom: 2px;">Expires</div>
            <div style="font-size: 0.8rem; font-weight: 500;">${pm.expiryDate}</div>
          </div>
        </div>

        <!-- Default Tag -->
        ${pm.isDefault ? `
          <span style="position: absolute; right: 15px; bottom: 50px; background-color: var(--clr-gold); color: var(--clr-black); font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 6px; border-radius: var(--radius-sm);">Default</span>
        ` : ''}

        <!-- Delete button overlay -->
        <button class="btn btn-sm btn-outline-light btn-delete-card" data-id="${pm.id}" style="position: absolute; right: 10px; top: 10px; opacity: 0.6; font-size: 0.65rem; border: none; background: transparent; transition: all 0.2s ease;">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join('');

  cardContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="serif-heading mb-1" style="font-family: var(--ff-heading); font-size: 1.8rem; font-weight: 350;">Saved Payment Methods</h3>
        <p class="text-muted mb-0" style="font-size: 0.85rem;">Manage your debit, credit, or express checkout methods safely.</p>
      </div>
      <button class="btn-vesper" id="btnAddPaymentCard" style="padding: 0.5rem 1.25rem; font-size: 0.72rem;">
        <span>Add New Card</span>
      </button>
    </div>

    <!-- Cards display -->
    <div class="row">
      ${paymentMethods.length === 0 ? `
        <div class="col-12 text-center py-5">
          <i class="bi bi-credit-card text-muted" style="font-size: 3rem;"></i>
          <h5 class="mt-3 text-muted">No payment methods saved</h5>
          <p class="text-muted text-sm">Add a card for a faster checkout experience during your scent discoveries.</p>
        </div>
      ` : cardsHtml}
    </div>

    <!-- Card Form Modal Backdrop (simulated structure) -->
    <div class="modal fade" id="addCardModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: var(--radius-sm); border: none; background-color: var(--clr-bg);">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title" style="font-family: var(--ff-heading); font-weight: 400; color: var(--clr-text);">Add Saved Card</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="addCardForm">
            <div class="modal-body text-muted" style="font-size: 0.85rem; line-height: 1.6; font-family: var(--ff-body);">
              <div class="mb-3">
                <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Cardholder Name</label>
                <input type="text" class="form-control" id="cardName" style="font-size: 0.85rem;" placeholder="Flora Merrit" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Card Number</label>
                <input type="text" class="form-control" id="cardNumber" style="font-size: 0.85rem;" placeholder="4111 2222 3333 4444" required maxlength="19">
              </div>
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Expiry Date (MM/YY)</label>
                  <input type="text" class="form-control" id="cardExpiry" style="font-size: 0.85rem;" placeholder="12/28" required maxlength="5">
                </div>
                <div class="col-6">
                  <label class="form-label text-muted mb-1" style="font-size: 0.75rem;">Card Brand Type</label>
                  <select class="form-select" id="cardTypeSelect" style="font-size: 0.85rem;">
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Amex">American Express</option>
                  </select>
                </div>
              </div>
              <div class="form-check-vesper mb-2">
                <input type="checkbox" id="cardDefault" checked> Set as default payment method
              </div>
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn-vesper-outline" data-bs-dismiss="modal" style="padding: 0.5rem 1.5rem; font-size: 0.7rem;"><span>Cancel</span></button>
              <button type="submit" class="btn-vesper" style="padding: 0.5rem 1.5rem; font-size: 0.7rem;"><span>Save Card</span></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Bind actions
  const btnAdd = document.getElementById('btnAddPaymentCard');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addCardModal'));
      modal.show();
    });
  }

  const addCardForm = document.getElementById('addCardForm');
  if (addCardForm) {
    addCardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const cardData = {
        cardholderName: document.getElementById('cardName').value.trim(),
        cardNumber: document.getElementById('cardNumber').value.replace(/\s+/g, ''),
        expiryDate: document.getElementById('cardExpiry').value.trim(),
        cardType: document.getElementById('cardTypeSelect').value,
        isDefault: document.getElementById('cardDefault').checked
      };

      const token = localStorage.getItem('vesperAuthToken');
      if (isHttpMode() && token) {
        try {
          const res = await fetch('/api/auth/payment-methods', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ action: 'save', cardData })
          });
          if (res.ok) {
            const updatedMethods = await res.json();
            updateCachedPaymentMethods(updatedMethods);
            bootstrap.Modal.getInstance(document.getElementById('addCardModal')).hide();
            renderPaymentsTab();
            if (window.showToast) window.showToast('Card saved successfully');
            return;
          }
        } catch (err) {
          console.warn('Payment API call failed. Saving card details locally.', err);
        }
      }

      // Offline Mock Save
      const current = getPaymentMethods();
      const last4 = cardData.cardNumber.slice(-4);
      const newMethod = {
        id: 'pm-' + Math.floor(1000 + Math.random() * 9000),
        cardholderName: cardData.cardholderName,
        cardNumber: `•••• •••• •••• ${last4}`,
        expiryDate: cardData.expiryDate,
        cardType: cardData.cardType,
        isDefault: cardData.isDefault
      };
      if (newMethod.isDefault) {
        current.forEach(c => c.isDefault = false);
      }
      current.push(newMethod);
      updateCachedPaymentMethods(current);

      bootstrap.Modal.getInstance(document.getElementById('addCardModal')).hide();
      renderPaymentsTab();
      if (window.showToast) window.showToast('Card saved successfully (Local Mode)');
    });
  }

  // Delete handlers
  cardContainer.querySelectorAll('.btn-delete-card').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (!confirm('Are you sure you want to delete this payment method?')) return;

      const token = localStorage.getItem('vesperAuthToken');
      if (isHttpMode() && token) {
        try {
          const res = await fetch('/api/auth/payment-methods', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ action: 'delete', methodId: id })
          });
          if (res.ok) {
            const updatedMethods = await res.json();
            updateCachedPaymentMethods(updatedMethods);
            renderPaymentsTab();
            if (window.showToast) window.showToast('Card deleted successfully');
            return;
          }
        } catch (err) {
          console.warn('Payment deletion failed.', err);
        }
      }

      // Local offline delete fallback
      const current = getPaymentMethods().filter(pm => pm.id !== id);
      updateCachedPaymentMethods(current);
      renderPaymentsTab();
      if (window.showToast) window.showToast('Card deleted (Local Mode)');
    });
  });
}

function updateCachedPaymentMethods(methods) {
  const cachedUser = JSON.parse(localStorage.getItem('vesperUser') || '{}');
  cachedUser.paymentMethods = methods;
  localStorage.setItem('vesperUser', JSON.stringify(cachedUser));
}
