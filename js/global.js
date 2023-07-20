// start: Popper
var popperList = {}

document.querySelectorAll('.dropdown-toggle').forEach(function (item, key) {
    var dropdown = item.closest('.dropdown')
    var dropdownBody = dropdown.querySelector('.dropdown-body')
    if (dropdownBody) {
        dropdown.dataset.popperKey = key
        popperList[key] = Popper.createPopper(item, dropdownBody, {
            modifiers: [
                {
                    name: 'preventOverflow',
                    options: {
                        padding: 16,
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, -36],
                    },
                },
            ],
        });
    }

    item.addEventListener('click', function (e) {
        e.preventDefault()
        if (popperList[key] && dropdownBody) {
            if (dropdown.classList.contains('active')) {
                hideDropdown(popperList[key], dropdown)
            } else {
                document.querySelectorAll('.dropdown.active').forEach(function (item) {
                    var keyDropdown = item.dataset.popperKey
                    if (keyDropdown) {
                        hideDropdown(popperList[keyDropdown], item)
                    }
                })
                showDropdown(popperList[key], dropdown)
            }
        }
    })
})

document.addEventListener('click', function (e) {
    if (!e.target.matches('.dropdown, .dropdown *')) {
        document.querySelectorAll('.dropdown.active').forEach(function (item) {
            var key = item.dataset.popperKey
            if (key) {
                hideDropdown(popperList[key], item)
            }
        })
    }
})

function showDropdown(popperInstance, dropdown) {
    dropdown.classList.add('active')
    popperInstance.setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }
    });
    popperInstance.update();
}

function hideDropdown(popperInstance, dropdown) {
    dropdown.classList.remove('active')
    popperInstance.setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }
    });
}
// end: Popper