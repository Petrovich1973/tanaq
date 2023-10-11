$(document).ready(function () {

    $(".slider__item").hover(function () {
        $(".slider__item.active").removeClass("active")
        $(this).addClass("active")
    });
    $("#scrollToTop").click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });

    let sticky = document.querySelector('.header');
    $('#app').css("padding-top", sticky.clientHeight)

    $(window).resize(function () {
        $('#app').css("padding-top", sticky.clientHeight)
    })

    $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - ($(window).width() > 1600 ? sticky.clientHeight : 0)
                    }, 500);
                    return false;
                }
            }
        });
    });



});
