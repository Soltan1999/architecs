document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");
  const menuItems = document.querySelector(".menu-items");
  const overlay = document.getElementById("overlay");
  const closeMenu = document.querySelector(".fa-x");
  const counters = document.querySelectorAll(".count span");
  let started = false;

  menu.addEventListener("click", function () {
    menuItems.classList.add("active");
    overlay.classList.add("active");
  });

  closeMenu.addEventListener("click", function () {
    menuItems.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function () {
    menuItems.classList.remove("active");
    overlay.classList.remove("active");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".more_dev span").forEach((span) => {
    observer.observe(span);
  });


  function countUp(el) {
    const target = +el.getAttribute('data-target');
    const speed = 200;

    const updateCount = () => {
      const current = +el.innerText;
      const increment = target / speed;

      if (current < target) {
        el.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20); 
      } else {
        el.innerText = target;
      }
    };

    updateCount();
  }

  const observers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        counters.forEach(counter => countUp(counter));
        started = true;
      }
    });
  }, {
    threshold: 0.5 
  });

  const countsSection = document.querySelector('.counts');
  observers.observe(countsSection);
});
