const modals = () => {

    // Вынес в отдельную функцию, чтоб сбрасывать таймер открытия модального окна в том случае, если оно уже открыто
    function openModal(window) {
        const scroll = calcScroll();
        window.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        clearTimeout(showModalOnTime);
    }
 
    // Здесь весь функционал модальных окон
    function showModals(modalButtonSelector, modalWindowSelector, modalCloseSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(modalButtonSelector),
        modal = document.querySelector(modalWindowSelector),
        close = document.querySelectorAll(modalCloseSelector),
        windows = document.querySelectorAll('[data-modal]');
        

        const messages = {
            width: "Введите ширину",
            height: "Введите высоту",
            profile: "Выберите тип остекления"
        };

        // Вывод предупреждений, если поле путое
        function warningMessage(window, message) {
            // если предупреждение уже было, то удаляется (чтоб не было нескольких)
            if (document.querySelector('.status')) {
                document.querySelector('.status').remove();
            }
            const messageElem = document.createElement('div');
            messageElem.classList.add('status');
            document.querySelector(window).appendChild(messageElem);
            messageElem.textContent = message;
        }

        // Функция закрытия всех модальных окон (их может быть несколько)
        function closeAllModals() {
            windows.forEach(item => {
                item.style.display = "none";
            });
        }
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                        e.preventDefault();
                    }
                // Проверка на пустые поля
                if (e.target.classList.contains('popup_calc_button')) {
                    if (document.querySelector('#width').value == "") {
                        warningMessage('.popup_calc_content', messages.width);
                    } else if (document.querySelector('#height').value == "") {
                        warningMessage('.popup_calc_content', messages.height);
                    } else {
                        closeAllModals();
                        openModal(modal);
                    }
                } else if (e.target.classList.contains('popup_calc_profile_button')) {
                    
                    if (document.querySelectorAll('.checkbox')[0].checked === false && document.querySelectorAll('.checkbox')[1].checked === false) {
                        warningMessage('.popup_calc_profile_content', messages.profile);
                    } else {
                        closeAllModals();
                        openModal(modal);
                    }
                } else {
                    // Закрываем все ранее открытые окна (если были открыты)
                    closeAllModals();
                    openModal(modal);
                }
            });
        });

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
        // закрытие при клике на крестик
        close.forEach(item => {

            // Закрываем ВСЕ открытые окна (их может быть несколько)
            closeAllModals();

            item.addEventListener('click', () => {
                closeModal();
            });
        });
        // закрытие при клике вне окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {

                closeAllModals();

                closeModal();
            }
        });
    }

    // Определение ширины полосы прокрутки (чтоб избавиться от скачака при отмене прокрутки)
    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
    
    // Два разных окна при клике на разные кнопки (ссылки)
    showModals('.popup_engineer_btn', '.popup_engineer', '.popup_close');
    showModals('.phone_link', '.popup', '.popup_close');
    showModals('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    showModals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    showModals('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

    // Открытие окна через 60 сек
    const showModalOnTime = setTimeout(function(){
        const modalOnTime = document.querySelector('.popup');
        openModal(modalOnTime);
    }, 600000);

};

export default modals;