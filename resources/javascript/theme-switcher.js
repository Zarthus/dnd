(function () {
    const maintheme = document.getElementById('theme-default');
    const lightmode = document.getElementById('theme-light');
    const darkmode = document.getElementById('theme-dark');

    let currentTheme = maintheme;
    const swapTheme = function (newTheme) {
        document.body.classList.remove(darkmode.id);
        document.body.classList.remove(lightmode.id);
        document.body.classList.remove(currentTheme.id);
        currentTheme = newTheme;
        document.body.classList.add(currentTheme.id);
        maintheme.href = newTheme.href;
    };

    document.querySelector('#theme-switcher').addEventListener('click', function () {
        if (this.checked) {
            swapTheme(darkmode);
        } else {
            swapTheme(lightmode);
        }
    });

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.querySelector('#theme-switcher').dispatchEvent(new Event('click'));
    }
}());
