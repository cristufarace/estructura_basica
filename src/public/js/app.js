console.log ('Me estoy ejecutando')
document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
        
    }
})


const fetchData = async () => {
    
    try {
        const res = await fetch('/js/api.json')
        const data = await res.json()
        // console.log(data)
        pintarProductos(data) //esta linea me permite pasar los datos obtenidos mediante fetch a la funcion
        detectarBotones(data)//esta linea me permite pasar los datos obtenidos mediante fetch a la funcion
    } catch (error) {
        console.log(error)
    }
}

const contendorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    // console.log(template)
    data.forEach(producto => {
        // console.log(producto)
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.title
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
}




let carrito = {}
const detectarBotones = (data) => {
    // selecciono cada boton que hayan dentro de cada card
    const botones = document.querySelectorAll('.card button')
    
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = data.find( item  => item.id === parseInt(btn.dataset.id) )
            producto.cantidad = 1
//si ya existe en carrito... aumento su la propiedad cantidad de ese objeto
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
//si no existe en carrito... lo agrego al mismo con los  tre puntos ...producto hago una copia del mismo. Se llama spread
            carrito[producto.id] = { ...producto }
            // console.log('carrito', carrito)
            pintarCarrito()
        })
    })
}

// (1) una vez cargada la pagina se hace un fetch pidiendo todos los productos
// (2) luego se le pregutna al localStorage si tiene algo en el carrito  y en caso afirmativo que lo pinte
// (3) la funcion pintar productos ============> lo que hace es que por cada producto que llega de la peticion fetch forma una tarjeta, cada tarjeta se va insetando al fragment y una vez creadas todas las tarjetas, le inserto al DOM el fragment
// (4) En el paso anteriror al boton agregar de cada producto se le vincula el id del producto mediante el atributo data
// (5) con la funcion detectar botones ============> recorro cada boton, a cada boton se le agrega una escucha de evento evento, (con un add event listener, no se usa onclic pq es viejo eso) por lo que, cada vez que se le haga clic a un boton comprar,voy a empujar ese producto al carrito de compras. EL carrito de comprar NO PINTA NADA, solamente almcena los datos de los productos, para luego poder recorrerlos y pintarlos en el DOM de mi pagina ¿Como funciona el carrito?

//El carrito es un objeto que COLECCIONA DATOS ORDENADOS POR UN VALOR DE INDICE. Ej 1:{id:1, titulo:'cafe', precio:500, cantidad: 1}. Por cada clic que se haga en comprar, se agrega un indice con un objeto que dentro tiene las propiedaes de esa tarjeta. Si en el carrito hay 2 productos iguales la popiedad cantidad aumenta en 1. Otra forma de hacerlo es almacenarlo en un array, pero aca uso un objeto. Al usar un objeto me permite crear el inidice que mencionaba antes. El beneficio de trabajar con objetos es que no tengo que recorrer todo el carrito para manipular los botones de accion del carrito ( boton + y boton -) , porque puedo acceder a cada indicie en particular y cada vez que se agregue desde el carrito un producto o vuelva a apretar compar en ese producto desde la tarjeta, lo que hace el programa es modificar netamente el objeto en cuestion accediendo a travez del indice. AUnque igualmente lo puedo hace con array y agregarle un indicie. Para poder pintar el contenido del carrito tengo 2 opciones 1 es usar el for in (for const key in carrito) hace tal cosa o sino con Object.Values con un forEach (lo que hace object values es transformar el objeto en un array)

// (6) con la funcion pintar carrito ============> una vez que termina de recorrer y pintar el carrito, inserto en el fragmento en el DOM a travez el div con el id Items

const items = document.querySelector('#items')

const pintarCarrito = () => {

    //pendiente innerHTML
    items.innerHTML = ''
    
    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

//como no se puede recorrer un objeto con un forEach el object.values lo que hace es transformar ese objeto en un array, y una vez transformado en un array lo puedo recorrer con un for Eeach
    Object.values(carrito).forEach(producto => {
        // console.log('producto', producto)
        template.querySelector('th').textContent = producto.id
        //cuando tengo muchos TD para acceder al primero hago td [0]
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    footer.innerHTML = '' //esto lo que hace es limpiar el html

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío. Comience a comprar</th>
        `
        const pagar = document.getElementById ('pagar')
        pagar.style.backgroundColor='yellow'
        return
    }

    const pagar = document.getElementById ('pagar')
    pagar.style.backgroundColor='green'
    pagar.style.borderRadius= '10px'
    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    //reduce es una funcion de flecha que tiene un acumulador, una propiedad, la operacion que voy a realizar con el acumulador y la cantidad y en que formato me va a devolver la respuesta. EN este caso toma un acumulador (acc,)  se puede llamar como yo quiera y toma un elemento al que le suma cosas... en este caso como suma una propiedad de un objeto va entre llaves cantidad. De esta forma la cantidad se va a ir acumulando al contador, entonces la primer vuelta el acumulador va a ser 0, cantidad va a ser 1 y se lo suma al acumulador. En la proxima vuelta el acumulador va a ser 1 y la cantidad 2, y asi sucesivamente
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    // console.log(botonesAgregar)

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}



// let carritoEjemplo = {}
// carritoEjemplo = {
//     1: {id: 1, titulo: 'cafe', precio: 500, cantidad: 3},
//     2: {id: 3, titulo: 'pizza', precio: 100, cantidad: 2},
// }

// console.log(carritoEjemplo[1])

