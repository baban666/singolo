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


// toasts

    (function(root, factory) {
        if (typeof module === "object" && module.exports) {
            module.exports = factory();
        } else {
            root.Toastify = factory();
        }
    })(this, function(global) {
        // Object initialization
        var Toastify = function(options) {
                // Returning a new init object
                return new Toastify.lib.init(options);
            },
            // Library version
            version = "1.7.0";

        // Defining the prototype of the object
        Toastify.lib = Toastify.prototype = {
            toastify: version,

            constructor: Toastify,

            // Initializing the object with required parameters
            init: function(options) {
                // Verifying and validating the input object
                if (!options) {
                    options = {};
                }

                // Creating the options object
                this.options = {};

                this.toastElement = null;

                // Validating the options
                this.options.text = options.text || "Hi there!"; // Display message
                this.options.duration = options.duration === 0 ? 0 : options.duration || 3000; // Display duration
                this.options.selector = options.selector; // Parent selector
                this.options.callback = options.callback || function() {}; // Callback after display
                this.options.destination = options.destination; // On-click destination
                this.options.newWindow = options.newWindow || false; // Open destination in new window
                this.options.close = options.close || false; // Show toast close icon
                this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : "toastify-top"; // toast position - top or bottom
                this.options.positionLeft = options.positionLeft || false; // toast position - left or right
                this.options.position = options.position || ''; // toast position - left or right
                this.options.backgroundColor = options.backgroundColor; // toast background color
                this.options.avatar = options.avatar || ""; // img element src - url or a path
                this.options.className = options.className || ""; // additional class names for the toast
                this.options.stopOnFocus = options.stopOnFocus === undefined? true: options.stopOnFocus; // stop timeout on focus
                this.options.onClick = options.onClick; // Callback after click

                // Returning the current object for chaining functions
                return this;
            },

            // Building the DOM element
            buildToast: function() {
                // Validating if the options are defined
                if (!this.options) {
                    throw "Toastify is not initialized";
                }

                // Creating the DOM object
                var divElement = document.createElement("div");
                divElement.className = "toastify on " + this.options.className;

                // Positioning toast to left or right or center
                if (!!this.options.position) {
                    divElement.className += " toastify-" + this.options.position;
                } else {
                    // To be depreciated in further versions
                    if (this.options.positionLeft === true) {
                        divElement.className += " toastify-left";
                        console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.')
                    } else {
                        // Default position
                        divElement.className += " toastify-right";
                    }
                }

                // Assigning gravity of element
                divElement.className += " " + this.options.gravity;

                if (this.options.backgroundColor) {
                    divElement.style.background = this.options.backgroundColor;
                }

                // Adding the toast message
                divElement.innerHTML = this.options.text;

                if (this.options.avatar !== "") {
                    var avatarElement = document.createElement("img");
                    avatarElement.src = this.options.avatar;

                    avatarElement.className = "toastify-avatar";

                    if (this.options.position == "left" || this.options.positionLeft === true) {
                        // Adding close icon on the left of content
                        divElement.appendChild(avatarElement);
                    } else {
                        // Adding close icon on the right of content
                        divElement.insertAdjacentElement("beforeend", avatarElement);
                    }
                }

                // Adding a close icon to the toast
                if (this.options.close === true) {
                    // Create a span for close element
                    var closeElement = document.createElement("span");
                    closeElement.innerHTML = "OK";

                    closeElement.className = "toast-close";

                    // Triggering the removal of toast from DOM on close click
                    closeElement.addEventListener(
                        "click",
                        function(event) {
                            event.stopPropagation();
                            this.removeElement(this.toastElement);
                            window.clearTimeout(this.toastElement.timeOutValue);
                        }.bind(this)
                    );

                    //Calculating screen width
                    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

                    // Adding the close icon to the toast element
                    // Display on the right if screen width is less than or equal to 360px
                    if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
                        // Adding close icon on the left of content
                        divElement.insertAdjacentElement("afterbegin", closeElement);
                    } else {
                        // Adding close icon on the right of content
                        divElement.appendChild(closeElement);
                    }
                }

                // Clear timeout while toast is focused
                if (this.options.stopOnFocus && this.options.duration > 0) {
                    const self = this;
                    // stop countdown
                    divElement.addEventListener(
                        "mouseover",
                        function(event) {
                            window.clearTimeout(divElement.timeOutValue);
                        }
                    )
                    // add back the timeout
                    divElement.addEventListener(
                        "mouseleave",
                        function() {
                            divElement.timeOutValue = window.setTimeout(
                                function() {
                                    // Remove the toast from DOM
                                    self.removeElement(divElement);
                                },
                                self.options.duration
                            )
                        }
                    )
                }

                // Adding an on-click destination path
                if (typeof this.options.destination !== "undefined") {
                    divElement.addEventListener(
                        "click",
                        function(event) {
                            event.stopPropagation();
                            if (this.options.newWindow === true) {
                                window.open(this.options.destination, "_blank");
                            } else {
                                window.location = this.options.destination;
                            }
                        }.bind(this)
                    );
                }

                if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
                    divElement.addEventListener(
                        "click",
                        function(event) {
                            event.stopPropagation();
                            this.options.onClick();
                        }.bind(this)
                    );
                }

                // Returning the generated element
                return divElement;
            },

            // Displaying the toast
            showToast: function() {
                // Creating the DOM object for the toast
                this.toastElement = this.buildToast();

                // Getting the root element to with the toast needs to be added
                var rootElement;
                if (typeof this.options.selector === "undefined") {
                    rootElement = document.body;
                } else {
                    rootElement = document.getElementById(this.options.selector);
                }

                // Validating if root element is present in DOM
                if (!rootElement) {
                    throw "Root element is not defined";
                }

                // Adding the DOM element
                rootElement.insertBefore(this.toastElement, rootElement.firstChild);

                // Repositioning the toasts in case multiple toasts are present
                Toastify.reposition();

                if (this.options.duration > 0) {
                    this.toastElement.timeOutValue = window.setTimeout(
                        function() {
                            // Remove the toast from DOM
                            this.removeElement(this.toastElement);
                        }.bind(this),
                        this.options.duration
                    ); // Binding `this` for function invocation
                }

                // Supporting function chaining
                return this;
            },

            hideToast: function() {
                if (this.toastElement.timeOutValue) {
                    clearTimeout(this.toastElement.timeOutValue);
                }
                this.removeElement(this.toastElement);
            },

            // Removing the element from the DOM
            removeElement: function(toastElement) {
                // Hiding the element
                // toastElement.classList.remove("on");
                toastElement.className = toastElement.className.replace(" on", "");

                // Removing the element from DOM after transition end
                window.setTimeout(
                    function() {
                        // Remove the elemenf from the DOM, only when the parent node was not removed before.
                        if (toastElement.parentNode) {
                            toastElement.parentNode.removeChild(toastElement);
                        }

                        // Calling the callback function
                        this.options.callback.call(toastElement);

                        // Repositioning the toasts again
                        Toastify.reposition();
                    }.bind(this),
                    400
                ); // Binding `this` for function invocation
            },
        };

        // Positioning the toasts on the DOM
        Toastify.reposition = function() {
            // Top margins with gravity
            var topLeftOffsetSize = {
                top: 15,
                bottom: 15,
            };
            var topRightOffsetSize = {
                top: 15,
                bottom: 15,
            };
            var offsetSize = {
                top: 15,
                bottom: 15,
            };

            // Get all toast messages on the DOM
            var allToasts = document.getElementsByClassName("toastify");

            var classUsed;

            // Modifying the position of each toast element
            for (var i = 0; i < allToasts.length; i++) {
                // Getting the applied gravity
                if (containsClass(allToasts[i], "toastify-top") === true) {
                    classUsed = "toastify-top";
                } else {
                    classUsed = "toastify-bottom";
                }

                var height = allToasts[i].offsetHeight;
                classUsed = classUsed.substr(9, classUsed.length-1)
                // Spacing between toasts
                var offset = 15;

                var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

                // Show toast in center if screen with less than or qual to 360px
                if (width <= 360) {
                    // Setting the position
                    allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";

                    offsetSize[classUsed] += height + offset;
                } else {
                    if (containsClass(allToasts[i], "toastify-left") === true) {
                        // Setting the position
                        allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";

                        topLeftOffsetSize[classUsed] += height + offset;
                    } else {
                        // Setting the position
                        allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";

                        topRightOffsetSize[classUsed] += height + offset;
                    }
                }
            }

            // Supporting function chaining
            return this;
        };

        function containsClass(elem, yourClass) {
            if (!elem || typeof yourClass !== "string") {
                return false;
            } else if (
                elem.className &&
                elem.className
                    .trim()
                    .split(/\s+/gi)
                    .indexOf(yourClass) > -1
            ) {
                return true;
            } else {
                return false;
            }
        }

        // Setting up the prototype for the init object
        Toastify.lib.init.prototype = Toastify.lib;

        // Returning the Toastify function to be assigned to the window object/module
        return Toastify;
    });



// form

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

// menu

   const burgerMenu = document.querySelector('.burger-menu');
   const mobileMenu =  document.querySelector('.mobile-menu');
   const mobileBurgerMenu =  document.querySelector('.mobile-burger-menu');
   const overlay =  document.querySelector('.overlay');

     burgerMenu.addEventListener('click', () => {
         const navigation =  document.querySelector('.nav-bar');
         const mobileTop =  document.querySelector('.mobile-top');
         mobileMenu.appendChild(navigation)
         mobileMenu.classList.add('menu-show');
         overlay.classList.add('show');
     });

    mobileBurgerMenu.addEventListener('click', () => {
         mobileMenu.classList.remove('menu-show');
         overlay.classList.remove('show');
     });

    overlay.addEventListener('click', () => {
         mobileMenu.classList.remove('menu-show');
         overlay.classList.remove('show');
     });

    document.addEventListener('keydown', (e) => {

        if(e.key == 'Escape'){
            mobileMenu.classList.remove('menu-show');
            overlay.classList.remove('show');
        }

     });

};

