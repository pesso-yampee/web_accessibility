"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // メニュー展開時に背景を固定
  const backgroundFix = (bool) => {
    const scrollingElement = () => {
      const browser = window.navigator.userAgent.toLowerCase();
      if ("scrollingElement" in document) return document.scrollingElement;
      return document.documentElement;
    };

    const scrollY = bool
      ? scrollingElement().scrollTop
      : parseInt(document.body.style.top || "0");

    const fixedStyles = {
      height: "100vh",
      position: "fixed",
      top: `${scrollY * -1}px`,
      left: "0",
      width: "100vw",
    };

    Object.keys(fixedStyles).forEach((key) => {
      document.body.style[key] = bool ? fixedStyles[key] : "";
    });

    if (!bool) {
      window.scrollTo(0, scrollY * -1);
    }
  };

  // メニュー開閉制御
  const toggleShowMenu = (props) => {
    const e = props.event;
    const currentTarget = e.currentTarget;
    const menu = props.menu;
    let flag = props.flg;

    //ハンバーガーボタンが選択されたら
    currentTarget.classList.toggle(CLASS);
    menu.classList.toggle(CLASS);
    if (flag) {
      // flagの状態で制御内容を切り替え
      backgroundFix(false);
      currentTarget.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      currentTarget.focus();
      flag = false;
    } else {
      backgroundFix(true);
      menu.setAttribute("aria-hidden", "false");
      currentTarget.setAttribute("aria-expanded", "true");
      flag = true;
    }
  };

  //escキー押下でメニューを閉じられるように
  const closeMenuByEscapeKey = (props) => {
    const CLASS = props.class;
    const humberger = props.humberger;
    const flag = props.flag;

    if (event.key === "Escape") {
      humberger.classList.remove(CLASS);
      menu.classList.remove(CLASS);

      backgroundFix(false);
      humberger.focus();
      humberger.setAttribute("aria-expanded", "false");
      flg = false;
    }
  };

  // メニュー内アコーディオン制御
  const toggleShowAccordionInMenu = (props) => {
    const e = props.event;
    const CLASS = props.CLASS;
    let accordionFlg = props.accordionFlg;

    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  };

  // 変数定義
  const CLASS = "-active";
  let flg = false;
  let accordionFlg = false;

  const humberger = document.getElementById("js-humberger");
  const focusTrap = document.getElementById("js-focusTrap");
  const menu = document.querySelector(".js-nav");
  const accordionTrigger = document.querySelectorAll(".js-accordionTrigger");

  humberger.addEventListener("click", (e) => {
    const props = {
      event: e,
      menu: menu,
      flag: flg,
    };

    toggleShowMenu(props);
  });

  window.addEventListener("keydown", () => {
    const props = {
      class: CLASS,
      humberger: humberger,
      flag: flg,
    };

    closeMenuByEscapeKey(props);
  });

  accordionTrigger.forEach((item) => {
    item.addEventListener("click", (e) => {
      const props = {
        event: e,
        CLASS: CLASS,
        accordionFlg: accordionFlg,
      };

      toggleShowAccordionInMenu(props);
    });
  });

  // フォーカストラップ制御
  focusTrap.addEventListener("focus", (e) => {
    humberger.focus();
  });
});
