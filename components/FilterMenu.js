import { useState, useEffect, useRef } from 'react';

export default function FilterMenu({
    onSortChange,
    onFilterChange,
    onBrandChange,
    availableBrands = [],
    activeFilters = {}
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isOpen || Object.keys(activeFilters).some(k => activeFilters[k])
                        ? 'bg-surface-800 text-white shadow-lg shadow-purple-500/10 ring-1 ring-white/10'
                        : 'bg-surface-900 border border-surface-800 text-zinc-300 hover:text-white hover:bg-surface-800'
                    }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
                {(activeFilters.sortBy !== 'none' || activeFilters.showFeatured || activeFilters.selectedBrand !== 'Todas') && (
                    <span className="w-2 h-2 rounded-full bg-primary-500 ml-1 animate-pulse" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-surface-900 border border-surface-700 rounded-2xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-surface-800">
                        <h3 className="font-bold text-white text-sm">Filtros</h3>
                        <button
                            onClick={() => {
                                onSortChange('none');
                                onFilterChange('featured', false);
                                onBrandChange('Todas');
                            }}
                            className="text-xs text-primary-400 hover:text-primary-300"
                        >
                            Restablecer todo
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Sort by Price */}
                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                                Precio
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => onSortChange('none')}
                                    className={`p-2 rounded-lg text-xs font-medium border transition-all ${activeFilters.sortBy === 'none'
                                            ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                            : 'bg-surface-800 border-surface-700 text-zinc-400 hover:bg-surface-700'
                                        }`}
                                >
                                    Ninguno
                                </button>
                                <button
                                    onClick={() => onSortChange('price-asc')}
                                    className={`p-2 rounded-lg text-xs font-medium border transition-all ${activeFilters.sortBy === 'price-asc'
                                            ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                            : 'bg-surface-800 border-surface-700 text-zinc-400 hover:bg-surface-700'
                                        }`}
                                >
                                    Menor a Mayor
                                </button>
                                <button
                                    onClick={() => onSortChange('price-desc')}
                                    className={`p-2 rounded-lg text-xs font-medium border transition-all ${activeFilters.sortBy === 'price-desc'
                                            ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                            : 'bg-surface-800 border-surface-700 text-zinc-400 hover:bg-surface-700'
                                        }`}
                                >
                                    Mayor a Menor
                                </button>
                            </div>
                        </div>

                        {/* Filter by Featured */}
                        <div>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                                    Solo destacados
                                </span>
                                <div
                                    className={`w-10 h-6 rounded-full p-1 transition-colors ${activeFilters.showFeatured ? 'bg-primary-500' : 'bg-surface-700'
                                        }`}
                                    onClick={() => onFilterChange('featured', !activeFilters.showFeatured)}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeFilters.showFeatured ? 'translate-x-4' : 'translate-x-0'
                                        }`} />
                                </div>
                            </label>
                        </div>

                        {/* Filter by Brand */}
                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                                Marcas
                            </label>
                            <select
                                value={activeFilters.selectedBrand || 'Todas'}
                                onChange={(e) => onBrandChange(e.target.value)}
                                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            >
                                <option value="Todas">Todas las marcas</option>
                                {availableBrands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
