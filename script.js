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

};