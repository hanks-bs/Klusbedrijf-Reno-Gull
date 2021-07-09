const animateNav = () => {
    const menuButton = document.querySelector(".menu.menu--close2");
    const menuContainer = document.querySelector("nav");
    const menuItems = menuContainer.querySelectorAll("li");
    const topSection = document.querySelector(".topsection");
    const flagsContainer = document.querySelector(".flags");

    const hideNav = () => {
        let tl = gsap.timeline();
        tl.to(menuContainer, 0.3, {
            backgroundColor: "#fff",
            });

            tl.add(() => {
                document.body.style.overflow ="auto"
                menuButton.classList.remove("open");
                menuItems.forEach(item => {
                    item.style.opacity = 0;
                    if(window.pageYOffset >= 150)
                    {
                        menuContainer.style.height = "60px";
                    }
                    else  menuContainer.style.height = "100px";

                   
                    
                }, .3)
            })
    };
    window.document.addEventListener("scroll", ()=> {
      if(window.pageYOffset >= 150)
      {
        menuContainer.style.paddingRight = "125px";
        menuContainer.style.height = "60px";
        menuContainer.style.boxShadow = "rgb(0 0 0 / 15%) 0px 1px 16px 0px";

        flagsContainer.querySelectorAll(".flag").forEach(flag => {
            flag.style.marginRight = "5px";
            flag.style.marginTop = "0";
        })
        flagsContainer.style.display = "flex";
        flagsContainer.style.top = "17px";

        menuButton.style.top = "9px";
        menuButton.style.right = "70px";


        return;
      }
      else
      {
    
        menuContainer.style.height = "100px";
        menuContainer.style.boxShadow = "none";
        menuContainer.style.paddingRight = "45px";

        flagsContainer.querySelectorAll(".flag").forEach(flag => {
            flag.style.marginRight = "0";
            flag.style.marginTop = "5px";
        })
        flagsContainer.style.display = "block";
        flagsContainer.style.top = "0";

        menuButton.style.top = "33px";
        menuButton.style.right = "0";

        return
      }
    })

    menuButton.addEventListener("click", () => {
        if (menuButton.classList.contains("open")) {
            const tl = new gsap.timeline();

            tl.add(() => {
                menuContainer.style.paddingRight = "125px";
            document.body.style.overflow = "auto";
            menuButton.classList.remove("open");
            })
            tl.add(() => {
            document.querySelector(".logo").style = `
            display: flex;
            `;
            }, .8);
            hideNav();
        } else {
            menuButton.classList.add("open");
            document.querySelector(".logo").style = `
            display: none;
            `;
            
            menuContainer.style.paddingRight = "0";
            document.body.style.overflow = "hidden";
            let tl = gsap.timeline();
            tl.to(menuContainer, 0.1, {
                    backgroundColor: "#4e00ac",
                    height: "100vh"
                })
                .to(menuContainer, .7, {
                    clipPath: "circle(150% at 100% 0)"
                })
                .add(() => {
                    menuButton.classList.add("open");
                    menuItems.forEach(item => {
                        tl.fromTo(item, .5, {
                            opacity: 0,
                            x: 25
                        }, {
                            opacity: 1,
                            x: 0
                        }, "-=.2")
                    })
                })
        }

       


    });
    menuItems.forEach(element => {
        element.querySelector("a").addEventListener("click", (e) => {
            if(element.querySelector("a[href^='#']"))  e.preventDefault();
         
            let active = document.querySelector(".nav__item.active")
            active.classList.remove("active");
            element.classList.add("active");
            if(element.querySelector("a[href^='#']"))
            {
                gsap.to(window, {
                    duration: .5,
                    scrollTo: {
                        y: element.querySelector("a").getAttribute("href"),
                        offsetY: 150
                    }
                });
            }
            if(window.screen.width < 870) hideNav();

        })
    });

    

    let sections = document.querySelectorAll("section[id]");
    sections.forEach(section => {
        let setActive = () => {
            let active = document.querySelector(".nav__item.active")
            active.classList.remove("active");
            navItem.parentNode.classList.add("active")
        }
        let navItem = document.querySelector(`li.nav__item > a[href='#${section.getAttribute('id')}'`);
        ScrollTrigger.create({
            trigger: "#" + section.getAttribute("id"),
            once: false,
            start: "top 40%",
            end: "bottom 70%",
            onEnter: setActive,
            onEnterBack: setActive,
            onLeaveBack: setActive,
            onLeave: setActive,
           
        });
    })


}
animateNav();