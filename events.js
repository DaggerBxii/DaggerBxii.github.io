// Event data with details
const eventData = {
  1: {
    title: "ReMA 2025 Convention & Exposition",
    date: "May 12 - 15, 2025 @San Diego, CA, U.S.A",
    description:
      "As the current largest recycling-materials industry event in the world,Rema Convention & Exposition 2025 brought together nearly 7,000 industry professionals in the City of San Diego. MRA International attended to gain a better sense on how recycled materials strengthen manufacturing sustainablity and innovation. Over the four days duration of the event, our team connected with international supplies and buyers of paper, metal and plastic recyclables, and attend expertled sessions on emerging trends, as well as explored cutting-edge equipment and technology for the recycling industry. This event reaffirmed our committment to maintiain global standards and material sourcing, processing and export.",
    images: ["public/images/rema1.cr2", "public/images/rema2.cr2", "public/images/rema3.cr2"],
  },
  2: {
    title: "Plasitcs Recycling Conference 2024",
    date: "March 25 - 27, 2024 @Grapine, TX , U.S.A",
    description:
      "Hosted by Resource Recycling Inc, the Plastics Recycling Conference 2024 was a large premier event focused on enhancing the business, policy and technology associated with plastics recycling. It had a emphasis on tackling the challengings and utliizing opportunities in the plastic recycling industry, having discussions under the themes of policy and regulation, market and economics, technology and instrastructure and design for recyclability. These discussions were held by world-leading experts in the field. MRA International Ltd. was proud to be a participant of this event, gaining insight and knowledge that will help us improve our plastic recycling processes and contribute to a more sustainable future.",
    images: ["public/images/psc1.cr2", "public/images/psc2.cr2", "public/images/psc3.cr2"],
  },
  3: {
    title: "ISRI 2023 Conference & Exposition",
    date: "April 17 - 20, 2023 @Music City Center, Nashville, TN, U.S.A",
    description:
      "MRA International Ltd. was a proud participant of the ISRI 2023 Conference & Exposition. This event had over 6,600 attendees from 58 difference countires and all 50 states of the U.S. The conference provided insight that was crucial to the industry, discussing topics such as the recycling state in China at that time, industry trends and its future, and involved various networking and educational sessions.",
    images: ["public/images/isri1.cr2", "public/images/isri2.cr2", "public/images/isri3.cr2"],
  },
}

// Intersection Observer for timeline items
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe all timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item)
})

// Modal functionality
const modal = document.getElementById("eventModal")
const closeModalBtn = document.querySelector(".close-modal")
const viewDetailsBtns = document.querySelectorAll(".view-details-btn")

// Open modal with event details
viewDetailsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const eventId = btn.getAttribute("data-event")
    const event = eventData[eventId]

    if (event) {
      // Populate modal content
      document.getElementById("modalTitle").textContent = event.title
      document.getElementById("modalDate").textContent = event.date
      document.getElementById("modalDescription").textContent = event.description

      // Populate gallery
      const gallery = document.getElementById("modalGallery")
      gallery.innerHTML = ""
      event.images.forEach((imgSrc) => {
        const img = document.createElement("img")
        img.src = imgSrc
        img.alt = event.title
        gallery.appendChild(img)
      })

      // Show modal
      modal.classList.add("active")
      document.body.style.overflow = "hidden"

      // Add ripple effect
      const ripple = document.createElement("div")
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `

      btn.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }
  })
})

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
})

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Add ripple effect animation style
const style = document.createElement("style")
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Parallax effect for header
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const header = document.querySelector("header")

  if (header) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`
    header.style.opacity = 1 - scrolled / 500
  }
})

// Observe fade sections
const fadeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  },
  { threshold: 0.15 },
)

document.querySelectorAll(".fade-section").forEach((section) => {
  fadeSectionObserver.observe(section)
})

// Animate markers on scroll
const markers = document.querySelectorAll(".timeline-marker")
markers.forEach((marker, index) => {
  setTimeout(() => {
    marker.style.animation = "pulse-marker 2s ease-in-out infinite"
  }, index * 200)
})

console.log("[Events Timeline] events.js loaded successfully.")
