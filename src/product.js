import api from './api'
import './product.css'

const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const productID = params.get('id')

const tbody = document.querySelector('tbody')
try {
    const response = await api.get(`/products/${productID}`)
    const item = response.data
    console.log(item)
    
    document.getElementById('product-name').textContent = item.Product.ProductName
    document.getElementById('product-id').textContent = item.Product.ProductID
    document.getElementById('quantity').textContent = item.Product.QuantityAvailable

    let categories = []
    for (const category of item.Categories) {
        categories.push(category.CategoryName)
    }
    document.getElementById('categories').textContent = categories.join(', ')

    document.getElementById('supplier-name').textContent = item.Supplier.SupplierName
    document.getElementById('supplier-id').textContent = item.Supplier.SupplierID
    document.getElementById('supplier-email').textContent = item.Supplier.Contact.Email
    document.getElementById('supplier-phone').textContent = item.Supplier.Contact.Phone

    // TODO: warehouse
} catch (error) {
    console.error(error)
    tbody.innerHTML = 'something went wrong...'
}
