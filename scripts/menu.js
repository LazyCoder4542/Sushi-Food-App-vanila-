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
//localStorage.setItem("cart", null)
var cart = JSON.parse(localStorage.getItem('cart')) //localStorage.getItem('cart') ? localStorage.getItem('cart') : "";
//console.log(cart)
class loadMenu {
    constructor(menu) {
        this.menu = menu
    }
    initialize() {
        this.createDOM()
    }
    createDOM() {
        this.menu.forEach(sweetfood => {
            var container = document.querySelector('.menu-container').cloneNode(true)
            var name = sweetfood.name
            var price = sweetfood.price
            var imageURL = sweetfood.url
            var text = sweetfood.mainIngredients
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
                        localStorage.setItem('cart', JSON.stringify(cart))
                    }
                }
            })
            document.querySelector('#menu-list').querySelector('.wrapper').append(container)
        });
        document.querySelector('.menu-container').hidden = true
    }
}
''.to