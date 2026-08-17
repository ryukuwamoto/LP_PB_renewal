// =========================================================
// ヘッダー：メガメニューの開閉（PC＝ホバー / SP＝タップ）
// =========================================================
$(function() {
  function closeAllMenus() {
    $('.nav-item-wrapper').removeClass('is-open').addClass('is-close');
    $('html, body').removeClass('menu-open');
  }

  $('.nav-item-wrapper').on('mouseenter', function() {
    if (window.innerWidth > 768) {
      $(this).addClass('is-open').removeClass('is-close');
      $('html, body').addClass('menu-open');
    }
  }).on('mouseleave', function() {
    if (window.innerWidth > 768) {
      $(this).removeClass('is-open');
      $('html, body').removeClass('menu-open');
    }
  });

  $('.nav-item').on('click', function(e) {
    if (window.innerWidth <= 768) {
      e.stopPropagation();

      var $wrapper = $(this).closest('.nav-item-wrapper');

      if ($wrapper.hasClass('is-open')) {
        closeAllMenus();
      } else {
        $('.nav-item-wrapper').not($wrapper).removeClass('is-open').addClass('is-close');

        $wrapper.addClass('is-open').removeClass('is-close');
        $('html, body').addClass('menu-open');
      }
    }
  });

  $('.menu-close-btn').on('click', function(e) {
    e.stopPropagation();
    closeAllMenus();
  });

  $('.mega-menu a').on('click', function() {
    closeAllMenus();
  });

  $(document).on('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!$(e.target).closest('.nav-item-wrapper').length) {
        closeAllMenus();
      }
    }
  });
});

// =========================================================
// sec-top-b：キャンペーンバナースライダー（slick）
// =========================================================
$(function () {
  $('.campaign-slider').slick({
    variableWidth: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    speed: 600,
    arrows: false,
    dots: true,
    infinite: true,
    swipe: true,
    swipeToSlide: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    dotsClass: "b-slide-dots"
  });
});

// =========================================================
// plan.html：プラン表の横スクロールヒントを消す
// =========================================================
$(function() {

  $('.plan-table-scroll').one('scroll', function() {
    $(this).siblings('.scroll-hint-overlay').addClass('is-hidden');
  });

});

// =========================================================
// sec-top-e：サービス早見表の横スクロールヒントを消す
// =========================================================
$(function() {

  $('.service-table-scroll').one('scroll', function() {
    $(this).siblings('.scroll-hint-overlay').addClass('is-hidden');
  });

});

// =========================================================
// sec-top-h：ハンドブック画像のスクロールヒントを消す
// =========================================================
$(function() {

  $('.h-page-imgwrap').one('scroll', function() {
    $(this).find('.scroll-hint-overlay').addClass('is-hidden');
  });

});

// =========================================================
// sec-top-d：シム吉ウォークアニメーション
// =========================================================
$(function() {

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('is-animated');

        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '-30% 0px -30% 0px'
  });

  $('.simkichiwalk').each(function() {
    observer.observe(this);
  });

});

// =========================================================
// sec-top-g：eSIM / SIMカードのタブ切替
// =========================================================
(function () {
  'use strict';

  const root = document.querySelector('.sec-top-g');
  if (!root) return;

  const tabs   = root.querySelectorAll('.g-tab');
  const panels = root.querySelectorAll('.g-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      tabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach(function (p) {
        const active = p.id === targetId;
        p.classList.toggle('is-active', active);
        if (active) {
          p.removeAttribute('hidden');
        } else {
          p.setAttribute('hidden', '');
        }
      });
    });
  });
})();

// =========================================================
// sec-top-h：ハンドブック（目次クリック / 前へ・次へ）
// =========================================================
(function ($) {
  'use strict';

  const root = document.querySelector('.sec-top-h');
  if (root) {
    const tocItems = root.querySelectorAll('.h-toc-item');
    const pages    = root.querySelectorAll('.h-page');
    const ctaLink  = root.querySelector('.h-cover-cta');

    function showPage(targetId) {
      pages.forEach(function (p) {
        const active = p.id === targetId;
        p.classList.toggle('is-active', active);
        if (active) {
          p.removeAttribute('hidden');

          const imgWrap = p.querySelector('.h-page-imgwrap');
          if (imgWrap) {
            imgWrap.scrollTop = 0;
          }

        } else {
          p.setAttribute('hidden', '');
        }
      });
      tocItems.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-target') === targetId);
      });
    }

    tocItems.forEach(function (t) {
      t.addEventListener('click', function () {
        showPage(t.getAttribute('data-target'));
      });
    });

    if (ctaLink) {
      ctaLink.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(ctaLink.getAttribute('data-target'));
      });
    }

    root.querySelectorAll('.h-page').forEach(function (page) {
      const idx = parseInt(page.getAttribute('data-index') || '0', 10);

      page.querySelectorAll('.h-nav-prev, .h-nav-next, .h-nav-down').forEach(function (btn) {
        btn.addEventListener('click', function () {
          let next = idx;
          if (btn.classList.contains('h-nav-prev')) next = idx - 1;
          else                                     next = idx + 1;

          if (next < 0 || next > 6) return;
          showPage('h-page-' + String(next).padStart(2, '0'));
        });
      });
    });
  }


})(window.jQuery);

