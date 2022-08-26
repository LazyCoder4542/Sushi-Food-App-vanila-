fetch("./scripts/menu.json")
    .then(
        function (resp) {
            return resp.json();
        }
    )
    .then(
        function (menu) {
            var content = new loadMenu(menu)
            content.initialize()
        }
    );
var cart = JSON.parse(localStorage.getItem('cart')) //localStorage.getItem('cart') ? localStorage.getItem('cart') : "";
console.log(cart)
class loadMenu {
    constructor(menu) {
        this.menu = menu
        //this.totalQuantity = 0
    }
    initialize() {
        this.createDOM()
        this.cartBagde()

    }
    cartBagde() {
        this.totalQuantity = 0
        if (cart != null) {
            cart.forEach(item => {
                if (item.quantity) {
                    this.totalQuantity += item.quantity
                }
                else {
                    this.totalQuantity++
                }
            })
        }
        console.log(this.totalQuantity);
        if (this.totalQuantity != 0) {
            $('.menu .badge').show()
            $('.menu .badge').text(this.totalQuantity)
        }
        else {
            $('.menu .badge').hide()
        }
    }
    createDOM() {
        this.menu.forEach(sweetfood => {
            var container = document.querySelector('.menu-container').cloneNode(true)
            var name = sweetfood.name
            var price = sweetfood.price
            var imageURL = sweetfood.url
            var text = sweetfood.mainIngredients
            //var quantity = cart.quantity == null ? cart.quantity : 1;
            container.setAttribute('id', name.split(' ').join('-'))
            container.querySelector('.name').textContent = name
            container.querySelector('.text').textContent = text
            container.querySelector('.price').textContent = `$ ${price}`
            container.querySelector('.image').src = imageURL
            container.querySelector('.image').alt = name
            var item = {};
            item.name = name
            item.price = price
            item.url = imageURL
            //item.quantity = quantity
            container.querySelector('.add-item').addEventListener('click', () => {
                if (cart == null) {
                    cart = [...[item]];
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                else {
                    var isInCart = () => {
                        let bool = false
                        cart.forEach((itm) => {
                            if (itm.name.toString() == item.name.toString()) {
                                bool = true
                            }
                        })
                        return bool
                    }

                    if (isInCart()) {
                        alert(`${item.name[0].toUpperCase() + item.name.substring(1)} already in cart`)
                    }
                    else {
                        cart = cart.concat([item])
                        this.cartBagde()
                        localStorage.setItem('cart', JSON.stringify(cart))
                    }
                }
            })
            document.querySelector('#menu-list').querySelector('.wrapper').append(container)
        });
        document.querySelector('.menu-container').hidden = true
    }
}
