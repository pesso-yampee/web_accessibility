window.addEventListener("DOMContentLoaded", () => {
  // 変数定義
  const CLASS = "-active";
  const humberger = document.getElementById("js-humberger");
  const focusTrap = document.getElementById("js-focusTrap");
  const menu = document.querySelector(".js-nav");
  const accordionTrigger = document.querySelectorAll(".js-accordionTrigger");
  let flg = false;
  let accordionFlg = false;

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

  window.addEventListener("keydown", (e) => {
    const props = {
      event: e,
      CLASS: CLASS,
      humberger: humberger,
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

      new ToggleAccordion(props);
    });
  });

  // フォーカストラップ制御
  focusTrap.addEventListener("focus", (e) => {
    humberger.focus();
  });
});