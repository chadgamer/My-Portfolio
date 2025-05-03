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



  // filepath: index.js
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: form.querySelector('input[placeholder="Your name"]').value,
        email: form.querySelector('input[placeholder="Your email"]').value,
        subject: form.querySelector('input[placeholder="Project inquiry"]').value,
        message: form.querySelector('textarea').value,
    };

    try {
        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Email sent successfully!');
            form.reset();
        } else {
            alert('Failed to send email.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred.');
    }
});
  