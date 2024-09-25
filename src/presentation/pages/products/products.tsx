'use client'

import { useMemo, useState } from 'react'
import { Product } from '@/domain'
import { AddProductModal, ProductTable } from './components'
import { Filters, FilterType } from './components/filters'

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', description: 'Latest model smartphone', price: 699.99 },
  { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99 },
  { id: 4, name: 'Tablet', description: '10-inch tablet with stylus', price: 449.99 },
  { id: 5, name: 'Smartwatch', description: 'Fitness tracking smartwatch', price: 249.99 },
]

export function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filterText, setFilterText] = useState('')
  const [filterType, setFilterType] = useState<FilterType>(FilterType.name)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredProducts = useMemo(() => products.filter(product => {
    const searchText = filterText.toLowerCase()
    switch (filterType) {
      case FilterType.name:
        return product.name.toLowerCase().includes(searchText)
      case FilterType.description:
        return product.description.toLowerCase().includes(searchText)
      case FilterType.price:
        return product.price.toString().includes(searchText)
      default:
        return true
    }
  }), [filterText, filterType, products])

  const onProductCreate = (product: Product) => {
    setProducts([...products, { ...product }])
    setIsCreateModalOpen(false)
  }

  const onEditProduct = (product: Product): void => {
    setProducts(products.map(p => p.id === product.id ? product : p))
  }

  function onDeleteProduct(product: Product) {
    setProducts(products.filter(p => p.id !== product.id))
  }

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: '1200px' }}>
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <div className="flex justify-between items-center mb-4">
        <Filters
          filterType={filterType}
          onInputChange={(e) => setFilterText(e.target.value)}
          onSelectChange={e => setFilterType(e as FilterType)}
          value={filterText}
        />
        <AddProductModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onProductCreate={onProductCreate}
        />
      </div>
      <div className="border rounded-lg overflow-hidden">
        <ProductTable
          onDeleteProduct={onDeleteProduct}
          onEditProduct={onEditProduct}
          products={filteredProducts}
        />
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhum produto encontrado</p>
      )}
    </div>
  )
}
