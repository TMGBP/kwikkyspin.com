// Make toggleFaq globally available
window.toggleFaq = function (index) {
   const faqItem = document.querySelector(`[aria-controls="faq-content-${index}"]`)
   const content = document.getElementById(`faq-content-${index}`)
   const icon = document.getElementById(`faq-icon-${index}`)

   // Toggle current FAQ
   const isExpanded = faqItem.getAttribute("aria-expanded") === "true"
   if (!isExpanded) {
      // Get the height of the content
      content.style.height = "auto"
      const height = content.scrollHeight
      content.style.height = "0"
      // Trigger reflow
      content.offsetHeight
      content.style.height = height + "px"
      icon.style.transform = "rotate(180deg)"
   } else {
      content.style.height = "0"
      icon.style.transform = "rotate(0deg)"
   }
   faqItem.setAttribute("aria-expanded", !isExpanded)
}

document.addEventListener("DOMContentLoaded", () => {
   document.querySelectorAll('.faq-item [role="button"]').forEach(button => {
      button.addEventListener("keydown", e => {
         if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            const index = button.getAttribute("aria-controls").replace("faq-content-", "")
            toggleFaq(parseInt(index))
         }
      })
   })
})
