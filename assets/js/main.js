document.addEventListener('DOMContentLoaded', function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  const hamburgerButton = document.querySelector('#js-buttonHamburger');
  const drawerMenu = document.getElementById('drawerMenu');
  const header = document.querySelector('.header');

  hamburgerButton.addEventListener('click', () => {
    // 現在の状態を取得
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
    // 状態を反転
    const newState = !isExpanded;
    // ボタンの状態を更新
    hamburgerButton.setAttribute('aria-expanded', newState);
    // クラスの切り替え
    hamburgerButton.classList.toggle('open');
    drawerMenu.classList.toggle('open');
    header.classList.toggle('open');
  });

  // スクロール防止の制御
  function toggleScrollLock() {
    document.body.style.overflow = drawerMenu.classList.contains('open') ? 'hidden' : '';
  }

  // メニュー内のリンクをクリックした時の処理
  const menuLinks = drawerMenu.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburgerButton.setAttribute('aria-expanded', 'false');
      drawerMenu.classList.remove('open');
      header.classList.remove('open');
      hamburgerButton.classList.remove('open');
      toggleScrollLock();
    });
  });

  /*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内リンクのイベント
  $('a[href^="#"]').click(function () {
    // リンクを取得
    let href = $(this).attr('href');
    // ジャンプ先のid名をセット
    let target = $(href == '#' || href == '' ? 'html' : href);
    // トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    // animateでスムーススクロールを行う
    // 600はスクロール速度で単位はミリ秒
    $('html, body').animate({scrollTop: position}, 600, 'swing');
    return false;
  });

  /*=================================================
  フェード表示
  ===================================================*/
  let elements = document.querySelectorAll('.fade-in');

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });

  /*=================================================
  スクロール時のイベント
  ===================================================*/
  $(window).scroll(function () {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();
    let fv = document.getElementById('fv');
    let fvHeight = fv.clientHeight;
    // console.log('高さ：' + fvHeight +'px');

    /*=================================================
    ヘッダーの背景表示
    ===================================================*/
    // スクロール位置がFV(100vh)を超えた場合
    if (scroll > (fvHeight - 100)) {
      // .headerに背景色をつける
      document.querySelector('header').style.backgroundColor = '#282F35';
      // 背景色を戻す
    } else {
      document.querySelector('.header').style.backgroundColor = '';
    }
  });

  //Slick
  $('.slick').slick({
    fade: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2000,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
  });

});
