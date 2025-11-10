// Event data with details
const eventData = {
  1: {
    title: "Environmental Sustainability Summit",
    date: "March 15, 2024",
    description:
      "MRA International was proud to participate in Jamaica's largest environmental sustainability summit. Our team showcased innovative recycling technologies and shared insights on building a circular economy. The event brought together industry leaders, policymakers, and environmental advocates to discuss strategies for a greener future. We demonstrated our advanced sorting systems and discussed partnerships that can help scale recycling initiatives across the Caribbean region.",
    images: ["/environmental-summit-conference-hall-with-attendee.jpg", "/recycling-technology-exhibition-booth.jpg", "/business-professionals-discussing-sustainability.jpg"],
  },
  2: {
    title: "Community Recycling Workshop",
    date: "June 8, 2024",
    description:
      "We hosted an engaging hands-on workshop for local communities, teaching effective recycling practices and waste management techniques. Over 150 community members attended, including students, teachers, and local business owners. Participants learned how to properly sort recyclables, understand the impact of contamination, and discovered creative ways to reduce waste at home and work. The workshop included interactive demonstrations, Q&A sessions with our experts, and take-home educational materials. Many attendees expressed interest in starting recycling programs in their neighborhoods.",
    images: ["/community-workshop-with-people-learning-about-recy.jpg", "/hands-on-recycling-sorting-demonstration.jpg", "/group-photo-of-workshop-participants.jpg"],
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

console.log("[v0] Events Timeline loaded with interactive animations!")