// =========================================================
// sec-top-h：お客様の声スライダー（slick）
// =========================================================
$(function () {
  $(".f-slider").slick({
    autoplay: true,
    dots: true,
    variableWidth: true,
    prevArrow: '<img src="img/sec-top-h/sliderarrow.png" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="img/sec-top-h/sliderarrow.png" class="slide-arrow next-arrow">',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 748,
      settings: {
        slidesToShow: 1,
      }
    }
  ],
    autoplaySpeed: 2000,
    dotsClass: "f-slide-dots",
  });
});

// =========================================================
// lineup.html：申し込みフォームのSIMタイプ タブ切替
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.a-top_b__tab');
  const panels = document.querySelectorAll('.a-top_b__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        panel.setAttribute('hidden', '');
      });

      const targetPanel = document.querySelector(`.a-top_b__panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });
});

// =========================================================
// lineup30.html：申し込みフォームのSIMタイプ タブ切替
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.a-top_b-s__tab');
  const panels = document.querySelectorAll('.a-top_b-s__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        panel.setAttribute('hidden', '');
      });

      const targetPanel = document.querySelector(`.a-top_b-s__panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });
});

// =========================================================
// lineup.html：SIMタイプに応じた配送方法プルダウンの出し分け
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const selectWrapper = document.querySelector('.a-top_b__selects');
  if (!selectWrapper) return;

  const selects = selectWrapper.querySelectorAll('select');
  const simTypeSelect = selects[0];
  const deliverySelect = selects[2];
  const optionsMap = {
    default: `<option value="" selected disabled hidden>SIMタイプから選択してください</option>`,

    esim: `
      <option value="" selected disabled hidden>必要事項の確認</option>
      <option value="0" data-plm="1">eSIM搭載端末か確認しメールでの配送を了承した</option>
    `,

    simCard: `
      <option value="" selected disabled hidden>配送方法を選択</option>
      <option value="0" data-plm="1">日本国内ポスト投函(＋0円)</option>
      <option value="550" data-plm="S550">日時指定(＋550円)</option>
      <option value="1100" data-plm="S1100">日時指定/北海道・沖縄・離島(＋1,100円)</option>
      <option value="1100" data-plm="K1100">カナダ配送(＋1,100円)</option>
    `
  };

  function updateDeliveryOptions() {
    const selectedValue = simTypeSelect.value;

    if (selectedValue === "3500") {
      deliverySelect.innerHTML = optionsMap.esim;
    } else if (selectedValue === "3000") {
      deliverySelect.innerHTML = optionsMap.simCard;
    } else {
      deliverySelect.innerHTML = optionsMap.default;
    }
  }

  simTypeSelect.addEventListener('change', updateDeliveryOptions);

  updateDeliveryOptions();
});

// =========================================================
// lineup30.html：SIMタイプに応じた配送方法プルダウンの出し分け
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const selectWrapper = document.querySelector('.a-top_b-s__selects');
  if (!selectWrapper) return;

  const selects = selectWrapper.querySelectorAll('select');
  const simTypeSelect = selects[0];
  const deliverySelect = selects[2];
  const optionsMap = {
    default: `<option value="" selected disabled hidden>SIMタイプから選択してください</option>`,

    esim: `
      <option value="" selected disabled hidden>必要事項の確認</option>
      <option value="0" data-plm="1">eSIM搭載端末か確認しメールでの配送を了承した</option>
    `,

    simCard: `
      <option value="" selected disabled hidden>配送方法を選択</option>
      <option value="0" data-plm="1">日本国内ポスト投函(＋0円)</option>
      <option value="550" data-plm="S550">日時指定(＋550円)</option>
      <option value="1100" data-plm="S1100">日時指定/北海道・沖縄・離島(＋1,100円)</option>
      <option value="1100" data-plm="K1100">アメリカ/カナダ配送(＋1,100円)</option>
    `
  };

  function updateDeliveryOptions() {
    const selectedValue = simTypeSelect.value;

    if (selectedValue === "3500") {
      deliverySelect.innerHTML = optionsMap.esim;
    } else if (selectedValue === "3000") {
      deliverySelect.innerHTML = optionsMap.simCard;
    } else {
      deliverySelect.innerHTML = optionsMap.default;
    }
  }

  simTypeSelect.addEventListener('change', updateDeliveryOptions);

  updateDeliveryOptions();
});

