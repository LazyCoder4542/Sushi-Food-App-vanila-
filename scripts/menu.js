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

class loadMenu {
    constructor(menu) {
        this.menu = menu
    }
    initialize() {
        console.log(this.menu);
        this.createDOM()
    }
    createDOM() {
        this.menu.forEach(sweetfood => {
            var container = document.querySelector('.menu-container').cloneNode(true)
            var name = sweetfood.name
            var price = sweetfood.price
            var imageURL = sweetfood.url
            container.querySelector('.name').textContent = name
            container.querySelector('.price').textContent = `$ ${price}`
            container.querySelector('.image').src = imageURL
            container.querySelector('.image').alt = name
            console.log(container);
            document.querySelector('#menu-list').querySelector('.wrapper').append(container)
        });
        document.querySelector('.menu-container').hidden = true
    }
}
