const forms = () => {

    const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    const message = {
        loading: 'Идет отправка...',
        succes: 'Данные отправлены. Мы скоро вам перезвоним',
        failure: 'Что-то пошло не так...'
    };

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

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

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.succes;
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