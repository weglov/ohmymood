declare global {
  interface Window { Telegram: any; }
}

window.Telegram = window.Telegram || {};
