window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');
  const openModalBtns = document.querySelectorAll('[data-open]');
  const closeModalBtn = document.querySelector('.modal__close');
  const modal = document.querySelector('.modal');
  const cardsContainer = document.querySelector('#cardsContainer');
  // открывает модальное окно через 4 секунды
  let timeoutModal;
  // const timeoutModal = setTimeout(() => {openModal(modal)}, 4000);

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

  finishTime = '2024-08-20';

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
    hours.textContent = t.hours;
    minutes.textContent = t.minutes;
    seconds.textContent = t.seconds;
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
    
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
      openModal(modal);
      
      window.removeEventListener('scroll', showModalByScroll);
    };

    if (timeoutModal) {
      clearTimeout(timeoutModal);
    }
  };

  window.addEventListener('scroll', showModalByScroll);

  // Создаем карточки

  const cards = [
    {
      img: 'img/tabs/vegy.jpg', 
      alt: 'vegy', 
      subtitle: 'Фитнес', 
      descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
      total: '229'
    }, 
    {
      img: 'img/tabs/elite.jpg', 
      alt: 'elite', 
      subtitle: 'Премиум', 
      descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
      total: '550'
    }, 
    {
      img: 'img/tabs/post.jpg', 
      alt: 'post', 
      subtitle: 'Постное', 
      descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
      total: '430'
    }
  ]; 

  // первый рендер*
  // рендер одной карточки*
  // класс карточки*
  // объект с карточками типа сервера*
  class Card {
    constructor(obj) {
      this.img = obj.img;
      this.alt = obj.alt;
      this.subtitle = obj.subtitle;
      this.descr = obj.descr;
      this.total = obj.total;
    }

    renderCard() {
      const element = document.createElement('div');
      element.innerHTML = `
        <div class="menu__item">
            <img src="${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">Меню "${this.subtitle}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
            </div>
        </div>
      `;

      cardsContainer.append(element);
    }
  };

  cards.forEach(cardData => {
    const card = new Card(cardData);
    card.renderCard();
  });

  // так сделал чел из курса
//   class MenuCard {
//     constructor(src, alt, title, descr, price, parentSelector) {
//         this.src = src;
//         this.alt = alt;
//         this.title = title;
//         this.descr = descr;
//         this.price = price;
//         this.parent = document.querySelector(parentSelector);
//         this.transfer = 27;
//         this.changeToUAH(); 
//     }

//     changeToUAH() {
//         this.price = this.price * this.transfer; 
//     }

//     render() {
//         const element = document.createElement('div');
//         element.innerHTML = `
//             <div class="menu__item">
//                 <img src=${this.src} alt=${this.alt}>
//                 <h3 class="menu__item-subtitle">${this.title}</h3>
//                 <div class="menu__item-descr">${this.descr}</div>
//                 <div class="menu__item-divider"></div>
//                 <div class="menu__item-price">
//                     <div class="menu__item-cost">Цена:</div>
//                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
//                 </div>
//             </div>
//         `;
//         this.parent.append(element);
//     }
// }

// new MenuCard(
//     "img/tabs/vegy.jpg",
//     "vegy",
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     9,
//     ".menu .container"
// ).render();

// new MenuCard(
//     "img/tabs/post.jpg",
//     "post",
//     'Меню "Постное"',
//     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//     14,
//     ".menu .container"
// ).render();

// new MenuCard(
//     "img/tabs/elite.jpg",
//     "elite",
//     'Меню “Премиум”',
//     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//     21,
//     ".menu .container"
// ).render();
// });



  let time = setInterval(() => {setTimer(finishTime)}, 1000);
});