const $ = require( "jquery" );

$(document).ready(function () {
    let lastScrollTop = 0
    const header = $(".header")
    const navbarHeight = header.outerHeight()

    $('.navigation a[href^="#"]').on('click', function (e) {
        e.preventDefault()
        let href = $(this).attr('href')
        $('html, body').animate({
            scrollTop: $(href).offset().top - navbarHeight - 20
        }, 0)
    })

    $(".tanaq__slide").hover(function () {
        $(this).siblings().removeClass("active")
        $(this).addClass("active")
    })

    $("#bar-btn").click(function () {
        $('.header .navigation').toggleClass("mobile-navigation")
    })

    $(".header .navigation").click(function () {
        $(this).removeClass("mobile-navigation")
    })

    $(window).scroll(hasScrolled)

    function hasScrolled() {

        $('.header .navigation').removeClass("mobile-navigation")

        const st = $(this).scrollTop()
        header.toggleClass("hidden", st > lastScrollTop && st > navbarHeight)
        lastScrollTop = st
    }

    $("textarea").each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;")
    }).on("input", function () {
        this.style.height = 0
        this.style.height = (this.scrollHeight) + "px"
    })

    $("#formFeedback").submit(function (e) {
        e.preventDefault()

        const data = $(this).serializeArray().reduce((acc, {name, value}) => ({...acc, [name]: value}), {})

        // validate fields
        if (!data.agree) {
            $("#agree").parent(".form-field").addClass("filedErrorForCheckbox")
            return
        } else {
            $("#agree").parent(".form-field").removeClass("filedErrorForCheckbox")
        }

        if (!data.name) {
            $("#name").parent(".form-field").addClass("filedError")
            return
        } else {
            $("#name").parent(".form-field").removeClass("filedError")
        }

        if (!data.email) {
            $("#email").parent(".form-field").addClass("filedError")
            return
        } else {
            $("#email").parent(".form-field").removeClass("filedError")
        }

        $('button[type="submit"]').attr("disabled", true) // Защита от повторной отправки

        // send ajax
        $.ajax({
            type: "POST",
            url: "/send-handle", // Путь до файла отправителя
            data: data,
            success: function () {
                console.log("Ok! Сообщение отправлено.")
                $("#formFeedback").trigger("reset")
                $('button[type="submit"]').attr("disabled", false)
            },
            error: function () {
                console.error("Error! Сообщение не отправлено.")
                $("#formFeedback").trigger("reset")
                $('button[type="submit"]').attr("disabled", false)
            }
        })
    })
})
