document.addEventListener("DOMContentLoaded", () => {
    
    const openMenuBtn = document.getElementById("openMenuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const sidebarMenu = document.getElementById("sidebarMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    
    const navItems = document.querySelectorAll(".nav-item");
    const subNavLists = document.querySelectorAll(".sub-nav-list");

    function openMenu() {
        sidebarMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        sidebarMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "auto"; 
    }

    openMenuBtn.addEventListener("click", openMenu);
    closeMenuBtn.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);

    navItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            const targetId = this.getAttribute("data-target");
            
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");

            subNavLists.forEach(subList => subList.classList.remove("active"));

            if (targetId) {
                const targetSubList = document.getElementById(targetId);
                if (targetSubList) {
                    targetSubList.classList.add("active");
                }
            }
        });
    });


    const openCartBtn = document.getElementById("openCartBtn");
    const openProfileBtn = document.getElementById("openProfileBtn");
    
    const cartModalOverlay = document.getElementById("cartModalOverlay");
    const profileModalOverlay = document.getElementById("profileModalOverlay");
    
    const closeCartBtn = document.getElementById("closeCartBtn");
    const closeProfileBtn = document.getElementById("closeProfileBtn");

    function openModal(modalOverlay) {
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        closeMenu(); 
    }

    function closeModal(modalOverlay) {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    openCartBtn.addEventListener("click", () => openModal(cartModalOverlay));
    closeCartBtn.addEventListener("click", () => closeModal(cartModalOverlay));
    
    openProfileBtn.addEventListener("click", () => openModal(profileModalOverlay));
    document.getElementById("menuProfileBtn").addEventListener("click", () => {
        closeMenu();
        setTimeout(() => openModal(profileModalOverlay), 300);
    });
    closeProfileBtn.addEventListener("click", () => closeModal(profileModalOverlay));

    window.addEventListener("click", (e) => {
        if (e.target === cartModalOverlay) {
            closeModal(cartModalOverlay);
        }
        if (e.target === profileModalOverlay) {
            closeModal(profileModalOverlay);
        }
    });
});