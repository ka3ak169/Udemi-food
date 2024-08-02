window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');
  const openModalBtns = document.querySelectorAll('[data-open]');
  const closeModalBtn = document.querySelector('.modal__close');
  const modal = document.querySelector('.modal');
  // открывает модальное окно через 4 секунды
  const timeoutModal = setTimeout(() => {openModal(modal)}, 4000);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item ,i) => {
        if(target == item) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  });

  //Timer

  // const deadline = '2024-07-18';

  // function getTimeRemaining(endtime) {
  //   const t = Date.parse(endtime) - Date.parse(new Date());
  //   const days = Math.floor(t / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((t / (1000 * 60 * 60) % 24));
  //   const minutes = Math.floor((t / 1000 / 60) % 60);
  //   const seconds = Math.floor((t / 1000) % 60);

  //   return {
  //     'total': t,
  //     'days': days,
  //     'hours': hours,
  //     'minutes': minutes,
  //     'seconds': seconds
  //   };
  // };

  // function getZero(num) {
  //   if(num >= 0 && num < 10) {
  //     return `0${num}`;
  //   } else {
  //     return num
  //   }
  // };

  // function setClock(selector ,endtime) {
  //   const timer = document.querySelector(selector);
  //   const days = timer.querySelector('#days');
  //   const hours = timer.querySelector('#hours');
  //   const minutes = timer.querySelector('#minutes');
  //   const seconds = timer.querySelector('#seconds');
  //   const timeInterval = setInterval(updateClock, 1000);

  //   updateClock();

  //   function updateClock() {
  //     const t = getTimeRemaining(endtime);

  //     days.innerHTML = getZero(t.days);
  //     hours.innerHTML = getZero(t.hours);
  //     minutes.innerHTML = getZero(t.minutes);
  //     seconds.innerHTML = getZero(t.seconds);

  //     if (t.total  <= 0) {
  //       clearInterval(timeInterval);
  //     }
  //   }
  // }

  // setClock('.timer', deadline);

  //HandMadeTimer

  finishTime = '2024-07-20';

  const timer = document.querySelector('.timer');
  const days = timer.querySelector('#days');
  const hours = timer.querySelector('#hours');
  const minutes = timer.querySelector('#minutes');
  const seconds = timer.querySelector('#seconds');

  function getTimer(time) {
    // const nowTime = Date.parse(new Date());
    // console.log(nowTime);

    const timeLeft = Date.parse(time) - Date.parse(new Date());
    // console.log(timeLeft);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
    const seconds = Math.floor(timeLeft / (1000)) % 60;
    // console.log(`дней: ${days}, часов: ${hours}, минут: ${minutes}, секунд: ${seconds}`);

    return {
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }
  // console.log(getTimer(finishTime));

  function setTimer(time) {
    const t = getTimer(time);
    // console.log(t.days);
    // console.log(days);
    days.textContent = t.days;
  };

  //Модальное окно

  function openModal(element) {
    element.style.display = 'block';
    element.classList.add('show');
    document.body.style.overflow = 'hidden';

  };

  function closeModal(element) {
    element.style.display = 'none';
    element.classList.remove('show');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(modal);
      clearTimeout(timeoutModal);
    });
  });
  
  closeModalBtn.addEventListener('click', () => {
    closeModal(modal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modal);
    }
  });

  function showModalByScroll() {
    // console.log(window.scrollY);
    // console.log(document.documentElement.clientHeight);
    // console.log(document.documentElement.scrollHeight);
    
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modal);
      clearTimeout(timeoutModal);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);

  setTimer(finishTime);
});