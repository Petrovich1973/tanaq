$(document).ready(function () {
    $(".slider__item").hover(function () {
        $(".slider__item.active").removeClass("active")
        $(this).addClass("active")
    })
})
