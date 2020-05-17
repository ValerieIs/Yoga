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

    
});



