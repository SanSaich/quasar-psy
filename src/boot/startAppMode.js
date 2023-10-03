const startAppMode = function getPWADisplayMode() {
    console.log('startAppMode');
    const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
    ).matches;
    if (document.referrer.startsWith('android-app://')) {
        return 'twa';
    } else if (navigator.standalone || isStandalone) {
        return 'standalone';
    }
    return 'browser';
};

export { startAppMode };
