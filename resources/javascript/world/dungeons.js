(function () {
    const hchange = function () {
        const loc = document.getElementById(document.location.hash.replace(/^#/, ''));

        if (loc === null) {
            return;
        }

        document.querySelectorAll('section').forEach((el) => {
            if (el.id.match(/^dungeon/)) {
                el.classList.add('is-js');
            }
        });
        loc.classList.remove('is-js');
    };

    window.addEventListener('hashchange', hchange);
    if (document.location.hash !== null) {
        hchange();
    }
}());
