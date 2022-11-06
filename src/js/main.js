window.addEventListener("DOMContentLoaded", () => {
  const CLASS = "-active";
  const humberger = document.getElementById("js-humberger");
  const focusTrap = document.getElementById("js-focusTrap");
  const menu = document.querySelector(".js-nav");
  const accordionTrigger = document.querySelectorAll(".js-accordionTrigger");
  let flg = false;
  let accordionFlg = false;

  // ハンバーガーメニュー開閉制御
  humberger.addEventListener("click", (e) => {
    const props = {
      event: e,
      CLASS: CLASS,
      menu: menu,
      flg: flg,
    };

    const toggleShowMenu = new ToggleShowMenu(props);

    flg = toggleShowMenu.toggleStatus();
  });

  // escapeキー押下でハンバーガーメニューを閉じれるように
  window.addEventListener("keydown", (e) => {
    const props = {
      event: e,
      CLASS: CLASS,
      humberger: humberger,
      menu: menu,
      flg: flg,
    };

    new closeMenuByEscapeKey(props);
  });

  accordionTrigger.forEach((item) => {
    item.addEventListener("click", (e) => {
      const props = {
        event: e,
        CLASS: CLASS,
        accordionFlg: accordionFlg,
      };

      const toggleAccordion = new ToggleAccordion(props);
      accordionFlg = toggleAccordion.toggleStatus();
    });
  });

  // フォーカストラップ制御
  focusTrap.addEventListener("focus", (e) => {
    humberger.focus();
  });
});