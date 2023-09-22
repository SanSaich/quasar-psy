export default function () {
    const startAppMode = function getPWADisplayMode() {
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
    console.log('startAppMode: ', startAppMode());
}
