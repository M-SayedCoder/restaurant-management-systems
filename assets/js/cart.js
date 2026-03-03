"use strict";

const cartCard = document.getElementById('mainCartCard');
const headerBtn = document.getElementById('headerActionBtn');
const editToggle = document.getElementById('editModeBtn');
const doneToggle = document.getElementById('doneModeBtn');
const totalAmountEl = document.querySelector('.total-amount');
const cartItemsContainer = document.getElementById('cartItemsContainer');

let items = [];

function initItems() {
    items = [];
    const rows = cartItemsContainer.querySelectorAll('.item-row');
    rows.forEach((row, index) => {
        const priceText = row.querySelector('.item-price').textContent;
        const price = parseInt(priceText.replace('$',''));
        const qty = (index === 0) ? 2 : 1;
        items.push({row: row, qty: qty, price: price});
    });
}

function renderEditMode() {
    cartCard.classList.remove('done-mode');
    cartCard.classList.add('edit-mode');
    headerBtn.textContent = 'EDIT ITEMS';

    items.forEach(item => {
        const qtyWrapper = item.row.querySelector('.quantity-wrapper');
        qtyWrapper.innerHTML = `
            <span class="qty-badge">
                <button class="minus-btn">-</button>
                <span class="qty-number">${item.qty}</span>
                <button class="plus-btn">+</button>
            </span>
            <button class="remove-btn">&times;</button>
        `;
    });
    attachButtons();
    updateTotal();
}

function renderDoneMode() {
    cartCard.classList.remove('edit-mode');
    cartCard.classList.add('done-mode');
    headerBtn.textContent = 'DONE';

    items.forEach(item => {
        const qtyWrapper = item.row.querySelector('.quantity-wrapper');
        qtyWrapper.innerHTML = `<span class="qty-badge">${item.qty}</span>`;
    });
    updateTotal();
}

function attachButtons() {
    items.forEach((item, index) => {
        const plus = item.row.querySelector('.plus-btn');
        const minus = item.row.querySelector('.minus-btn');
        const numberEl = item.row.querySelector('.qty-number');
        const removeBtn = item.row.querySelector('.remove-btn');

        if (plus) {
            plus.addEventListener('click', function() {
                item.qty++;
                numberEl.textContent = item.qty;
                updateTotal();
            });
        }

        if (minus) {
            minus.addEventListener('click', function() {
                if (item.qty > 1) {
                    item.qty--;
                    numberEl.textContent = item.qty;
                    updateTotal();
                }
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                item.row.remove();
                items.splice(index,1);
                updateTotal();
            });
        }
    });
}

function updateTotal() {
    let total = 0;
    items.forEach(item => {
        total += item.qty * item.price;
    });
    totalAmountEl.textContent = `$${total}`;
}

function setActiveToggle(mode) {
    if(mode === 'edit') {
        editToggle.classList.add('active');
        doneToggle.classList.remove('active');
    } else {
        doneToggle.classList.add('active');
        editToggle.classList.remove('active');
    }
}

editToggle.addEventListener('click', function() {
    renderEditMode();
    setActiveToggle('edit');
});

doneToggle.addEventListener('click', function() {
    renderDoneMode();
    setActiveToggle('done');
});

headerBtn.addEventListener('click', function() {
    if (cartCard.classList.contains('edit-mode')) {
        renderDoneMode();
        setActiveToggle('done');
    } else {
        renderEditMode();
        setActiveToggle('edit');
    }
});

initItems();
renderEditMode();
setActiveToggle('edit');
