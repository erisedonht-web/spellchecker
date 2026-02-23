(function () {
  'use strict';

  // 定数（パッチで変更される場合はここを編集）
  const FLASH_BASE_CD = 300; // 秒
  const COSMIC_INSIGHT_HASTE = 18;
  const IONIAN_HASTE = 10;
  const STORAGE_KEY = 'summoner-spell-checker';
  const ROLES = ['top', 'jungle', 'mid', 'adc', 'support'];

  let state = {
    cosmic: {},  // role -> boolean
    ionian: {},  // role -> boolean
    usedAt: {},  // role -> timestamp (ms)
    displayFormat: 'seconds'  // 'seconds' | 'mmss'
  };

  function formatRemaining(remaining) {
    const sec = Math.floor(remaining);
    if (state.displayFormat === 'mmss') {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    }
    return String(sec);
  }

  function getFlashCD(role) {
    let haste = 0;
    if (state.cosmic[role]) haste += COSMIC_INSIGHT_HASTE;
    if (state.ionian[role]) haste += IONIAN_HASTE;
    return Math.floor(FLASH_BASE_CD / (1 + haste / 100));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.cosmic && typeof parsed.cosmic === 'object') state.cosmic = parsed.cosmic;
        if (parsed.ionian && typeof parsed.ionian === 'object') state.ionian = parsed.ionian;
        if (parsed.usedAt && typeof parsed.usedAt === 'object') state.usedAt = parsed.usedAt;
        if (parsed.displayFormat === 'seconds' || parsed.displayFormat === 'mmss') state.displayFormat = parsed.displayFormat;
      }
    } catch (e) {
      console.warn('localStorage load failed', e);
    }
  }

  function updateDisplay() {
    ROLES.forEach(function (role) {
      const usedAt = state.usedAt[role];
      const cd = getFlashCD(role);
      const timerEl = document.querySelector('.lane-timer[data-role="' + role + '"]');
      const textEl = timerEl ? timerEl.querySelector('.timer-text') : null;
      const barEl = timerEl ? timerEl.querySelector('.timer-bar') : null;
      const flashBtn = document.querySelector('.flash-btn[data-role="' + role + '"]');

      if (!usedAt) {
        if (textEl) {
          textEl.textContent = 'Ready';
          textEl.classList.add('ready');
          textEl.classList.remove('cd');
        }
        if (barEl) barEl.style.setProperty('--progress', '0');
        if (flashBtn) flashBtn.disabled = false;
        syncRoleToggles(role);
        return;
      }

      const elapsed = (Date.now() - usedAt) / 1000;
      const remaining = Math.max(0, cd - elapsed);

      if (textEl) {
        textEl.classList.remove('ready');
        textEl.classList.add('cd');
        if (remaining <= 0) {
          textEl.textContent = 'Ready';
          textEl.classList.add('ready');
          delete state.usedAt[role];
          if (flashBtn) flashBtn.disabled = false;
          saveState();
        } else {
          textEl.textContent = formatRemaining(remaining);
        }
      }

      if (barEl) {
        const progress = remaining > 0 ? 1 - remaining / cd : 0;
        barEl.style.setProperty('--progress', String(progress));
      }
      syncRoleToggles(role);
    });
  }

  function syncRoleToggles(role) {
    ['cosmic', 'ionian'].forEach(function (option) {
      const value = state[option][role];
      const btn = document.querySelector('.lane-toggle[data-role="' + role + '"][data-option="' + option + '"]');
      if (btn) btn.setAttribute('aria-pressed', value ? 'true' : 'false');
    });
  }

  function setRoleToggle(role, option, value) {
    if (option === 'cosmic') state.cosmic[role] = !!value;
    if (option === 'ionian') state.ionian[role] = !!value;
    saveState();
    syncRoleToggles(role);
    updateDisplay();
  }

  function markFlashUsed(role) {
    state.usedAt[role] = Date.now();
    saveState();
    const btn = document.querySelector('.flash-btn[data-role="' + role + '"]');
    if (btn) btn.disabled = true;
    updateDisplay();
  }

  function resetRole(role) {
    delete state.usedAt[role];
    saveState();
    const btn = document.querySelector('.flash-btn[data-role="' + role + '"]');
    if (btn) btn.disabled = false;
    updateDisplay();
  }

  function resetAll() {
    state.usedAt = {};
    saveState();
    ROLES.forEach(function (role) {
      const btn = document.querySelector('.flash-btn[data-role="' + role + '"]');
      if (btn) btn.disabled = false;
    });
    updateDisplay();
  }

  function setDisplayFormat(format) {
    state.displayFormat = format;
    saveState();
    document.querySelectorAll('.format-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-format') === format);
    });
    updateDisplay();
  }

  function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-screen') === screenId);
    });
    const target = document.getElementById('screen-' + screenId);
    if (target) target.classList.add('active');
  }

  function init() {
    loadState();
    document.querySelectorAll('.format-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-format') === state.displayFormat);
    });
    updateDisplay();

    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchScreen(btn.getAttribute('data-screen'));
      });
    });

    document.querySelectorAll('.flash-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        markFlashUsed(btn.getAttribute('data-role'));
      });
    });

    document.querySelectorAll('.lane-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const role = btn.getAttribute('data-role');
        const option = btn.getAttribute('data-option');
        setRoleToggle(role, option, !state[option][role]);
      });
    });

    document.querySelectorAll('.btn-reset-lane').forEach(function (btn) {
      btn.addEventListener('click', function () {
        resetRole(btn.getAttribute('data-role'));
      });
    });

    document.getElementById('reset-all').addEventListener('click', resetAll);

    document.querySelectorAll('.format-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setDisplayFormat(btn.getAttribute('data-format'));
      });
    });

    setInterval(updateDisplay, 1000);
  }

  init();
})();
