// components/SearchBar.js
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative group">
    <input
      type="text"
      placeholder="Buscar productos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft py-4 px-5 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-400 text-body shadow-soft"
    />
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    {searchTerm && (
      <button
        onClick={() => setSearchTerm('')}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 icon-modern cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

export default SearchBar;