import api from './api'
import './product.css'

// Extract product ID from URL query paramters
const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const productID = params.get('id')

const deleteProduct = async (productID, productName) => {
    if (window.confirm(`Delete: "${productName}"?\n\nWARNING: blah blah blah.`)) {
        try {
            await api.delete(`/products/${productID}`)
            // Redirect user to homepage
            window.location.replace('/')
        } catch (error) {
            console.error(error)
        }
    }
}

const tbody = document.querySelector('tbody')
try {
    const response = await api.get(`/products/${productID}`)
    const item = response.data
    console.log(item)

    const deleteBtn = document.getElementById('delete')
    deleteBtn.onclick = () => deleteProduct(productID, item.Product.ProductName)
    
    document.getElementById('product-name').textContent = item.Product.ProductName
    document.getElementById('product-id').textContent = item.Product.ProductID
    document.getElementById('quantity').textContent = item.Product.QuantityAvailable

    document.getElementById('cost-per-unit').textContent = item.Product.Stats.CostPerUnit
    document.getElementById('quantity-on-order').textContent = item.Product.Stats.QuantityOnOrder
    document.getElementById('reorder-level').textContent = item.Product.Stats.ReorderLevel
    const expirationDate = new Date(item.Product.Stats.ExpirationDate)
    document.getElementById('expiration-date').textContent = expirationDate.toLocaleDateString()
    const lastRestockedDate = new Date(item.Product.Stats.LastRestockedDate)
    document.getElementById('last-restocked-date').textContent = lastRestockedDate.toLocaleDateString()

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
