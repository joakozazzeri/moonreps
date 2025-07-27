// components/AdminProductList.js
const AdminProductList = ({ products, onEdit, onDelete, onClearAll }) => {

  const handleDelete = async (id) => {
    const userConfirmed = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (userConfirmed) {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        onDelete(id);
      }
    }
  };

  const handleDeleteAll = async () => {
    const userConfirmed = confirm(
      '¿Estás seguro de que quieres borrar TODOS los productos? Esta acción no se puede deshacer.'
    );
    if (userConfirmed) {
      try {
        const res = await fetch('/api/products/delete-all', { method: 'DELETE' });
        if (res.ok) {
          onClearAll();
          alert('Todos los productos han sido borrados.');
        } else {
          const data = await res.json();
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        alert('Ocurrió un error inesperado al borrar los productos.');
      }
    }
  };

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-white text-modern">Productos ({products.length})</h3>
              {products.length > 0 && (
                <span className="bg-brand-light/20 text-brand-light text-xs font-semibold px-3 py-1.5 rounded-full">
                  {products.length} items
                </span>
              )}
            </div>
            {products.length > 0 && (
                <button
                    onClick={handleDeleteAll}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-soft text-sm font-semibold btn-modern hover:from-red-700 hover:to-red-800 flex items-center gap-2"
                >
                    <svg className="w-4 h-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Borrar Todo
                </button>
            )}
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-16 bg-brand-dark/30 rounded-modern border border-brand-light/20">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto mb-6 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-3 text-modern">No hay productos</h3>
            <p className="text-gray-500 text-lg">Agrega tu primer producto usando el formulario</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                      <tr className="border-b border-brand-light/30">
                          <th className="p-5 font-semibold text-gray-300 uppercase text-sm tracking-wider">Nombre</th>
                          <th className="p-5 font-semibold text-gray-300 uppercase text-sm tracking-wider">Marca</th>
                          <th className="p-5 font-semibold text-gray-300 uppercase text-sm tracking-wider">Categoría</th>
                          <th className="p-5 font-semibold text-gray-300 uppercase text-sm tracking-wider">Precio</th>
                          <th className="p-5 font-semibold text-gray-300 uppercase text-sm tracking-wider text-right">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map(product => (
                          <tr key={product.id} className="border-b border-brand-light/20 hover:bg-brand-light/10 transition-colors duration-200">
                              <td className="p-5 text-brand-white font-medium text-body">{product.name}</td>
                              <td className="p-5 text-gray-300 text-body">{product.brand}</td>
                              <td className="p-5 text-gray-300 text-body">{product.category}</td>
                              <td className="p-5 text-brand-white font-mono font-semibold">${product.price.toFixed(2)}</td>
                              <td className="p-5 text-right">
                                  <div className="flex items-center justify-end gap-4">
                                    <button 
                                      onClick={() => onEdit(product)} 
                                      className="text-blue-400 hover:text-blue-300 font-semibold link-improved flex items-center gap-2 icon-modern"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      Editar
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(product.id)} 
                                      className="text-red-400 hover:text-red-300 font-semibold link-improved flex items-center gap-2 icon-modern"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      Borrar
                                    </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        )}
    </div>
  );
};

export default AdminProductList;