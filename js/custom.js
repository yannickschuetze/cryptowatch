$('.hamburger').click(function() {
    if($('nav').hasClass('is-open')) {
        $('nav').removeClass('is-open')
        $('.hamburger').removeClass('is-active')
    } else {
        $('nav').addClass('is-open')
        $('.hamburger').addClass('is-active')
    }
})