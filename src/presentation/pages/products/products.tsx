'use client'

import { useEffect, useMemo, useState } from 'react'
import { Product } from '@/domain'
import { AddProductModal, ProductTable } from './components'
import { Filters, FilterType } from './components/filters'
import { BmgService } from '@/infra-data/services'

const bmgService = new BmgService()

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [filterText, setFilterText] = useState('')
  const [filterType, setFilterType] = useState<FilterType>(FilterType.name)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const result = await bmgService.getAll()
      if (!result.ok) {
        return alert('Erro ao listar produtos')
      }

      setProducts(result.value)
    })()
  }, [])

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
