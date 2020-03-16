window.onload = function() {
   let menuLinks = document.querySelectorAll('.nav-item');
  // let idSections = document.querySelectorAll('*[id]');
    if(!window.location.hash || window.location.hash === '#top' ) {
        menuLinks[0].classList.add('active')
    }

    const removeClass = (collection, className) => {
        collection.forEach(elem => {
            if(elem.classList.contains(className)){
             elem.classList.remove(className)
            }
        })
    }

   menuLinks.forEach(item => {
       item.addEventListener('click', function (e) {
           if(this.classList.contains('active')){
               return false;
           }else {
               removeClass(menuLinks, 'active')
               this.classList.add('active');
           }

       })
   });

   let phoneHorizontal = document.querySelector('.phone-right')
    phoneHorizontal.addEventListener('click', function () {
       if(phoneHorizontal.attributes.src.value == './assets/ihorizontal-3.png'){
           phoneHorizontal.setAttribute('src', './assets/ihorizontal-4.png')
       }else {
           phoneHorizontal.setAttribute('src', './assets/ihorizontal-3.png')
       }
   });

   let phoneVertical = document.querySelector('.phone-left')
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
        items[currentItem].classList.add(direction)
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction)
        })
    }
    function showItem(direction) {
        items[currentItem].classList.add('next-item', direction)
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('next-item', direction)
            this.classList.add('active')
            isEnabled = true;
        })
    }

    function previousItem(n){
        if(currentItem % 2 === 0){
            document.querySelector('.slider').classList.add('slider-color')
        }else {
            document.querySelector('.slider').classList.remove('slider-color')
        }
        hideItem('to-right')
        changeCurrentItem(n - 1)
        showItem('from-left')

    }
    function nextItem(n){
        if(currentItem % 2 === 0){
            document.querySelector('.slider').classList.add('slider-color')
        }else {
            document.querySelector('.slider').classList.remove('slider-color')
        }
        hideItem('to-left')
        changeCurrentItem(n + 1)
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


    let tags = document.querySelectorAll('.tags li')
    let portfolioItems = document.querySelectorAll('.portfolio-item')

    const sortPortfolio = (num) => {
        portfolioItems.forEach((item, i) => {
            ((portfolioItems.length + i) % (num + 1) === 0) ? item.classList.add('tag-hide') : false;
        });
    };

    const sortDefaultPortfolio = () => {
        portfolioItems.forEach((item) => {
            item.classList.remove('tag-hide')
        })
    }


    tags.forEach((item, i) => {
        item.addEventListener('click', function (e) {
            if(i !== 0) {
                if(this.classList.contains('active')){
                    sortDefaultPortfolio()
                    sortPortfolio(i)
                }else {
                    removeClass(tags, 'active')
                    this.classList.add('active');
                    sortDefaultPortfolio()
                    sortPortfolio(i)
                }
            }else {
                removeClass(tags, 'active')
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
                removeClass(portfolioItems, 'active')
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
                // On-click destination
                destination: null,
                text: `<p>Fields "Name" and "Email" Cant be blank</p>`,
                // Show toast close icon
                close: true,
                // Toast position - top or bottom
                gravity: 'top',
                // Toast position - left, right, or center
                position: 'right',
                // Background color
                backgroundColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
            })

            validateToast.showToast();
        }else {
            text = `<p>The letter was sent</p>`
            text += (fields[2].value) ? `<p>Subject: ${fields[2].value}</p>` : `<p>Without subject </p>`
            text += (fields[3].value) ? `<p>Description: ${fields[3].value}</p>` : `<p>Without description </p>`

            let sendToast = Toastify({
                // On-click destination
                destination: null,
                text: text,
                // Show toast close icon
                close: true,
                // Toast position - top or bottom
                gravity: 'top',
                // Toast position - left, right, or center
                position: 'right',
                // Background color
                backgroundColor: "linear-gradient(135deg, #83D63A, #7BF80D)",
            })

            sendToast.showToast()
        }

    })


    window.addEventListener('scroll', function () {
        if(window.scrollY >= 100){
            document.querySelector('.top').classList.remove('tag-hide')

        }else {
            document.querySelector('.top').classList.add('tag-hide')
        }
    })

};

