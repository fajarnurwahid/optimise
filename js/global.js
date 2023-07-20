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
    } else if(e.target.matches('.dropdown-menu > li *')) {
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



// start: Modal
document.addEventListener('click', function(e) {
    if(e.target.matches('[data-toggle="modal"], [data-toggle="modal"] *')) {
        var el = e.target.closest('[data-toggle="modal"]')
        var target = document.querySelector(el.dataset.target)
        if(target) {
            e.preventDefault()
            target.classList.add('show')
            preventScrollHtml()
        }
    } else if(e.target.matches('.modal-close, .modal-close *, .modal')) {
        var modal = e.target.closest('.modal')
        if(modal) {
            modal.classList.remove('show')
            unpreventScrollHtml()
        }
    }
})

function preventScrollHtml() {
    document.querySelector('html').classList.add('overflow-hidden')
}

function unpreventScrollHtml() {
    document.querySelector('html').classList.remove('overflow-hidden')
}
// end: Modal



// start: Form
document.addEventListener('click', function (e) {
    if(e.target.matches('.dropdown-select-option, .dropdown-select-option *')) {
        var option = e.target.closest('.dropdown-select-option')
        var select = e.target.closest('.dropdown-select')
        if(select) {
            var options = select.querySelectorAll('.dropdown-select-option')
            var toggle = select.querySelector('.dropdown-toggle')
            var input = select.querySelector('input')
            if(input) {
                var value = option.dataset.value
                if(value !== undefined) {
                    input.value = value
                    toggle.textContent = option.textContent
                    options.forEach(function(item) {
                        if(item === option) {
                            item.setAttribute('data-selected', '')
                        } else {
                            item.removeAttribute('data-selected')
                        }
                    })
                }
            }
        }
        document.querySelectorAll('.dropdown.active').forEach(function (item) {
            var key = item.dataset.popperKey
            if (key) {
                hideDropdown(popperList[key], item)
            }
        })
    }
})
// end: Form