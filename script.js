// Smooth scroll for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Add ripple effect to navigation links
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animate gallery items when section becomes visible
      if (entry.target.querySelector(".gallery")) {
        const galleryItems = entry.target.querySelectorAll(".gallery-item")
        galleryItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.animation = `scaleIn 0.6s ease forwards`
          }, index * 100)
        })
      }
    }
  })
}, observerOptions)

// Observe all sections with fade-section class
document.querySelectorAll(".fade-section").forEach((section) => {
  observer.observe(section)
})

// Parallax effect for header
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const header = document.querySelector("header")
  const nav = document.querySelector("nav")

  // Parallax header
  if (header) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`
    header.style.opacity = 1 - scrolled / 500
  }

  // Add shadow to nav on scroll
  if (nav) {
    if (scrolled > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
  }
})

// Gallery image hover effect with tilt
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
  })
})

// Material cards stagger animation
const materialCards = document.querySelectorAll(".material-card")

const materialsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".material-card")
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateX(0) scale(1)"

            card.style.animation = "cardEntrance 0.8s ease forwards, pulse 2s ease-in-out infinite"
          }, index * 300)
        })
      }
    })
  },
  { threshold: 0.2 },
)

// Observe materials section
const materialsSection = document.querySelector("#materials")
if (materialsSection) {
  materialsObserver.observe(materialsSection)
}

// Set initial state for material cards
materialCards.forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateX(-100px) scale(0.9)"
  card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
})

const style = document.createElement("style")
style.textContent = `
  @keyframes cardEntrance {
    0% {
      opacity: 0;
      transform: translateX(-100px) scale(0.9) rotateY(-15deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1) rotateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(255, 112, 67, 0.15);
    }
    50% {
      box-shadow: 0 8px 30px rgba(255, 87, 34, 0.25);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`
document.head.appendChild(style)

materialCards.forEach((card) => {
  // Add shimmer effect on hover
  card.addEventListener("mouseenter", () => {
    card.style.backgroundSize = "200% 100%"
    card.style.backgroundImage =
      "linear-gradient(135deg, #ffccbc 0%, #ffab91 30%, #ff8a65 50%, #ffab91 70%, #ffccbc 100%)"
    card.style.animation = "shimmer 2s linear infinite, pulse 2s ease-in-out infinite"
  })

  card.addEventListener("mouseleave", () => {
    card.style.backgroundSize = "100% 100%"
    card.style.backgroundImage = "linear-gradient(135deg, #ffe0b2 0%, #ffccbc 100%)"
    card.style.animation = "pulse 2s ease-in-out infinite"
  })

  card.addEventListener("click", (e) => {
    const ripple = document.createElement("div")
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255, 112, 67, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.8s ease-out;
      pointer-events: none;
    `

    const rippleStyle = document.createElement("style")
    rippleStyle.textContent = `
      @keyframes rippleEffect {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(rippleStyle)

    card.appendChild(ripple)
    setTimeout(() => ripple.remove(), 800)
  })
})

// CEO image interaction
const ceoImage = document.querySelector(".ceo-image")
if (ceoImage) {
  ceoImage.addEventListener("mousemove", (e) => {
    const rect = ceoImage.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = y / 20
    const rotateY = -x / 20

    ceoImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  })

  ceoImage.addEventListener("mouseleave", () => {
    ceoImage.style.transform = "rotateX(0) rotateY(0) scale(1)"
  })
}

// Add scroll progress indicator
const createScrollIndicator = () => {
  const indicator = document.createElement("div")
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #7c4dff, #00bcd4, #4caf50, #ff7043);
    background-size: 200% 100%;
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 2px 10px rgba(124, 77, 255, 0.5);
    animation: shimmer 3s linear infinite;
  `
  document.body.appendChild(indicator)

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.pageYOffset / windowHeight) * 100
    indicator.style.width = scrolled + "%"
  })
}

createScrollIndicator()

// Entrance animation on page load
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

console.log("Index Script Loaded Successfully.")
