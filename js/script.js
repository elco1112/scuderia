document.addEventListener("DOMContentLoaded", () =>{
    const countDownDate = new Date("Mar 22, 2026 15:00:00").getTime();
    const countdownContainer = document.getElementById("countdown");

    if (countdownContainer){
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        const timer = setInterval(() =>{
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0){
                clearInterval(timer);
                countdownContainer.innerHTML = "<h2>IT'S LIGHTS OUT AND AWAY WE GO!</h2>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = String(days).padStart(2, '0');
            hoursEl.innerText = String(hours).padStart(2, '0');
            minutesEl.innerText = String(minutes).padStart(2, '0');
            secondsEl.innerText = String(seconds).padStart(2, '0');
        }, 1000);
    }

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const slider = document.querySelector('.news-container');
    const cards = document.querySelectorAll('.newscard');

    if (slider && cards.length > 0){
        let isDown = false;
        let startX;
        let scrollLeft;
        let currentActiveCard = null;
        let isTicking = false;

        slider.addEventListener('mousedown', (e) =>{
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () =>{
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () =>{
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) =>{
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1;
            slider.scrollLeft = scrollLeft - walk;
            
            requestUpdate();
        });

        slider.addEventListener('scroll', requestUpdate);

        function requestUpdate(){
            if (!isTicking){
                window.requestAnimationFrame(() =>{
                    updateCenterCard();
                    isTicking = false;
                });
                isTicking = true;
            }
        }

        function updateCenterCard(){
            const sliderRect = slider.getBoundingClientRect();
            const sliderCenter = sliderRect.left + (sliderRect.width / 2);
            
            let closestCard = null;
            let minDistance = Infinity;

            cards.forEach(card =>{
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + (cardRect.width / 2);
                const distance = Math.abs(sliderCenter - cardCenter);

                if (distance < minDistance){
                    minDistance = distance;
                    closestCard = card;
                }
            });

            if (closestCard !== currentActiveCard){
                if (currentActiveCard){
                    currentActiveCard.classList.remove('active');
                }
                closestCard.classList.add('active');
                currentActiveCard = closestCard;
            }
        }

        updateCenterCard();
    }

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// GSAP 관련 애니메이션 코드 병합 최적화
    if (typeof gsap !== 'undefined'){
        gsap.registerPlugin(ScrollTrigger);

        // Sub Section 5 (부품 콜아웃)
        const calloutItems = document.querySelectorAll(".callout-item");

        if (calloutItems.length > 0){
            calloutItems.forEach((item) =>{
                ScrollTrigger.create({
                    trigger: item, 
                    start: "top 75%", 
                    end: "bottom 20%", 
                    toggleClass: "is-active",
                });
            });
        }

        // Main Hero 애니메이션
        const tl = gsap.timeline();
        tl.from(".gp-info h2", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 })
        .from(".session-type", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".time-box", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");

        // Sub Section 4
        gsap.from(".carname h2", {
            scrollTrigger: {
                trigger: "#sub-section-4",
                start: "top 60%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Sub Section 6
        gsap.from(".shop-img h2, .shop-more", {
            scrollTrigger: {
                trigger: "#sub-section-6",
                start: "top 60%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const header = document.getElementById('header');
    
    if (header){
        window.addEventListener('scroll', () =>{
            if (window.scrollY > 50){
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const menuToggle = document.getElementById('menu-toggle');
    const gnbMenu = document.querySelector('.gnb ul');
    const body = document.body;

    if (menuToggle && gnbMenu){
        menuToggle.addEventListener('click', () =>{
            menuToggle.classList.toggle('active');
            gnbMenu.classList.toggle('active');

            if (gnbMenu.classList.contains('active')){
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        const menuLinks = gnbMenu.querySelectorAll('a');
        menuLinks.forEach(link =>{
            link.addEventListener('click', () =>{
                menuToggle.classList.remove('active');
                gnbMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const topBtn = document.getElementById("top-btn");

    if (topBtn){
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 300){
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        });

        topBtn.addEventListener("click", () =>{
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});