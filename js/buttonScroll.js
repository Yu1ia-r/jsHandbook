  /* === Логика для кнопки "Наверх" === */

    // Ждем, пока вся HTML-структура загрузится
    document.addEventListener("DOMContentLoaded", () => {

        // 1. Находим нашу кнопку в DOM
        const scrollTopBtn = document.getElementById('scrollToTopBtn');

        // Убедимся, что кнопка существует на странице
        if (scrollTopBtn) {

            // 2. Назначаем обработчик на событие "scroll" (прокрутка)
            window.addEventListener('scroll', () => {

                // Порог, после которого кнопка появится (например, 400px)
                const scrollThreshold = 400;

                // Проверяем, насколько далеко пользователь прокрутил страницу
                if (window.scrollY > scrollThreshold) {
                    // Если прокрутили достаточно далеко - показываем кнопку
                    scrollTopBtn.classList.add('show');
                } else {
                    // Иначе - скрываем
                    scrollTopBtn.classList.remove('show');
                }
            });

            // 3. Назначаем обработчик на событие "click" (нажатие)
            scrollTopBtn.addEventListener('click', () => {

                // Плавно прокручиваем страницу к самому верху
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 'smooth' - для плавной прокрутки
                });

            });
        }
    });