// =========================================================
// 共通：セレクトボックスの選択でページ遷移
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-link-select').forEach((label) => {
    const select = label.matches('select') ? label : label.querySelector('select');
    if (!select) return;

    select.addEventListener('change', (e) => {
      const url = e.target.value;
      if (url && url !== '#') window.location.href = url;
    });
  });
});

// =========================================================
// お申し込みプルダウン（PC＝ホバーでボタン直下に吹き出し）
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.js-link-menu');
  const overlays = document.querySelectorAll('.js-menu-overlay');
  if (!triggers.length) return;

  const mqPc = window.matchMedia('(min-width: 769px)');

  const setOverlay = (show) => {
    overlays.forEach((o) => { o.hidden = !show; });
  };

  const closeAll = () => {
    triggers.forEach((t) => {
      const m = t.querySelector('.c-os-menu');
      if (m) m.hidden = true;
      t.classList.remove('is-open');
      t.setAttribute('aria-expanded', 'false');
    });
    setOverlay(false);
  };

  triggers.forEach((trigger) => {
    const menu = trigger.querySelector('.c-os-menu');
    if (!menu) return;

    const open = () => {
      closeAll();
      menu.hidden = false;
      trigger.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      setOverlay(true);
    };

    trigger.addEventListener('mouseenter', () => { if (mqPc.matches) open(); });
    trigger.addEventListener('mouseleave', () => { if (mqPc.matches) closeAll(); });

    trigger.addEventListener('keydown', (e) => {
      if (!mqPc.matches) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); menu.hidden ? open() : closeAll(); }
      else if (e.key === 'Escape') closeAll();
    });

    menu.querySelectorAll('[data-href]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = item.dataset.href;
        if (url) window.location.href = url;
      });
    });
  });

  overlays.forEach((o) => o.addEventListener('click', closeAll));
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.js-link-menu')) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  if (mqPc.addEventListener) mqPc.addEventListener('change', closeAll);
  else mqPc.addListener(closeAll);
});

// =========================================================
// お申し込みモーダル（SP＝全画面グレー＋中央の小窓）
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const openers = document.querySelectorAll('.js-apply-open');
  const modal   = document.querySelector('.js-apply-modal');
  if (!openers.length || !modal) return;

  const mqApplyPc = window.matchMedia('(min-width: 769px)');

  const open = () => {
    modal.hidden = false;
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    openers.forEach((o) => o.setAttribute('aria-expanded', 'true'));
  };

  const close = () => {
    modal.hidden = true;
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    openers.forEach((o) => o.setAttribute('aria-expanded', 'false'));
  };

  openers.forEach((opener) => {
    opener.addEventListener('click', (e) => {
      if (mqApplyPc.matches) return;
      e.stopPropagation();
      opener.focus({ preventScroll: true });
      modal.hidden ? open() : close();
    });

    opener.addEventListener('keydown', (e) => {
      if (mqApplyPc.matches) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); modal.hidden ? open() : close(); }
      else if (e.key === 'Escape') close();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('.c-os-menu__inner')) return;
    close();
  });

  modal.querySelectorAll('[data-href]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = item.dataset.href;
      if (url) window.location.href = url;
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const onApplyMqChange = () => { if (mqApplyPc.matches) close(); };
  if (mqApplyPc.addEventListener) mqApplyPc.addEventListener('change', onApplyMqChange);
  else mqApplyPc.addListener(onApplyMqChange);
});

// =========================================================
// plan.html：ご利用サイクルのタブ切替
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.p-cycle__tab');
  const panels = document.querySelectorAll('.p-cycle__panel');
  const cycleBack = document.querySelector('.p-cycle__back');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      if (cycleBack) {
        cycleBack.setAttribute('data-active-tab', targetTab);
      }

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        panel.setAttribute('hidden', '');
      });

      const targetPanel = document.querySelector(`.p-cycle__panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });
});

// =========================================================
// plan.html：料金プランのタブ切替
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.p-plan__tab');
  const panels = document.querySelectorAll('.p-plan__panel');
  const cycleBack = document.querySelector('.p-plan__back');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      if (cycleBack) {
        cycleBack.setAttribute('data-active-tab', targetTab);
      }

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        panel.setAttribute('hidden', '');
      });

      const targetPanel = document.querySelector(`.p-plan__panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });
});

