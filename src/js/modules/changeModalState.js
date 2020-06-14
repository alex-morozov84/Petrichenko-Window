// импортируем функцию по проверке на ввод чисел
import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    // получаем все табы (чтоб далее определить на какой кликнул пользователь). Везеде выбираем All (даже для тех элементов, которых не больше одного) для того, чтобы далее использовать на всех элементах метод .forEach()
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    // Единая функция для получения всех введенных пользователем данных
    function bindActionToElem(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                // Такой вариант использовали вначале. Но он подходил не под все элементы
                // if (elem.length > 1) {
                //     state[prop] = i;
                // } else {
                //     state[prop] = item.value;
                // }

                // Переделанный вариант. Получаем названия всех узлов и для каждого прописываем свой функционал:
                switch(item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное": state[prop] = "Теплое";
                            // снимаем галки со всех чекбоксов, кроме того, на который кликнули (вдруг кликнули на все)
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            });
        });
    }

    // При клике на таб, его номер будет записываться в пустой объект для дальнейшей передачи на сервер. Вначале сделали так. Потом поместили тот же функционал в функцию bindActionToElem, чтоб использовать ее для получения сразу ВСЕХ данных
    // windowForm.forEach((item, i) => {
    //     item.addEventListener('click', () => {
    //         state.form = i;
    //         console.log(state);
    //     });
    // });

    // По-умолчанию, если ни один таб не выбран
    state.form = 0;

    bindActionToElem('click', windowForm, 'form');
    bindActionToElem('input', windowHeight, 'height');
    bindActionToElem('input', windowWidth, 'width');
    bindActionToElem('change', windowType, 'type');
    bindActionToElem('change', windowProfile, 'profile');
};

export default changeModalState;