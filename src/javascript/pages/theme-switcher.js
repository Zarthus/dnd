(function () {
    document.querySelector('#theme-switcher').addEventListener('click', function () {
        const maintheme = document.getElementById('theme-default');
        const lightmode = document.getElementById('theme-light');
        const darkmode = document.getElementById('theme-dark');

        if (this.checked) {
            maintheme.href = darkmode.href;
        } else {
            maintheme.href = lightmode.href;
        }
    });

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.querySelector('#theme-switcher').dispatchEvent(new Event('click'));
    }
})();
