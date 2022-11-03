window.addEventListener("DOMContentLoaded", () => {
  const openMenuAnimate = [
    {
      visibility: "hidden",
      opacity: 0,
      display: "none",
    },
    {
      visibility: "hidden",
      opacity: 0,
      display: "block",
    },
    {
      visibility: "visible",
      opacity: 1,
      display: "block",
    },
  ];
  const openMenuAnimateDuration = {
    duration: 500,
  };
  const closeMenuAnimate = [
    {
      visibility: "visible",
      opacity: 1,
    },
    {
      visibility: "hidden",
      opacity: 0,
    },
    {
      visibility: "hidden",
      opacity: 0,
    },
  ];
  const closeMenuAnimateDuration = {
    duration: 500,
  };
  // メニュー展開時に背景を固定
  const backgroundFix = (bool) => {
    const scrollingElement = () => {
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
    let flg = props.flg;

    //ハンバーガーボタンが選択されたら
    currentTarget.classList.toggle(CLASS);
    menu.classList.toggle(CLASS);
    if (flg) {
      // flagの状態で制御内容を切り替え
      menu.animate(closeMenuAnimate, closeMenuAnimateDuration);
      setTimeout(() => {
        menu.style.display = "none";
      }, 500);
      backgroundFix(false);
      currentTarget.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      currentTarget.focus();
      flg = false;
    } else {
      menu.style.display = "";
      menu.animate(openMenuAnimate, openMenuAnimateDuration);
      backgroundFix(true);
      menu.setAttribute("aria-hidden", "false");
      currentTarget.setAttribute("aria-expanded", "true");
      flg = true;
    }

    return flg;
  };

  //escキー押下でメニューを閉じられるように
  const closeMenuByEscapeKey = (props) => {
    const e = props.e;
    const CLASS = props.class;
    const humberger = props.humberger;
    let flag = props.flag;

    if (e.key === "Escape") {
      humberger.classList.remove(CLASS);
      menu.classList.remove(CLASS);

      backgroundFix(false);
      humberger.focus();
      humberger.setAttribute("aria-expanded", "false");
      flg = false;
    }

    return flag;
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

    return accordionFlg;
  };

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
      menu: menu,
      flg: flg,
    };

    flg = toggleShowMenu(props);
  });

  window.addEventListener("keydown", (e) => {
    const props = {
      e: e,
      class: CLASS,
      humberger: humberger,
      flag: flg,
    };

    flg = closeMenuByEscapeKey(props);
  });

  accordionTrigger.forEach((item) => {
    item.addEventListener("click", (e) => {
      const props = {
        event: e,
        CLASS: CLASS,
        accordionFlg: accordionFlg,
      };

      accordionFlg = toggleShowAccordionInMenu(props);
    });
  });

  // フォーカストラップ制御
  focusTrap.addEventListener("focus", (e) => {
    humberger.focus();
  });
});
