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

seletor('.pizzaInfo--addButton').addEventListener('click',()=>{// adicionar ao carrinho

    
    let size = parseInt(seletor('.pizzaInfo--size.selected').getAttribute('data-key'))
    cart.push({
        id: pizzaJson[modalKey].id,
        size,
        qt: modalQt

    })

    closeModal()
   
})