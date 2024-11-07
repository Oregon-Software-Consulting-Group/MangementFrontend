import api from './api'
import './index.css'

// TODO: add sorting/filtering query parameters

const tbody = document.querySelector('tbody')
try {
    const response = await api.get('/products')
    console.log(response.data[0])
    for (const item of response.data) {
        // Render the product
        const template = document.getElementById('product-template')
        const clone = template.content.cloneNode(true)

        clone.querySelector('a').textContent = item.Product.ProductName
        clone.querySelector('a').href = `/product.html?id=${item._id}`
        clone.querySelector('.quantity').textContent = item.Product.QuantityAvailable

        tbody.appendChild(clone)
    }
} catch (error) {
    console.error(error)
    tbody.innerHTML = 'something went wrong...'
}
