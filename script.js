window.onload = function() {
   let menuLinks = document.querySelectorAll('.nav-item');
  // let idSections = document.querySelectorAll('*[id]');
    if(!window.location.hash || window.location.hash === '#top' ) {
        menuLinks[0].classList.add('active')
    }

    const removeClass = (collection, className) => {
        collection.forEach(elem => {
            if(elem.classList.contains('active')){
             elem.classList.remove('active')
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
        hideItem('to-right')
        changeCurrentItem(n - 1)
        showItem('from-left')
    }
    function nextItem(n){
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




};