// start: Form toggle
document.querySelectorAll('[data-toggle="form"]').forEach(function(item) {
    item.addEventListener('change', function() {
        var group = item.closest('.form-group-toggle')
        document.querySelectorAll('.form-group-toggle').forEach(function(i) {
            i.classList.remove('active')
        })
        group.classList.add('active')
    })
})
// end: Form toggle