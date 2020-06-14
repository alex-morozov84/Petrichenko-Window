// импортируем функцию по проверке на ввод чисел
import checkNumInputs from "./checkNumInputs";

const forms = (state) => {

    const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    const message = {
        loading: 'Идет отправка...',
        succes: 'Данные отправлены. Мы скоро вам перезвоним',
        failure: 'Что-то пошло не так...',
        height: 'Введите высоту',
        width: 'Введите ширину'
    };

    // проверяем инпуты на числа
    checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            // Если это последняя форма, то добавляем данные, введенные пользователем во всех модалках
            if (item.getAttribute('data-calc') === "end" ) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.succes;
                    state = {};
                    console.log(state);
                    setTimeout(() => {
                        document.querySelectorAll('[data-modal]').forEach(item => {
                            item.style.display = "none";
                        });
                        document.body.style.overflow = '';
                    }, 5000);
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    inputs.forEach(input => input.value = '');
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });

};

export default forms;