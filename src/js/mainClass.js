// メニュー開閉制御
class ToggleShowMenu {
  constructor(props) {
    this.e = props.event;
    this.CLASS = props.CLASS;
    this.currentTarget = this.e.currentTarget;
    this.menu = props.menu;
    this.flg = props.flg;
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
  }

  //ハンバーガーボタンが選択されたら
  toggleStatus() {
    this.currentTarget.classList.toggle(this.CLASS);
    this.menu.classList.toggle(this.CLASS);
    if (this.flg) {
      // flagの状態で制御内容を切り替え
      this.menu.animate(this.closeMenuAnimate, this.closeMenuAnimateDuration);
      setTimeout(() => {
        this.menu.style.display = "none";
      }, 500);
      this._backgroundFix(false);
      this.currentTarget.setAttribute("aria-expanded", "false");
      this.menu.setAttribute("aria-hidden", "true");
      this.currentTarget.focus();
      this.flg = false;
    } else {
      this.menu.style.display = "";
      this._backgroundFix(true);
      this.menu.setAttribute("aria-hidden", "false");
      this.currentTarget.setAttribute("aria-expanded", "true");
      this.flg = true;
    }

    return this.flg;
  }

  // メニュー展開時に背景を固定
  _backgroundFix(bool) {
    this.scrollingElement = () => {
      if ("scrollingElement" in document) return document.scrollingElement;
      return document.documentElement;
    };

    this.scrollY = bool
      ? this.scrollingElement().scrollTop
      : parseInt(document.body.style.top || "0");

    this.fixedStyles = {
      height: "100vh",
      position: "fixed",
      top: `${this.scrollY * -1}px`,
      left: "0",
      width: "100vw",
    };

    Object.keys(this.fixedStyles).forEach((key) => {
      document.body.style[key] = bool ? this.fixedStyles[key] : "";
    });

    if (!bool) {
      window.scrollTo(0, this.scrollY * -1);
    }
  }
}

// メニュー内アコーディオン制御
class ToggleAccordion {
  constructor(props) {
    this.e = props.event;
    this.CLASS = props.CLASS;
    this.accordionFlg = props.accordionFlg;
    this.accordionContents = this.e.currentTarget.nextElementSibling;
  }

  toggleStatus() {
    this.e.currentTarget.classList.toggle(this.CLASS);
    this.accordionContents.classList.toggle(this.CLASS);

    if (this.accordionFlg) {
      // 閉じる処理
      this._closeAccordionContents();
      this.e.currentTarget.setAttribute("aria-expanded", "false");
      this.accordionFlg = false;
    } else {
      // 開く処理
      this._openAccordionContents();
      this.e.currentTarget.setAttribute("aria-expanded", "true");
      this.accordionFlg = true;
    }

    return this.accordionFlg;
  }

  _openAccordionContents() {
    this.openAccordionKeyframes = (contents) => [
      {
        height: 0,
      },
      {
        height: contents.offsetHeight + "px",
      },
    ];
    this.openAccordionOptions = {
      duration: 500,
    };
    
    this.accordionContents.style.display = "block";
    this.accordionContents.animate(
      this.openAccordionKeyframes(this.accordionContents),
      this.openAccordionOptions
    );

  }

  _closeAccordionContents() {
    this.closeAccordionKeyframes = (contents) => [
      {
        height: contents.offsetHeight + "px",
      },
      {
        height: 0,
      },
    ];
    this.closeAccordionOptions = {
      duration: 500,
    };
    this.accordionContents.animate(
      this.closeAccordionKeyframes(this.accordionContents),
      this.closeAccordionOptions
    );
    setTimeout(() => {
      this.accordionContents.style.display = "none";
    }, 500);
  }
}

//escキー押下でメニューを閉じられるように
class closeMenuByEscapeKey extends ToggleShowMenu {
  constructor(props) {
    super(props);
    this.humberger = props.humberger;
    this._changeStatus();
  }

  _changeStatus() {
    if (this.e.key === "Escape") {
      this.humberger.classList.remove(this.CLASS);
      this.menu.classList.remove(this.CLASS);

      this._backgroundFix(false);
      this.humberger.focus();
      this.humberger.setAttribute("aria-expanded", "false");
      this.flg = false;
    }
  }
}
