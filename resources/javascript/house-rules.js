(function () {
    document.querySelectorAll('.fn-collapse').forEach(function () {
        this.addEventListener('click', function (e) {
            const elem = e.target.parentNode.parentNode.parentNode

            if (elem.classList.contains('collapsed')) {
                elem.classList.remove('collapsed')
            } else {
                elem.classList.add('collapsed')
            }
        });
    });
})();
