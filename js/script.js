window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    const tabContent = document.querySelectorAll('.info-tabcontent'),
        infoHeaderTab = document.querySelectorAll('.info-header-tab');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    infoHeaderTab.forEach(function (item, i) {
        item.addEventListener('click', function() {
            hideTabContent(0);
            showTabContent(i);
        });
    });

    // Timer 

    let deadline = '2020-05-23';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    //Modal
    
    let overlay = document.querySelector('.overlay'),
        more = document.querySelectorAll('.more'),
        close = document.querySelector('.popup-close'); 

    more.forEach(function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    
        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            item.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    });

    // Form Submit

    let message = {
        loading: 'Подождите, ваши данные отправляются',
        success: 'Спасибо за заявку!',
        error: 'Что-то пошло не так...'
    };
    
    let form = document.querySelectorAll('form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

    form.forEach(function(item) {
        item.addEventListener('submit', function(event) {
            event.preventDefault();
            item.appendChild(statusMessage);
            let formData = new FormData(item);

            function postData (data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
                    request.addEventListener('readystatechange', function() {
                        if(request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
    
                    request.send(data);                
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.error)
                .finally(clearInput);
        });
    });

    // Slider 

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        dots = document.querySelectorAll('.dot'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next');

    showSlides(slideIndex);    

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style. display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function nextSlide (n) {
        showSlides(slideIndex += n);
    }

    function currentSlide (n) {
        showSlides(slideIndex = n);
    }

    next.addEventListener('click', function () {
        nextSlide(1);
    });
    prev.addEventListener('click', function () {
        nextSlide(-1);
    });

    dots.forEach (function (item) {
        item.addEventListener('click', function() {
            for (let i = 0; i < dots.length + 1; i++) {
                if (item.classList.contains('dot') && item == dots[i-1]) {
                    currentSlide(i);
                }
            }
        });
    });

});