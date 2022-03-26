(function () {
    document.querySelectorAll('.fn-collapse').forEach(function (el) {
        el.addEventListener('click', function (e) {
            const elem = e.target.parentNode.parentNode.parentNode

            if (elem.classList.contains('collapsed')) {
                elem.classList.remove('collapsed')
            } else {
                elem.classList.add('collapsed')
            }
        })
    })

    document.querySelectorAll('.toggle-profile').forEach(function (el) {
        el.addEventListener('click', function (e) {
            const elem = e.target.dataset['profile']

            const showAll = elem && elem.toString().includes('rule-all')
            if (!elem || elem.length === 0 || showAll) {
                document.querySelectorAll('.house-rule').forEach(function (item) {
                    showAll
                        ? item.classList.remove('collapsed')
                        : item.classList.add('collapsed')
                })
                return
            }

            document.querySelectorAll('.house-rule').forEach(function (item) {
                item.classList.add('collapsed')
            })

            elem.split(' ').forEach(function (item) {
                if (item === null || item === '') {
                    return
                }
                const id = document.getElementById(item)
                if (id === null) {
                    console.error('null ref on id: ' + item)
                    return
                }
                id.classList.remove('collapsed')
            })
        })
    })
})()
