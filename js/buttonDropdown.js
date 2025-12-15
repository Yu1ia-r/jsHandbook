document.addEventListener("DOMContentLoaded", () => {
  
    const buttonsDropdown = document.querySelectorAll(".dropdown-btn")

    buttonsDropdown.forEach((button) => {
        button.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling
            
          

            dropdownContent.classList.toggle('visually-hidden')
            if (dropdownContent.classList.contains('visually-hidden')) {

                this.textContent = "Показать решение"
            }
            else {

                this.textContent = "Спрятать"

            }
        })
    })


    
})