document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("nav ul");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      // Skip if it's not a valid anchor link
      if (targetId === "#" || !targetId.startsWith("#")) return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open after clicking a link
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        }
      }
    });
  });

  // Add scroll animation to elements
  const animateOnScroll = (elements, animationClass) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  };

  // Animate service cards
  const serviceCards = document.querySelectorAll(".service-card");
  animateOnScroll(serviceCards, "fade-in-up");

  // Animate reason cards
  const reasonCards = document.querySelectorAll(".reason-card");
  animateOnScroll(reasonCards, "fade-in");

  // Animate CTA section
  const ctaSection = document.querySelector(".cta-section");
  if (ctaSection) animateOnScroll([ctaSection], "fade-in");

  // Active link highlighting
  const highlightCurrentPage = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href");
      // Remove any existing active class
      link.classList.remove("active");

      // Check if this link matches the current page
      if (
        currentPath.endsWith(linkPath) ||
        (currentPath === "/" && linkPath === "index.html") ||
        (currentPath.endsWith("/") && linkPath === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  };

  highlightCurrentPage();

  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transition = "all 0.3s ease";
    });
  });

  // Phone number formatting for contact form
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      // Get only digits from the input
      let digits = e.target.value.replace(/\D/g, "");

      // Format as (XXX) XXX-XXXX
      if (digits.length > 0) {
        if (digits.length <= 3) {
          phoneInput.value = `(${digits}`;
        } else if (digits.length <= 6) {
          phoneInput.value = `(${digits.substring(0, 3)}) ${digits.substring(
            3
          )}`;
        } else {
          phoneInput.value = `(${digits.substring(0, 3)}) ${digits.substring(
            3,
            6
          )}-${digits.substring(6, 10)}`;
        }
      }
    });
  }
});

// Add CSS for animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  .fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* Add initial opacity to elements we want to animate */
  .service-card, .reason-card, .cta-section {
    opacity: 0;
  }
  
  /* Add hover effect for service cards */
  .service-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  /* Add ripple effect to buttons */
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .btn:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.5s, opacity 0.5s;
  }
  
  .btn:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
`;
document.head.appendChild(styleSheet);
