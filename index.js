function animateCount(el, target) {
    let current = 0;
    const speed = target / 100; // adjust speed here

    const updateCount = () => {
      if (current < target) {
        current += speed;
        el.innerText = `${Math.ceil(current)}`;
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = `${target}`;
      }
    };

    updateCount();
  }

  // Animate when in view
  function initCounters() {
    const counters = document.querySelectorAll(".status h2");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute("data-target");
          animateCount(el, target);
          observer.unobserve(el); // animate once
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  document.addEventListener("DOMContentLoaded", initCounters);

  document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.hero, .status-container, .work-container, .skills-container, .services-container');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target); // Remove this line if you want re-triggering
        }
      });
    }, {
      threshold: 0.1
    });
  
    fadeElements.forEach(el => observer.observe(el));
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const fadeSections = document.querySelectorAll('.fade-section');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('fade-out');
        } else {
          entry.target.classList.remove('fade-in');
          entry.target.classList.add('fade-out');
        }
      });
    }, {
      threshold: 0.1
    });
  
    fadeSections.forEach(section => observer.observe(section));
  });
  