(function () {
    document.querySelectorAll('.fn-collapse').forEach((el) => {
        el.addEventListener('click', (e) => {
            const elem = e.target.parentNode.parentNode.parentNode;

            if (elem.classList.contains('collapsed')) {
                elem.classList.remove('collapsed');
            } else {
                elem.classList.add('collapsed');
            }
        });
    });

    document.querySelectorAll('.toggle-profile').forEach((el) => {
        el.addEventListener('click', (e) => {
            const elem = e.target.dataset.profile;

            const showAll = elem && elem.toString().includes('rule-all');
            if (!elem || elem.length === 0 || showAll) {
                document.querySelectorAll('.house-rule').forEach((item) => {
                    if (showAll) {
                        item.classList.remove('collapsed');
                    } else {
                        item.classList.add('collapsed');
                    }
                });
                return;
            }

            document.querySelectorAll('.house-rule').forEach((item) => {
                item.classList.add('collapsed');
            });

            elem.split(' ').forEach((item) => {
                if (item === null || item === '') {
                    return;
                }
                const id = document.getElementById(item);
                if (id === null) {
                    console.error(`null ref on id: ${item}`);
                    return;
                }
                id.classList.remove('collapsed');
            });
        });
    });
}());
