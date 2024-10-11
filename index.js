import { foodData } from '/food.js'

// Render menu in HTML
function renderMenu() {
    const menuContainer = document.getElementById('menu')
    let menuHTML = ''
    
    foodData.forEach(item => {
        menuHTML += `
            <div class="menuItem">
                <h3>${item.food}</h3>
                <p>${item.ingredients.join(", ")}</p>
                <p>Price: $${item.price}</p>
                <p>${item.image}</p>
                <button class="addToOrderBtn">+</button>
            </div>
        `
    })
    
    menuContainer.innerHTML = menuHTML

// Create const for add buttons and add click event
    const addButton = document.querySelectorAll(".addToOrderBtn")
    addButton.forEach((button, index) => {
        // move the food and price to the modal list
        button.addEventListener("click", () => openModal(foodData[index].food, foodData[index].price, foodData[index].image))
    });
}

////MODAL
let currentTotal = 0;
const itemsAdded = document.getElementById("items-added")

// Activate the modal
function openModal(foodName, foodPrice, foodImage) {
    const modal = document.getElementById("order-modal")
    modal.classList.remove("modal-hidden")

// Create const for a new div to hold each name, price, and removal
    const itemIndividual = document.createElement("div")

// Add specific food item and removal button to list
    itemIndividual.innerHTML = `
        <p>${foodImage} ${foodName} - $${foodPrice} <button class="removeItemBtn">Remove</button></p>
        `
    itemsAdded.appendChild(itemIndividual) 

// Calculate the totals
    currentTotal += foodPrice
    const totalPrice = document.getElementById("total-price")
    totalPrice.innerHTML = `
        Total Price: $${currentTotal}
        `

// Add event listener to the remove button
    const removeButton = itemIndividual.querySelector(".removeItemBtn")
    removeButton.addEventListener("click", () => removeItem(itemIndividual, foodPrice))
}

// Function to remove an item from the modal
function removeItem(itemIndividual, foodPrice) {
    itemsAdded.removeChild(itemIndividual)

// Update the total price
    currentTotal -= foodPrice
    const totalPrice = document.getElementById("total-price")
    totalPrice.innerHTML = `
        Total Price: $${currentTotal}
        `
}

// Complete order
    const completeOrderBtn = document.getElementById("complete-order")
    const completeOrderDiv = document.getElementById("complete-order-div")
    completeOrderBtn.addEventListener("click",(event) => {
        event.preventDefault() // prevents button in form from resetting/reloading
        completeOrderDiv.classList.remove("complete-order-pop-hidden")
    })

renderMenu()