(function () {
    const hchange = function () {
        const loc = document.getElementById(location.hash.replace(/^#/, ''))

        if (loc === null) {
            return
        }

        document.querySelectorAll('section').forEach(function (el) {
            if (el.id.match(/^dungeon/)) {
                el.classList.add('is-js')
            }
        })
        loc.classList.remove('is-js')
    }

    window.addEventListener('hashchange', hchange)
    if (location.hash !== null) {
        hchange()
    }
})()
