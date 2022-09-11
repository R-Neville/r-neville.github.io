import Theme from "./Theme";
import themes from "./themes";

const THEME_KEY = "theme";

class ThemeManager {
  private _default: Theme;
  private _current: Theme;
  
  constructor() {
    this._default = themes[0];
    const userThemeIndex = this.getCurrentIndex();
    if (userThemeIndex) {
      this._current = themes[userThemeIndex];
    } else {
      this._current = this._default;
    }
  }

  get current() {
    return this._current;
  }

  setTheme(index: number) {
    if (index < themes.length) {
      window.localStorage.setItem(THEME_KEY, index.toString());
    }
  }

  private getCurrentIndex() {
    const indexStr = window.localStorage.getItem(THEME_KEY);
    const index = Number(indexStr);
    if (!isNaN(index) && index < themes.length) {
      return index;
    }
    return 0;
  }
}

export default ThemeManager;