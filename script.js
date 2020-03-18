window.onload = function() {
   let menuLinks = document.querySelectorAll('.nav-item');
   let idSections = document.querySelectorAll('section[id], body[id]');

    if(!window.location.hash || window.location.hash === '#top-body' ) {
        menuLinks[0].classList.add('active')
    }

    const removeClass = (collection, className) => {
        collection.forEach(elem => {
            if(elem.classList.contains(className)){
             elem.classList.remove(className)
            }
        })
    };

   menuLinks.forEach(item => {
       item.addEventListener('click', function (e) {
           if(this.classList.contains('active')){
               return false;
           }else {
               removeClass(menuLinks, 'active');
               this.classList.add('active');
           }

       })
   });


    document.addEventListener('scroll', function () {
        let currentPosition = window.scrollY;
        if(window.scrollY >= 100){
            document.querySelector('.top').classList.remove('tag-hide')

        }else {
            document.querySelector('.top').classList.add('tag-hide')
        }

        idSections.forEach((elem) => {

            if(elem.offsetTop <= currentPosition && (elem.offsetTop + elem.offsetHeight) > currentPosition){
                menuLinks.forEach(item => {

                        if(item.childNodes[0].getAttribute('href').substring(1) == elem.getAttribute('id')){
                            removeClass(menuLinks, 'active');
                            item.classList.add('active');
                            currentPosition += 200
                        }

                });
            }
        })

    });



   let phoneHorizontal = document.querySelector('.phone-right');
    phoneHorizontal.addEventListener('click', function () {
       if(phoneHorizontal.attributes.src.value == './assets/ihorizontal-3.png'){
           phoneHorizontal.setAttribute('src', './assets/ihorizontal-4.png')
       }else {
           phoneHorizontal.setAttribute('src', './assets/ihorizontal-3.png')
       }
   });

   let phoneVertical = document.querySelector('.phone-left');
    phoneVertical.addEventListener('click', function () {
       if(phoneVertical.attributes.src.value == './assets/ivertical-1.png'){
           phoneVertical.setAttribute('src', './assets/ivertical-2.png')
       }else {
           phoneVertical.setAttribute('src', './assets/ivertical-1.png')
       }
   });


   // carousel

    let items = document.querySelectorAll('.item');
    let currentItem = 0;
    let isEnabled = true;

    function changeCurrentItem(n) {
        currentItem = (n + items.length) % items.length;
    }

    function hideItem(direction) {
        isEnabled = false;
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction)
        })
    }
    function showItem(direction) {
        items[currentItem].classList.add('next-item', direction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('next-item', direction);
            this.classList.add('active');
            isEnabled = true;
        })
    }

    function previousItem(n){
        if(currentItem % 2 === 0){
            document.querySelector('.slider').classList.add('slider-color')
        }else {
            document.querySelector('.slider').classList.remove('slider-color')
        }
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left')

    }
    function nextItem(n){
        if(currentItem % 2 === 0){
            document.querySelector('.slider').classList.add('slider-color')
        }else {
            document.querySelector('.slider').classList.remove('slider-color')
        }
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right')

    }

    document.querySelector('.prev').addEventListener('click', function () {
        if(isEnabled){
            previousItem(currentItem)
        }
    });
    document.querySelector('.next').addEventListener('click', function () {
        if(isEnabled){
            nextItem(currentItem)
        }
    });


// tags sort for portfolio


    let tags = document.querySelectorAll('.tags li');
    let portfolioItems = document.querySelectorAll('.portfolio-item');
    let portfolioItemsList = document.querySelector('.layout-4-column');


    const sortPortfolio = (num) => {
        let portfolioItems = document.querySelectorAll('.portfolio-item');
        let count = (portfolioItems.length - 1) - num;

        portfolioItems.forEach(()=> {
            portfolioItemsList.appendChild(portfolioItems[(count >= 0) ? count-- : count = portfolioItems.length - num]);
            removeClass(portfolioItems, 'active')
       })

    };

    const sortDefaultPortfolio = () => {
        portfolioItems.forEach((item, i)=> {
            portfolioItemsList.appendChild(portfolioItems[i]);
            removeClass(portfolioItems, 'active')
        })
    };


    tags.forEach((item, i) => {
        item.addEventListener('click', function (e) {
            if(i !== 0) {
                if(this.classList.contains('active')){
                    sortDefaultPortfolio()
                    sortPortfolio(i)
                }else {
                    removeClass(tags, 'active');
                    this.classList.add('active');
                    sortDefaultPortfolio()
                    sortPortfolio(i)
                }
            }else {
                removeClass(tags, 'active');
                this.classList.add('active');
                sortDefaultPortfolio()
            }

        })
    });


    portfolioItems.forEach(item => {
        item.addEventListener('click', function (e) {
            if(this.classList.contains('active')){
                return false;
            }else {
                removeClass(portfolioItems, 'active');
                this.classList.add('active');
            }

        })
    });



    let form = document.querySelector('.form-validation');
    let fields = form.querySelectorAll('.field');
    let text = ``;



    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if(!fields[0].value || !fields[1].value){
            let validateToast = Toastify({
                text: `<p>Fields "Name" and "Email" Cant be blank</p>`,
                // Show toast close icon
                close: true,
                // Toast position - top or bottom
                gravity: 'top',
                // Toast position - left, right, or center
                position: 'right',
                // Background color
                backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
                callback: function () {
                    form.reset()
                },
            });

            validateToast.showToast();
        }else {
            text = `<p>The letter was sent</p>`;
            text += (fields[2].value) ? `<p>Subject: ${fields[2].value}</p>` : `<p>Without subject </p>`;
            text += (fields[3].value) ? `<p>Description: ${fields[3].value}</p>` : `<p>Without description </p>`;

            let sendToast = Toastify({

                text: text,
                // Show toast close icon
                close: true,
                // Toast position - top or bottom
                gravity: 'top',
                // Toast position - left, right, or center
                position: 'right',
                // Background color
                backgroundColor: "linear-gradient(135deg, #83D63A, #7BF80D)",
                callback: function () {
                    form.reset()
                },

            });

            sendToast.showToast()
        }

    })



};

