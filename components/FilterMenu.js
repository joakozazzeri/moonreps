import { useState, useEffect, useRef } from 'react';

export default function FilterMenu({
  onSortChange,
  onFilterChange,
  onBrandChange,
  availableBrands = [],
  activeFilters = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const selectedBrands = activeFilters.selectedBrands || [];
  const hasActiveFilters =
    activeFilters.sortBy !== 'none' ||
    activeFilters.showFeatured ||
    selectedBrands.length > 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleBrand = (brand) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(next);
  };

  const resetAll = () => {
    onSortChange('none');
    onFilterChange('featured', false);
    onBrandChange([]);
  };

  return (
    <div className="relative" ref={menuRef}>

      {/* Botón trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          isOpen || hasActiveFilters
            ? 'bg-surface-800 text-white ring-1 ring-white/10'
            : 'bg-surface-900 border border-surface-800 text-zinc-300 hover:text-white hover:bg-surface-800'
        }`}
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
        {selectedBrands.length > 0 && (
          <span
            className="text-[10px] font-bold text-white rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: '#3D7BFF',
              minWidth: '1.1rem',
              height: '1.1rem',
              padding: '0 0.2rem',
            }}
          >
            {selectedBrands.length}
          </span>
        )}
        {hasActiveFilters && selectedBrands.length === 0 && (
          <span className="w-2 h-2 rounded-full bg-accent-bright flex-shrink-0" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-surface-900 border border-surface-700 rounded-2xl shadow-xl z-50 p-4">

          <div className="flex justify-between items-center mb-4 pb-3 border-b border-surface-800">
            <h3 className="font-semibold text-white text-sm">Filtros</h3>
            {hasActiveFilters && (
              <button
                onClick={resetAll}
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Restablecer todo
              </button>
            )}
          </div>

          <div className="space-y-5">

            {/* Orden por precio */}
            <div>
              <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Precio
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 'none', label: 'Ninguno' },
                  { value: 'price-asc', label: '↑ Menor' },
                  { value: 'price-desc', label: '↓ Mayor' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => onSortChange(value)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      activeFilters.sortBy === value
                        ? 'bg-accent/15 border-accent-bright text-accent-bright'
                        : 'bg-surface-800 border-surface-700 text-zinc-400 hover:bg-surface-700 hover:text-zinc-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Solo destacados */}
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                Solo destacados
              </span>
              <div
                onClick={() => onFilterChange('featured', !activeFilters.showFeatured)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors flex-shrink-0 ${
                  activeFilters.showFeatured ? 'bg-accent-bright' : 'bg-surface-700'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    activeFilters.showFeatured ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </label>

            {/* Marcas — checkboxes */}
            {availableBrands.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Marcas
                  </p>
                  {selectedBrands.length > 0 && (
                    <button
                      onClick={() => onBrandChange([])}
                      className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1 scrollbar-hide">
                  {availableBrands.map((brand) => {
                    const checked = selectedBrands.includes(brand);
                    return (
                      <label
                        key={brand}
                        className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer group hover:bg-surface-800 transition-colors"
                      >
                        {/* Checkbox custom */}
                        <div
                          className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                            checked
                              ? 'border-accent-bright bg-accent-bright'
                              : 'border-surface-600 bg-surface-800 group-hover:border-surface-500'
                          }`}
                        >
                          {checked && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
                            checked ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'
                          }`}
                        >
                          {brand}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
