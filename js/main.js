$(document).ready( function ()  {

    new WOW().init();

    $('#company-adv').parallax({imageSrc: '../images/adv-floating-leaves-right.png'});

    $('.advantage-text-top-truck').arctext({radius: 100});
    $('.advantage-text-top-gift').arctext({radius: 85});
    $('.advantage-text-top-jewel').arctext({radius: 100});
    $('.advantage-text-top-cart').arctext({radius: 100});

    let advBottomText = $('.advantage-text-bottom');
    advBottomText.arctext({radius: 80, dir: -1});

    $('.tea-sort').click(function (e) {
        let currentElement = $(e.target);
        $('.teas-container').hide();
        let id = currentElement.data('id');

        $('#' + id).show();

        $('.slick-arrow').trigger('click');

        $('.tea-sort').removeClass('active');
        currentElement.addClass('active');

        //$('#' + id + ' .teas').slick('refresh');
    });


    $('.teas').slick({
        dots: true,
        lazyLoad: 'ondemand',
        speed: 600,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    $('.tea-button.buy-btn').click(() => {
        $('#order-container').css('display', 'flex');
    });

    $('.close-cancel, #order-container').click((e) => {
        if (e.target.id === 'order-container' || e.target.id === 'close-cancel') {
            $('#order-container').hide();
        }
    });

    $('.close, #thanks-container').click((e) => {
        if (e.target.id === 'thanks-container' || e.target.class === 'close') {
            $('#thanks-container').hide();
        }
    });

    $('.close').click(()=>{
        $('#thanks-container').hide();
    });

    $('#burger_menu').click(function () {
        $('.header_menu').css('display', 'flex');
        $('.close-header-menu').css('display', 'block');
    });

    $('.close-header-menu').click(function () {
        $('.header_menu').hide();
    });

    $('.header-link').click(() => {
        $('.header_menu').css('display', 'none');
    });

    $('.order-input input').each(function () {
        $(this).attr('required', 'true');
    });

    $('.order_btn').click(() => {

        let order_error_input = $('.order_error_input');
        $('.order-input input').css('borderColor', 'rgb(143, 188, 98)');
        order_error_input.hide();


        let tea_order = $('#tea_order');
        let gram = $('#gram');
        let name = $('#name');
        let phone = $('#phone');

        let tea_order_attr = tea_order.attr('placeholder');
        let gram_attr = gram.attr('placeholder');
        let name_attr = name.attr('placeholder');
        let phone_attr = phone.attr('placeholder');


        if (!tea_order.val()) {
            tea_order.siblings('.order_error_input').show();
            $(order_error_input).eq(0).text('Необходимо ввести' + ' ' + tea_order_attr.toLowerCase()).css('color', 'red');
            $(tea_order).eq(0).css('borderColor', 'red');

        }

        if (!gram.val()) {
            gram.siblings('.order_error_input').show();
            $(order_error_input).eq(1).text('Необходимо ввести' + ' ' + gram_attr.toLowerCase()).css('color', 'red');
            $(gram).eq(0).css('borderColor', 'red');

        }

        if (!name.val()) {
            name.siblings('.order_error_input').show();
            $(order_error_input).eq(2).text('Необходимо ввести' + ' ' + name_attr.toLowerCase()).css('color', 'red');
            $(name).eq(0).css('borderColor', 'red');
        }

        if (!phone.val()) {
            phone.siblings('.order_error_input').show();
            $(order_error_input).eq(3).text('Необходимо ввести' + ' ' + phone_attr.toLowerCase()).css('color', 'red');
            $(phone).eq(0).css('borderColor', 'red');

        }

    });

    $('.discount-form-btn').click(() => {

        let email = $('#email');
        let error_input = $('.error_input');
        $(email).css('borderColor', 'rgb(143, 188, 98)');
        error_input.hide();

        let attr_email = email.attr('name');

        if (!email.val()) {
            error_input.show();
            $(error_input).eq(0).text('Необходимо ввести' + ' ' + attr_email.toLowerCase()).css('color', 'red');
            $(email).css('borderColor', 'red');
        } else {
            if (email.val()) {
                $.ajax({
                    type: 'post',
                    url: 'mail.php',
                    data: 'email=' + email.val(),
                    success: () => {
                        $('#order-container').hide();
                        $('#thanks-container').show();
                    },
                    error: () => {
                        $('#discount').hide();
                        alert('Ошибка отправки письма. Повторите попытку позже.');
                    }
                })
                    .done(function (message) {
                        if (message.success) {
                            $('.discount-form-btn').hide();
                            $('#email input').html('<div>Мы отправили промокод на указанную почту</div>').addClass('order-confirm');
                        }
                    });
            }
        }

    });




});

