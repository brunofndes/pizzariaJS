const seletor = (element) => {
    return document.querySelector(element)
}

const seletorAll = (element) => {
    return document.querySelectorAll(element)
}

let cart = []
let modalQt = 1
let modalKey = 0



//Listagem dos produtos
pizzaJson.map((item, index) => {
    let pizzaItem = seletor('.models .pizza-item').cloneNode(true); // clone do html

    seletor('.pizza-area').append(pizzaItem) // preencher quantidade de itens do array na tela

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzaItem.querySelector('a').addEventListener('click', (e) => { // eventos do modal
        e.preventDefault()

        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQt = 1
        modalKey = key

        seletor('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        seletor('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        seletor('.pizzaBig img').src = pizzaJson[key].img
        seletor('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        seletor('.pizzaInfo--size.selected').classList.remove('selected')

        seletorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

            if (sizeIndex == 2) {
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

        })

        seletor('.pizzaInfo--qt').innerHTML = modalQt

        seletor('.pizzaWindowArea').style.opacity = 0
        setTimeout(() => {
            seletor('.pizzaWindowArea').style.opacity = 1
        }, 200)
        seletor('.pizzaWindowArea').style.display = 'flex'
    })

});

//Funções do Modal

function closeModal() {
    seletor('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        seletor('.pizzaWindowArea').style.display = 'none'
    }, 200)
}

seletorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

seletor('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--
        seletor('.pizzaInfo--qt').innerHTML = modalQt
    }
})

seletor('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    seletor('.pizzaInfo--qt').innerHTML = modalQt

})

seletorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

    size.addEventListener('click', (e) => {

        seletor('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')

    })

})

seletor('.pizzaInfo--addButton').addEventListener('click', () => { // adicionar ao carrinho


    let size = parseInt(seletor('.pizzaInfo--size.selected').getAttribute('data-key'))
    let identifier = pizzaJson[modalKey].id + '@' + size
    let key = cart.findIndex((item) => {

        return item.identifier == identifier
    })

    if (key > -1) {

        cart[key].qt +=modalQt

    } else {

        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt

        })
    }
    updateCart()
    closeModal()

})

seletor('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        seletor('aside').style.left = '0'
    }
    
})
seletor('.menu-closer').addEventListener( 'click',() => {
    seletor('aside').style.left = '100vw'
})

function updateCart(){//açõess do carrinho lateral para finalização

    seletor('.menu-openner span').innerHTML = cart.length

    if(cart.length > 0){
        seletor('aside').classList.add('show')
        seletor('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == cart[i].id
                
            })
            subtotal += pizzaItem.price * cart[i].qt

            let cartItem = seletor('.models .cart--item').cloneNode(true)

            let pizzaSizeName
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P'
                    break
                case 1:
                    pizzaSizeName = 'M'
                    break
                case 2:
                    pizzaSizeName = 'G'
                    break        
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            


            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else{
                    cart.splice(i,1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updateCart()
            })




            seletor('.cart').append(cartItem)
        }
        
        desconto = subtotal * 0.1
        total = subtotal - desconto

        seletor('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        seletor('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        seletor('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    }else{
        seletor('aside').classList.remove('show')
        seletor('aside').style.left = '100vw'
    }

}