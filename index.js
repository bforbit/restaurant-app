import { foodData } from '/food.js'

// Render menu in HTML
function renderMenu() {
    const menuContainer = document.getElementById('menu')
    let menuHTML = ''
    
    foodData.forEach(item => {
        menuHTML += `
            <div class="menuItem">
                <div class="menuItemImg">
                ${item.image}
                </div>
                <div class="menuItemInfo">
                <span id="item-name">${item.food}</span>
                <p id="item-ingredients">${item.ingredients.join(", ")}</p>
                <p id="item-price">$${item.price}</p>
                </div>
                <div class="menuBtn">
                <button class="addToOrderBtn">+</button>
                </div>
            </div>
            <hr>
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
const orderModal = document.getElementById("order-modal")
const itemsAdded = document.getElementById("items-added")
const totalPrice = document.getElementById("total-price")
const completeOrderOne = document.getElementById("complete-order-1")
const completeOrderTwo = document.getElementById("complete-order-2")

////FUNCTION - OPEN FIRST MODAL
function openModal(foodName, foodPrice) {
    orderModal.classList.remove("modal-hidden")

// Create const for a new div to hold each name, price, and removal
    const itemIndividual = document.createElement("div")

// Add specific food item and removal button to list
    itemIndividual.innerHTML = `
        <p>${foodName} <span id="food-price">$${foodPrice}</span> <button class="removeItemBtn">remove</button></p>
        `
    itemsAdded.appendChild(itemIndividual) 

// Calculate the totals
    currentTotal += foodPrice
    totalPrice.innerHTML = `
        Total Price: <span id="total-price-number">$${currentTotal}</span>
        `

// Add event listener to the remove button
    const removeButton = itemIndividual.querySelector(".removeItemBtn")
    removeButton.addEventListener("click", () => removeItem(itemIndividual, foodPrice))
}

////FUNCTION - REMOVE ITEM
// Function to remove an item from the modal
function removeItem(itemIndividual, foodPrice) {
    itemsAdded.removeChild(itemIndividual)

// Update the total price
    currentTotal -= foodPrice
    totalPrice.innerHTML = `
        Total Price: $${currentTotal}
        `
}

//// DISPLAY SECOND MODAL
// Complete order - Step 1 - Confirm order
    const completeOrderBtn = document.getElementById("complete-order")
    completeOrderBtn.addEventListener("click",(event) => {
        event.preventDefault() // prevents button in form from resetting/reloading
        completeOrderOne.classList.remove("complete-order-card-hidden")
    })

////DISPLAY THIRD MODAL
// Complete order - Step 2 - Confirm payment and thanks
    const completeOrderPayBtn = document.getElementById("pay")
    completeOrderPayBtn.addEventListener("click",(event) => {

    // if form is correctly filled
    if (form.checkValidity()) {
    event.preventDefault()

        orderModal.classList.add("modal-hidden")
        completeOrderOne.classList.add("complete-order-card-hidden")
        completeOrderTwo.classList.remove("complete-order-2-hidden")

// Extract name from form and display message
        const form = document.getElementById("form")
        const thankYou = document.getElementById("thank-you-custom")
        const formName = document.getElementById("name").value
        thankYou.innerHTML = `
            Thanks, ${formName}! Your order is on its way!
            `
     // if form is not correctly filled
    } else {
    form.reportValidity() 

    }
    })

renderMenu()