// const $ = require( "jquery" );
require( "bootstrap" );
// const Lazy = require("jquery-lazy")

$(document).ready(function ($) {
    let lastScrollTop = 0
    const header = $(".header")
    const navbarHeight = header.outerHeight()

    $("img.lazy").Lazy();

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

    $(".tanaq__filter__btn-group .btn").on("click", function (event) {
        event.preventDefault()
        const btnValueArray = $(this).attr("data-type").split(",").map(el => el.trim())
        $(this).addClass("active").siblings().removeClass("active")
        $(".tanaq__manufacturer-list-item").removeClass("hide").filter(function() {
            const thisValuesArray = $(this).attr("data-type").split(",").map(el => el.trim())
            const res1 = !btnValueArray.some(el => thisValuesArray.includes(el))
            let res2 = false;
            const searchValue = $(".tanaq__filter__search-input").val().trim()
            if(searchValue) {
                const thisValue = $(this).find("h4").text().toLowerCase()
                res2 = !thisValue.includes(searchValue.toLowerCase())
                console.log(searchValue.toLowerCase(), thisValue)
            }
            return res1 || res2
        }).addClass( "hide" )
    })

    $(".tanaq__filter__search-input").on("input", function (event) {
        event.preventDefault()
        const valueSearch = $(this).val().trim().toLowerCase()
        $(".tanaq__manufacturer-list-item").removeClass("hide").filter(function() {
            let res1 = false
            if(valueSearch.length) {
                const thisName = $(this).find("h4").text().toLowerCase()
                res1 = !thisName.includes(valueSearch)
            }
            const thisType = $(this).attr("data-type").toLowerCase()
            const typeSelectList = $(".tanaq__filter__btn-group .btn.active").attr("data-type").split(",").map(el => el.trim().toLowerCase())
            const res2 = !typeSelectList.includes(thisType)
            return res1 || res2
        }).addClass( "hide" )
    })
})
