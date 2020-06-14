const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
   
    const tabsWrapper = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

        function hideTabs() {
            content.forEach(item => {
                item.style.display = 'none';
                item.classList.remove('fadeIn');
            });
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showTabs(i = 0) {
            content[i].style.display = display;
            content[i].classList.add('fadeIn');
            tabs[i].classList.add(activeClass);
        }

        hideTabs();
        showTabs();

        tabsWrapper.addEventListener('click', (e) => {
            let target = e.target;
            if (target && (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
                tabs.forEach((item, i) => {
                    if (item == target || item == target.parentNode) {
                        hideTabs();
                        showTabs(i);
                    }
                });
            }
        });

};

export default tabs;