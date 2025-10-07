import OrdersTable from './components/OrdersTable'

function App() {
  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-full mx-auto px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tanstack React Clearly Table</h1>
          <p className="text-gray-600 text-sm">A table shows data clearly, write by Tanstack-table + React + Tailwindcss</p>
        </div>
        <OrdersTable />
      </div>
    </div>
  )
}

export default App
