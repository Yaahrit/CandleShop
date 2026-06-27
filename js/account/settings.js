/* ============================================
   VESPER & VINE - Settings Tab controller
   ============================================ */
import { saveProfileSettings } from './api.js';

/**
 * Setup validation checking, avatar upload, and password eye togglers
 * @param {object} user 
 */
export function initSettingsSection(user) {
  const form = document.getElementById('settingsForm');
  const avatarInput = document.getElementById('settingsAvatarFile');
  const avatarTrigger = document.getElementById('settingsAvatarTrigger');
  const avatarImg = document.getElementById('settingsAvatarImg');
  const avatarPlaceholder = document.getElementById('settingsAvatarPlaceholder');

  if (!form) return;

  // 1. Initial paint of values from localStorage
  const fn = document.getElementById('settingsFirstName');
  const ln = document.getElementById('settingsLastName');
  const em = document.getElementById('settingsEmail');
  const ph = document.getElementById('settingsPhone');

  if (fn) fn.value = user.firstName || '';
  if (ln) ln.value = user.lastName || '';
  if (em) em.value = user.email || '';
  
  // Try to read profile picture if saved in localStorage
  const cachedPic = localStorage.getItem('vesperProfileAvatar');
  if (cachedPic && avatarImg) {
    avatarImg.src = cachedPic;
    avatarImg.classList.remove('d-none');
    if (avatarPlaceholder) avatarPlaceholder.classList.add('d-none');
  }

  // 2. Avatar File Upload Handler
  if (avatarTrigger && avatarInput) {
    avatarTrigger.addEventListener('click', () => avatarInput.click());
    
    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // File size check (limit to 1.5MB for mock storage)
        if (file.size > 1500000) {
          if (window.showToast) {
            window.showToast('Please select an image smaller than 1.5MB');
          } else {
            alert('Please select an image smaller than 1.5MB');
          }
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Img = event.target.result;
          localStorage.setItem('vesperProfileAvatar', base64Img);
          
          if (avatarImg) {
            avatarImg.src = base64Img;
            avatarImg.classList.remove('d-none');
          }
          if (avatarPlaceholder) {
            avatarPlaceholder.classList.add('d-none');
          }
          
          if (window.showToast) {
            window.showToast('Profile photo updated successfully!');
          }
          // Update other occurrences on page if any (e.g. sidebar avatar icon if it's an img)
          const sidebarAvatarImg = document.getElementById('sidebarAvatarImg');
          if (sidebarAvatarImg) {
            sidebarAvatarImg.src = base64Img;
            sidebarAvatarImg.classList.remove('d-none');
            const sidebarAvatarPlaceholder = document.getElementById('sidebarAvatarPlaceholder');
            if (sidebarAvatarPlaceholder) sidebarAvatarPlaceholder.classList.add('d-none');
          }
          const drawerAvatarMonogram = document.getElementById('drawerAvatarMonogram');
          if (drawerAvatarMonogram) {
            drawerAvatarMonogram.innerHTML = `<img src="${base64Img}" alt="Profile Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
            drawerAvatarMonogram.style.background = 'none';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 3. Password Visibility Eye Toggle
  const togglers = document.querySelectorAll('.password-toggle-settings');
  togglers.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.dataset.toggle;
      const input = document.getElementById(inputId);
      const icon = btn.querySelector('i');
      if (input && icon) {
        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'bi bi-eye-slash';
        } else {
          input.type = 'password';
          icon.className = 'bi bi-eye';
        }
      }
    });
  });

  // 4. Form submission validations
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = fn?.value.trim() || '';
    const lastName = ln?.value.trim() || '';
    const email = em?.value.trim() || '';
    const phone = ph?.value.trim() || '';
    const currentPass = document.getElementById('currentPassword')?.value || '';
    const newPass = document.getElementById('newPassword')?.value || '';

    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      em.classList.add('is-invalid');
      return;
    } else {
      em.classList.remove('is-invalid');
    }

    // Validate password constraints if new password was entered
    if (newPass && newPass.length < 8) {
      const np = document.getElementById('newPassword');
      if (np) np.classList.add('is-invalid');
      return;
    } else {
      const np = document.getElementById('newPassword');
      if (np) np.classList.remove('is-invalid');
    }

    // Call API updates
    try {
      const updatedUser = await saveProfileSettings({ firstName, lastName, email, phone });
      
      // Update global displays
      const nameEl = document.getElementById('profileName');
      const emailEl = document.getElementById('profileEmail');
      if (nameEl) nameEl.textContent = `${updatedUser.firstName} ${updatedUser.lastName}`.trim();
      if (emailEl) emailEl.textContent = updatedUser.email;

      const welcomeEl = document.getElementById('dashboardWelcome');
      if (welcomeEl) {
        welcomeEl.textContent = `Welcome back, ${updatedUser.firstName || 'Guest'}`;
      }

      // Update offcanvas profile details
      const drawerName = document.getElementById('drawerUserName');
      const drawerEmail = document.getElementById('drawerUserEmail');
      if (drawerName) drawerName.textContent = `${updatedUser.firstName} ${updatedUser.lastName}`.trim();
      if (drawerEmail) drawerEmail.textContent = updatedUser.email;

      // Clear password fields
      const cp = document.getElementById('currentPassword');
      const np = document.getElementById('newPassword');
      if (cp) cp.value = '';
      if (np) np.value = '';

      if (window.showToast) {
        window.showToast('Profile changes saved successfully');
      } else {
        alert('Profile changes saved successfully');
      }
    } catch (err) {
      console.error(err);
      if (window.showToast) {
        window.showToast('Failed to save settings.');
      } else {
        alert('Failed to save settings.');
      }
    }
  });
}
