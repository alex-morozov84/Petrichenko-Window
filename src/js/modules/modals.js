const modals = () => {

    // Вынес в отдельную функцию, чтоб сбрасывать таймер открытия модального окна в том случае, если оно уже открыто
    function openModal(window) {
        window.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(showModalOnTime);
    }
    // Здесь весь функционал модальных окон
    function showModals(modalButtonSelector, modalWindowSelector, modalCloseSelector) {
        const trigger = document.querySelectorAll(modalButtonSelector),
        modal = document.querySelector(modalWindowSelector),
        close = document.querySelectorAll(modalCloseSelector);
    
    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                    e.preventDefault();
                }
            openModal(modal);
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    // закрытие при клике на крестик
    close.forEach(item => {
        item.addEventListener('click', () => {
            closeModal();
        });
    });
    // закрытие при клике вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    }
    
    // Два разных окна при клике на разные кнопки (ссылки)
    showModals('.popup_engineer_btn', '.popup_engineer', '.popup_close');
    showModals('.phone_link', '.popup', '.popup_close');

    // Открытие окна через 60 сек
    const showModalOnTime = setTimeout(function(){
        const modalOnTime = document.querySelector('.popup');
        openModal(modalOnTime);
    }, 600000);

};

export default modals;