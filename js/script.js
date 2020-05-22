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
        more = document.querySelector('.more'),
        close = document.querySelector('.popup-close'); 

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form Submit
    
    let form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        message = {
            loading: 'Подождите, ваши данные отправляются',
            success: 'Спасибо за заявку!',
            error: 'Что-то пошло не так...'
        };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let request = new XMLHttpRequest();

        request.open('POST', '../server.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage);

        request.addEventListener('readystatechange', function() {
            if(request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.error;
            }
        });
    });
    
});

