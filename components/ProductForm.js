// components/ProductForm.js
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

const ProductForm = ({ onProductAdded, onProductUpdated, editingProduct, setEditingProduct, existingCategories = [] }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const predefinedCategories = ["Zapatillas", "Remeras", "Pantalones", "Abrigos", "Accesorios"];
  
  // Usar useMemo para evitar recrear allCategories en cada renderizado
  const allCategories = useMemo(() => {
    return [...new Set([...predefinedCategories, ...existingCategories])];
  }, [predefinedCategories, existingCategories]);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setBrand(editingProduct.brand || '');
      setBuyLink(editingProduct.buyLink || '');
      setImageUrls(Array.isArray(editingProduct.imageUrls) ? editingProduct.imageUrls : []);
      
      if (allCategories.includes(editingProduct.category)) {
        setCategory(editingProduct.category);
        setCustomCategory('');
      } else {
        setCategory('Otra...');
        setCustomCategory(editingProduct.category || '');
      }
    } else {
      // Reset form cuando editingProduct es null
      setName('');
      setPrice('');
      setCategory('');
      setCustomCategory('');
      setBrand('');
      setBuyLink('');
      setImageUrls([]);
    }
  }, [editingProduct, allCategories]);

  const uploadImage = async (base64Image) => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });
      
      if (res.ok) {
        const data = await res.json();
        return data.url;
      } else {
        const errorText = await res.text();
        alert(`Error al subir la imagen: ${errorText}`);
        return null;
      }
    } catch (error) {
      alert('Error de red al subir la imagen.');
      return null;
    }
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    
    let uploadedUrls = [];
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        try {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          const url = await new Promise((resolve) => {
              reader.onload = async (e) => {
                  const result = await uploadImage(e.target.result);
                  resolve(result);
              };
          });
          if (url) uploadedUrls.push(url);
        } catch (error) {
            alert('Hubo un error al comprimir una imagen.');
        }
      }
    }
    
    if(uploadedUrls.length > 0) setImageUrls(prevUrls => [...prevUrls, ...uploadedUrls]);
    setIsUploading(false);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); };
  const handlePaste = (e) => { handleFiles(e.clipboardData.files); };
  const handleFileChange = (e) => { handleFiles(e.target.files); };
  
  const removeImage = (indexToRemove) => {
    setImageUrls(prevUrls => prevUrls.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = category === 'Otra...' ? customCategory : category;
    if (!finalCategory) {
      alert('Por favor, selecciona o ingresa una categoría.');
      return;
    }

    const productData = { name, price, category: finalCategory, brand, buyLink, imageUrls: JSON.stringify(imageUrls) };

    if (editingProduct) {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        const updatedProduct = await res.json();
        const parsedProduct = { ...updatedProduct, price: parseFloat(updatedProduct.price), imageUrls: JSON.parse(updatedProduct.imageUrls || '[]') };
        onProductUpdated(parsedProduct);
        // Reset form manually
        setName('');
        setPrice('');
        setCategory('');
        setCustomCategory('');
        setBrand('');
        setBuyLink('');
        setImageUrls([]);
        if (setEditingProduct) {
          setEditingProduct(null);
        }
      }
    } else {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        const newProduct = await res.json();
        const parsedProduct = { ...newProduct, price: parseFloat(newProduct.price), imageUrls: JSON.parse(newProduct.imageUrls || '[]') };
        onProductAdded(parsedProduct);
        // Reset form manually
        setName('');
        setPrice('');
        setCategory('');
        setCustomCategory('');
        setBrand('');
        setBuyLink('');
        setImageUrls([]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-dark/50 border border-brand-light/20 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-brand-white">{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Nombre</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-brand-light/30 bg-brand-dark text-brand-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light" required />
      </div>
       <div className="mb-4">
        <label htmlFor="price" className="block text-gray-300 font-semibold mb-2">Precio (USD)</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-brand-light/30 bg-brand-dark text-brand-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light" required step="0.01" />
      </div>
       <div className="mb-4">
        <label htmlFor="brand" className="block text-gray-300 font-semibold mb-2">Marca</label>
        <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 border border-brand-light/30 bg-brand-dark text-brand-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light" placeholder="Ej: Nike" />
      </div>
       <div className="mb-4">
        <label htmlFor="category" className="block text-gray-300 font-semibold mb-2">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-brand-light/30 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light"
          style={{ color: 'white', backgroundColor: '#1f2937' }}
        >
          <option value="" disabled style={{ backgroundColor: '#1f2937', color: 'white' }}>Selecciona una categoría</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat} style={{ backgroundColor: '#1f2937', color: 'white' }}>
              {cat}
            </option>
          ))}
          <option value="Otra..." style={{ backgroundColor: '#1f2937', color: 'white' }}>Otra...</option>
        </select>
       </div>
       {category === 'Otra...' && (
        <div className="mb-4 transition-all duration-300">
          <label htmlFor="customCategory" className="block text-gray-300 font-semibold mb-2">Nombre de la Nueva Categoría</label>
          <input
            type="text"
            id="customCategory"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full px-3 py-2 border border-brand-light/30 bg-brand-dark text-brand-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light"
            placeholder="Ej: Gorras"
            required
          />
        </div>
       )}
      <div className="mb-4">
        <label htmlFor="buyLink" className="block text-gray-300 font-semibold mb-2">Enlace de Compra</label>
        <input type="url" id="buyLink" value={buyLink} onChange={(e) => setBuyLink(e.target.value)} className="w-full px-3 py-2 border border-brand-light/30 bg-brand-dark text-brand-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light" placeholder="https://ejemplo.com/producto" />
      </div>
       <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">Imágenes</label>
        <div
          onClick={() => !isUploading && fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onPaste={handlePaste}
          className={`relative w-full p-4 border-2 border-dashed rounded-lg text-center transition-colors ${isDragging ? 'border-brand-light bg-brand-dark/50' : 'border-brand-light/30 hover:border-brand-light/50'} ${isUploading ? 'cursor-not-allowed' : 'cursor-wait'}`}
        >
          <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" disabled={isUploading} />
          {isUploading ? (
              <div className="text-gray-400">Comprimiendo y subiendo...</div>
          ) : (
              <p className="text-gray-400">Arrastra y suelta, pega, o haz clic</p>
          )}
        </div>
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <Image src={url} alt={`Preview ${index}`} width={100} height={100} className="w-full h-full object-cover rounded-lg" />
              <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">X</button>
            </div>
          ))}
        </div>
       </div>
      <div className="flex justify-between items-center mt-6">
        <button type="submit" className="w-full bg-brand-light text-brand-dark px-4 py-2 rounded-lg hover:bg-opacity-80 font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={isUploading}>
          {isUploading ? 'Esperando imágenes...' : (editingProduct ? 'Actualizar Producto' : 'Añadir Producto')}
        </button>
        {editingProduct && (
          <button 
            type="button" 
            onClick={() => {
              setName('');
              setPrice('');
              setCategory('');
              setCustomCategory('');
              setBrand('');
              setBuyLink('');
              setImageUrls([]);
              if (setEditingProduct) {
                setEditingProduct(null);
              }
            }} 
            className="ml-4 bg-gray-600 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-500 font-semibold transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;