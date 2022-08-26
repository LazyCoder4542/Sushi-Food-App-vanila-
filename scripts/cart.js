$(document).ready(function () {
    var cart = JSON.parse(localStorage.getItem('cart'))
    class loadCart {
        constructor(cart) {
            this.cart = cart
            this.totalSum = 0
        }
        initialize() {
            this.createDOM()
            console.log(this.cart.length);
        }
        isCartEmpty() {
            if (this.cart == null | this.cart.length == 0) {
                let p = document.createElement('p')
                p.id = 'emptycart'
                p.innerHTML = 'Nothing to see here'
                $('#cart-section .wrapper').replaceWith(p)
                return true

            }
            return false
        }
        changeSum(type, amount) {
            if (type == 'add') {
                this.totalSum += amount
            }
            else if (type == 'minus') {
                this.totalSum -= amount
            }
            this.totalSum = this.totalSum.toFixed(2)
            $('.cart-call-to-action .cart-order #cart-total')[0].textContent = `$ ${this.totalSum}`
        }
        createDOM() {
            if (this.isCartEmpty() == true) {
            }
            else {
                this.cart.forEach((sweetfood, idx) => {
                    var container = $('.cart-container ul li')[0].cloneNode(true)
                    var name = sweetfood.name
                    var price = sweetfood.price
                    var imageURL = sweetfood.url
                    var quantity = sweetfood.quantity = sweetfood.quantity != null ? sweetfood.quantity : 1;
                    container.setAttribute('id', name.split(' ').join('-'))
                    container.querySelector('.food-title').querySelector('h3').textContent = name
                    container.querySelector('.food-title').querySelector('p').textContent = `$ ${price}`
                    container.querySelector('.quantity').querySelector('.value').textContent = quantity
                    container.querySelector('.food-image').querySelector('img').src = imageURL
                    container.querySelector('.food-image').querySelector('img').alt = name

                    this.totalSum += price * quantity;
                    $('.cart-call-to-action .cart-order #cart-total')[0].textContent = `$ ${this.totalSum}`

                    container.addEventListener('click', (e) => {
                        if (e.target.classList.contains('add')) {
                            sweetfood.quantity++
                            container.querySelector('.quantity').querySelector('.value').textContent = sweetfood.quantity
                            this.changeSum('add', price)
                        }
                        else if (e.target.classList.contains('minus')) {
                            sweetfood.quantity--
                            container.querySelector('.quantity').querySelector('.value').textContent = sweetfood.quantity
                            this.changeSum('minus', price)
                        }
                        else if (e.target.classList.contains('delete')) {
                            this.changeSum('minus', (price * sweetfood.quantity))
                            sweetfood.quantity = 0
                        }
                        if (sweetfood.quantity == 0) {
                            container.remove()
                            let index = null
                            this.cart.forEach((itm, idx) => {
                                if (itm.name == name) {
                                    index = idx
                                }
                            })
                            this.cart.splice(index, 1)

                        }
                        this.isCartEmpty()
                        this.updateJSON()
                    })

                    $('.cart-container ul')[0].append(container)
                });
                $('.cart-container ul li')[0].style.display = 'none'
            }
        }
        updateJSON() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }
    var cartContent = new loadCart(cart)
    cartContent.initialize()
});