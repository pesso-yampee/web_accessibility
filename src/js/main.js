window.addEventListener("DOMContentLoaded", () => {
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

    new ToggleShowMenu(props);
  });

  window.addEventListener("keydown", (e) => {
    const props = {
      event: e,
      CLASS: CLASS,
      humberger: humberger,
      flg: flg,
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

      accordionFlg = new ToggleAccordion(props);
    });
  });

  // フォーカストラップ制御
  focusTrap.addEventListener("focus", (e) => {
    humberger.focus();
  });
});

// メニュー開閉制御
class ToggleShowMenu {
  constructor(props) {
    this.e = props.event;
    this.CLASS = props.CLASS;
    this.currentTarget = this.e.currentTarget;
    this.menu = props.menu;
    this.flg = props.flg;
    this.openMenuAnimate = [
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
    this.openMenuAnimateDuration = {
      duration: 500,
    };
    this.closeMenuAnimate = [
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
    this.closeMenuAnimateDuration = {
      duration: 500,
    };
    this._toggleStatus();
  }

  //ハンバーガーボタンが選択されたら
  _toggleStatus() {
    this.currentTarget.classList.toggle(this.CLASS);
    this.menu.classList.toggle(this.CLASS);
    if (this.flg) {
      // flagの状態で制御内容を切り替え
      this.menu.animate(this.closeMenuAnimate, this.closeMenuAnimateDuration);
      setTimeout(() => {
        this.menu.style.display = "none";
      }, 500);
      // backgroundFix(false);
      this.currentTarget.setAttribute("aria-expanded", "false");
      this.menu.setAttribute("aria-hidden", "true");
      this.currentTarget.focus();
      this.flg = false;
    } else {
      this.menu.style.display = "";
      this.menu.animate(this.openMenuAnimate, this.openMenuAnimateDuration);
      // backgroundFix(true);
      this.menu.setAttribute("aria-hidden", "false");
      this.currentTarget.setAttribute("aria-expanded", "true");
      this.flg = true;
    }
  }
}

// メニュー内アコーディオン制御
class ToggleAccordion {
  constructor(props) {
    this.e = props.event;
    this.CLASS = props.CLASS;
    this.accordionFlg = props.accordionFlg;
    this._toggleStatus();
  }

  _toggleStatus() {
    this.e.currentTarget.classList.toggle(this.CLASS);
    this.e.currentTarget.nextElementSibling.classList.toggle(this.CLASS);

    if (this.accordionFlg) {
      // 開く処理
      this.e.currentTarget.setAttribute("aria-expanded", "false");
      this.accordionFlg = false;
    } else {
      // 閉じる処理
      this.e.currentTarget.setAttribute("aria-expanded", "true");
      this.accordionFlg = true;
    }

    return this.accordionFlg;
  }
}
