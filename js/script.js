$(function() {
  // 全て閉じる関数
  function closeAllMenus() {
    // 💡開くクラスを消して、閉じるクラスをしっかりつける
    $('.nav-item-wrapper').removeClass('is-open').addClass('is-close');
    $('html, body').removeClass('menu-open');
  }

  // PC版：ホバー開閉（ここは元のままでOKです）
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

  // スマホ版：クリック開閉
  $('.nav-item').on('click', function(e) {
    if (window.innerWidth <= 768) {
      e.stopPropagation(); 
      
      var $wrapper = $(this).closest('.nav-item-wrapper');
      
      if ($wrapper.hasClass('is-open')) {
        closeAllMenus();
      } else {
        // 💡他のメニューの開閉クラスをリセット
        $('.nav-item-wrapper').not($wrapper).removeClass('is-open').addClass('is-close');
        
        // 💡ここがポイント：is-open を足すだけでなく、is-close をきっちり消す！
        $wrapper.addClass('is-open').removeClass('is-close');
        $('html, body').addClass('menu-open'); 
      }
    }
  });

  // 各種閉じるイベント（ここは元のままでOKです）
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



$(function () {
  $('.campaign-slider').slick({
    variableWidth: true,   // 各スライドを 310px 固定幅で扱う
    centerMode: true,      // アクティブスライドを中央に
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


$(function() {

  // 599px以下のプラン表エリアがスクロールされたら、最初の1回だけ実行
  $('.plan-table-scroll').one('scroll', function() {
    // 同じグループ内にあるヒント画像（.scroll-hint-overlay）を探して非表示クラスを付与
    $(this).siblings('.scroll-hint-overlay').addClass('is-hidden');
  });

});

$(function() {

  // サービス早見表（画像）エリアがスクロールされたら、最初の1回だけ実行
  $('.service-table-scroll').one('scroll', function() {
    // 隣にあるヒント画像に非表示クラスを付与
    $(this).siblings('.scroll-hint-overlay').addClass('is-hidden');
  });

});

$(function() {

  // サービス早見表（画像）エリアがスクロールされたら、最初の1回だけ実行
  $('.h-page-imgwrap').one('scroll', function() {
    $(this).find('.scroll-hint-overlay').addClass('is-hidden');
  });

});


// =========================================================
// sec-top-d — シム吉歩かせるアニメーション
// =========================================================

$(function() {
  
  // 画面に入ったかどうかを判定する監視カメラ（Observer）を作成
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // 💡 画面に入ったらアニメーション開始クラスを付与
        $(entry.target).addClass('is-animated');
        
        // 💡 【パターンA（1回だけ）の場合】：一度動いたら監視を解除して終了
        observer.unobserve(entry.target);
      }
    });
  }, {
    // 画面の上下10%にキャラクターが入ってきたら発火（発火タイミングの微調整用）
    rootMargin: '-30% 0px -30% 0px' 
  });

  // 対象のキャラクター（.simkichiwalk）を監視対象に登録する
  $('.simkichiwalk').each(function() {
    observer.observe(this);
  });

});


// =========================================================
// sec-top-g — eSIM / SIMカード タブ切替
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

      // タブ状態更新
      tabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      // パネル状態更新
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
// sec-top-h
//   - ハンドブック（目次クリック / ページ内 前へ・次へ）
//   - Customer Reviews スライダー（slick）
// =========================================================
(function ($) {
  'use strict';

  // ---------- ハンドブック ----------
  const root = document.querySelector('.sec-top-h');
  if (root) {
    const tocItems = root.querySelectorAll('.h-toc-item');
    const pages    = root.querySelectorAll('.h-page');
    const ctaLink  = root.querySelector('.h-cover-cta');

    function showPage(targetId) {
      // ページ表示切替
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
      // 目次状態
      tocItems.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-target') === targetId);
      });
    }

    // 目次クリック
    tocItems.forEach(function (t) {
      t.addEventListener('click', function () {
        showPage(t.getAttribute('data-target'));
      });
    });

    // 表紙の「ガイドを読む」
    if (ctaLink) {
      ctaLink.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(ctaLink.getAttribute('data-target'));
      });
    }

    // ページ内 前へ / 次へ / ▼
    root.querySelectorAll('.h-page').forEach(function (page) {
      const idx = parseInt(page.getAttribute('data-index') || '0', 10);

      page.querySelectorAll('.h-nav-prev, .h-nav-next, .h-nav-down').forEach(function (btn) {
        btn.addEventListener('click', function () {
          let next = idx;
          if (btn.classList.contains('h-nav-prev')) next = idx - 1;
          else                                     next = idx + 1;     // next / down 共に +1

          if (next < 0 || next > 6) return;
          showPage('h-page-' + String(next).padStart(2, '0'));
        });
      });
    });
  }

  // ---------- Customer Reviews スライダー ----------

})(window.jQuery);


// f-slider
$(function () {
  $(".f-slider").slick({
    autoplay: true,
    dots: true,
    variableWidth: true,
    prevArrow: '<img src="../img/sec-top-h/sliderarrow.png" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="../img/sec-top-h/sliderarrow.png" class="slide-arrow next-arrow">',
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


document.addEventListener('DOMContentLoaded', () => {
  // .top_b セクション内のタブ要素とパネル要素をすべて取得
  const tabs = document.querySelectorAll('.a-top_b__tab');
  const panels = document.querySelectorAll('.a-top_b__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. クリックされたタブの data-tab 属性の値を取得 (例: "sim" や "set")
      const targetTab = tab.getAttribute('data-tab');

      // 2. すべてのタブの活性化状態（クラス、aria属性）をクリア
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      // 3. クリックされたタブだけをアクティブにする
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // 4. すべてのパネルを一度非表示 [hidden] にする
      panels.forEach(panel => {
        panel.setAttribute('hidden', '');
      });

      // 5. data-panel の値が、取得した data-tab と一致するパネルだけを表示（hiddenを解除）
      const targetPanel = document.querySelector(`.a-top_b__panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });
});

