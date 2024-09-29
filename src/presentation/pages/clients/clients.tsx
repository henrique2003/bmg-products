'use client'

import { useEffect, useMemo, useState } from 'react'
import { Client } from '@/domain'
import { AddClientModal, ClientTable } from './components'
import { Filters, FilterType } from './components/filters'
import { BmgService } from '@/infra-data/services'

const bmgService = new BmgService()

export function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [filterText, setFilterText] = useState('')
  const [filterType, setFilterType] = useState<FilterType>(FilterType.Name)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoadingClients, setIsLoadingClients] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoadingClients(true)

      const result = await bmgService.getAll()
      if (result.ok && result.value.length > 0) {
        setClients(result.value)
      }

      setIsLoadingClients(false)
    }

    fetchClients()
  }, [isCreateModalOpen])

  const filteredClients = useMemo(() => {
    const searchText = filterText.toLowerCase();
    return clients.filter(client => {
      switch (filterType) {
        case FilterType.Name:
          return client.name.toLowerCase().includes(searchText);
        case FilterType.Age:
          return client.age.toString().includes(searchText);
        case FilterType.Email:
          return client.email.toLowerCase().includes(searchText);
        case FilterType.Address:
          return client.address.toLowerCase().includes(searchText);
        default:
          return true;
      }
    });
  }, [filterText, filterType, clients]);

  const onClientCreate = (client: Client) => {
    setClients(prev => [...prev, client])
    setIsCreateModalOpen(false)
  }

  const onEditClient = (client: Client): void => {
    setClients(prev => prev.map(c => (c.id === client.id ? client : c)))
  }

  const onDeleteClient = (client: Client) => {
    setClients(prev => prev.filter(c => c.id !== client.id))
  }

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: '1200px' }}>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <div className="flex justify-between items-center mb-4">
        <Filters
          filterType={filterType}
          onInputChange={(e) => setFilterText(e.target.value)}
          onSelectChange={(e) => setFilterType(e as FilterType)}
          value={filterText}
        />
        <AddClientModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onClientCreate={onClientCreate}
        />
      </div>
      <ClientTable
        onDeleteClient={onDeleteClient}
        onEditClient={onEditClient}
        clients={filteredClients}
        isLoading={isLoadingClients}
      />
    </div>
  )
}