// =========================================================
// 共通：window-shape（下向き五角形をSVGで描画）
// =========================================================
(function () {
  'use strict';
  var SVGNS = 'http://www.w3.org/2000/svg';

  function roundedPolyPath(pts, radii) {
  var n = pts.length, d = '';
  var sub = function (a, b) { return { x: a.x - b.x, y: a.y - b.y }; };
  var len = function (v) { return Math.hypot(v.x, v.y); };
  var nrm = function (v) { var l = len(v) || 1; return { x: v.x / l, y: v.y / l }; };

  var seg = [];
  for (var i = 0; i < n; i++) {
    var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    var v1 = nrm(sub(p0, p1)), v2 = nrm(sub(p2, p1));
    var l1 = len(sub(p0, p1)), l2 = len(sub(p2, p1));
    var r = radii[i] || 0;
    var theta = Math.acos(Math.max(-1, Math.min(1, v1.x * v2.x + v1.y * v2.y)));
    var dist = (r > 0 && theta > 0.01 && theta < Math.PI - 0.01)
      ? r / Math.tan(theta / 2)
      : 0;
    seg.push({ p1: p1, v1: v1, v2: v2, l1: l1, l2: l2, theta: theta, dist: dist });
  }

  for (var i = 0; i < n; i++) {
    var cur = seg[i], nxt = seg[(i + 1) % n], edge = cur.l2;
    var over = cur.dist + nxt.dist;
    if (over > edge && over > 0) { var k = edge / over; cur.dist *= k; nxt.dist *= k; }
  }

  for (var i = 0; i < n; i++) {
    var s = seg[i], p1 = s.p1;
    if (s.dist <= 0.01) {
      d += (i === 0 ? 'M' : 'L') + p1.x.toFixed(2) + ',' + p1.y.toFixed(2) + ' ';
      continue;
    }
    var arcR = s.dist * Math.tan(s.theta / 2);
    var t1 = { x: p1.x + s.v1.x * s.dist, y: p1.y + s.v1.y * s.dist };
    var t2 = { x: p1.x + s.v2.x * s.dist, y: p1.y + s.v2.y * s.dist };
    var sweep = (s.v1.x * s.v2.y - s.v1.y * s.v2.x) < 0 ? 1 : 0;
    d += (i === 0 ? 'M' : 'L') + t1.x.toFixed(2) + ',' + t1.y.toFixed(2) + ' ';
    d += 'A' + arcR.toFixed(2) + ',' + arcR.toFixed(2) + ' 0 0 ' + sweep + ' ' +
         t2.x.toFixed(2) + ',' + t2.y.toFixed(2) + ' ';
  }
  return d + 'Z';
}

  function ensureSvg(shape) {
    var svg = shape.querySelector('.window-shape-svg');
    if (svg) return svg;
    svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'window-shape-svg');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.appendChild(document.createElementNS(SVGNS, 'path'));
    shape.insertBefore(svg, shape.firstChild);
    return svg;
  }

  function draw(shape) {
    var W = shape.clientWidth, H = shape.clientHeight;
    if (!W || !H) return;
    var cs = getComputedStyle(shape);
    var R = parseFloat(cs.getPropertyValue('--ws-r')) || 10;
    var T = parseFloat(cs.getPropertyValue('--ws-tip')) || 49;
    if (T > H) T = H;
    var svg = ensureSvg(shape);
    var pts = [
      { x: 0, y: 0 }, { x: W, y: 0 },
      { x: W, y: H - T }, { x: W / 2, y: H }, { x: 0, y: H - T }
    ];
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.querySelector('path').setAttribute('d', roundedPolyPath(pts, [R, R, R, 0, R]));
  }

  function initWindowShape() {
    var shapes = Array.prototype.slice.call(document.querySelectorAll('.window-shape'));
    if (!shapes.length) return;
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (e) { draw(e.target); });
      });
      shapes.forEach(function (s) { ro.observe(s); draw(s); });
    } else {
      var redraw = function () { shapes.forEach(draw); };
      shapes.forEach(draw);
      window.addEventListener('resize', redraw);
      window.addEventListener('orientationchange', redraw);
    }
    window.addEventListener('load', function () { shapes.forEach(draw); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWindowShape);
  } else {
    initWindowShape();
  }
})();
