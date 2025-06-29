// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      // Toggle icon
      if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
      // Add shadow and reduce padding on scroll
      if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = 'none';
      }
      
      // Active nav link based on scroll position
      let current = '';
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
        
        // Scroll to the target
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Skills Icons Interaction
    const skillIcons = document.querySelectorAll('.skill-icon');
    const skillDescription = document.getElementById('skill-description');
    
    // Skill descriptions object
    const skillDescriptions = {
      'JavaScript': 'Modern JavaScript (ES6+) for building interactive web applications with a focus on functional programming.',
      'React': 'Building scalable single-page applications with React, Redux, and the latest React hooks architecture.',
      'Node.js': 'Server-side JavaScript for creating fast and scalable network applications and APIs.',
      'HTML5': 'Semantic HTML5 markup with accessibility best practices for better SEO and user experience.',
      'CSS3': 'Advanced CSS3 with Flexbox, Grid, animations, and responsive design principles.',
      'Git': 'Version control with Git, including branching strategies and collaborative workflows.',
      'Docker': 'Containerization for consistent development and deployment environments.',
      'AWS': 'Cloud infrastructure deployment with various AWS services like S3, EC2, Lambda, and more.',
      'Python': 'Python for data processing, automation scripts, and backend development.'
    };
    
    // Add hover event listeners to skill icons
    skillIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        const skill = this.getAttribute('data-name');
        skillDescription.textContent = skillDescriptions[skill] || 'Hover over an icon to learn more';
        
        // Add active class to highlight the icon
        this.classList.add('active-skill');
      });
      
      icon.addEventListener('mouseleave', function() {
        this.classList.remove('active-skill');
      });
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 100);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      if (index < 0) {
        currentSlide = testimonialItems.length - 1;
      } else if (index >= testimonialItems.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      
      // Hide all slides
      testimonialItems.forEach(item => {
        item.classList.remove('active');
      });
      
      // Remove active class from all dots
      testimonialDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate the corresponding dot
      testimonialItems[currentSlide].classList.add('active');
      testimonialDots[currentSlide].classList.add('active');
    }
    
    // Previous button event
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
    
    // Next button event
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Auto slide testimonials every 5 seconds
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
          formMessage.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          formMessage.innerHTML = '<div class="alert alert-danger">Please enter a valid email address.</div>';
          return;
        }
        
        // Simulate form submission (in a real site, you'd send this to a server)
        formMessage.innerHTML = '<div class="alert alert-info">Sending message...</div>';
        
        // Simulate server response after 2 seconds
        setTimeout(() => {
          contactForm.reset();
          formMessage.innerHTML = '<div class="alert alert-success">Your message has been sent successfully!</div>';
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            formMessage.innerHTML = '';
          }, 5000);
        }, 2000);
      });
    }
    
    // Download CV button click handler
    const downloadCV = document.getElementById('download-cv');
    if (downloadCV) {
      downloadCV.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real site, this would link to an actual file
        alert('CV download would start in a real portfolio website.');
      });
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Animation on scroll
    function revealOnScroll() {
      const elements = document.querySelectorAll('.section-header, .about-content, .about-stats, .skills-container, .skills-showcase, .project-card, .timeline-item, .contact-info, .contact-form-container');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('reveal');
        }
      });
    }
    
    // Add reveal class to elements on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Call on page load to reveal elements already in view
    revealOnScroll();
    
    // Add current year to footer copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Privacy policy modal logic
    const privacyPolicyLink = document.getElementById('privacy-policy');
    if (privacyPolicyLink) {
      privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Privacy Policy';
        
        const modalText = document.createElement('div');
        modalText.innerHTML = `
          <p>Last updated: April 2025</p>
          <h3>1. Introduction</h3>
          <p>This Privacy Policy explains how we collect, use, and disclose your information when you use our website.</p>
          <h3>2. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you contact us or fill out a form.</p>
          <h3>3. How We Use Your Information</h3>
          <p>We use the information we collect to respond to your messages and improve our website.</p>
          <h3>4. Cookies</h3>
          <p>We use cookies to enhance your browsing experience and analyze website traffic.</p>
          <h3>5. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@example.com.</p>
        `;
        
        // Append elements to DOM
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
        
        // Close modal on click
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function(e) {
          if (e.target === modalOverlay) {
            closeModal();
          }
        });
        
        // Close modal on escape key press
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeModal();
          }
        });
        
        function closeModal() {
          document.body.removeChild(modalOverlay);
          document.body.style.overflow = '';
        }
      });
    }
    
    // Add CSS for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }
      
      .modal-content {
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        background-color: #fff;
        border-radius: 8px;
        padding: 30px;
        position: relative;
        animation: slideIn 0.3s ease;
      }
      
      .dark-theme .modal-content {
        background-color: #2c3e50;
        color: #f8f9fa;
      }
      
      .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 28px;
        cursor: pointer;
        color: #6c757d;
        transition: all 0.3s ease;
      }
      
      .modal-close:hover {
        color: #4e54c8;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        animation: reveal 0.8s ease forwards;
      }
      
      @keyframes reveal {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .active-skill {
        transform: translateY(-8px) scale(1.1);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      }
      
      .back-to-top {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      }
      
      .back-to-top.show {
        opacity: 1;
        visibility: visible;
      }
      
      .back-to-top:hover {
        background-color: var(--primary-color-light);
        transform: translateY(-3px);
      }
    `;
    
    document.head.appendChild(modalStyle);
  });




  document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));
  });



  