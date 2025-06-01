'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';





export default function Filters({initialCategory, initialSortBy, initialTimeFilter, initialSearch, categories, sorting, midFilter}:any) {

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [timeFilter, setTimeFilter] = useState(initialTimeFilter);
  const [searchTerm, setSearchTerm] = useState(initialSearch);


  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveTab(category);
    updateFilters({
      category,
      sortBy,
      timeFilter,
      search: searchTerm
    });
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateFilters({
      category: activeTab,
      sortBy: newSortBy,
      timeFilter,
      search: searchTerm
    });
  };

  // Handle time filter change
  const handleTimeFilterChange = (newTimeFilter) => {
    setTimeFilter(newTimeFilter);
    updateFilters({
      category: activeTab,
      sortBy,
      timeFilter: newTimeFilter,
      search: searchTerm
    });
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({
        category: activeTab,
        sortBy,
        timeFilter,
        search: searchTerm
      });
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className="mb-6">
      
      {/* Category Tabs */}
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-wrap space-x-2 space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === category.name 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white px-4 py-2 rounded-md">
        
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-md text-sm py-1.5"
          >
            {sorting.map(sorting => (
              <option key={sorting.id} value={sorting.id}>{sorting.name}</option>
            ))}          
          </select>
        </div>

        {/* Mid Filter */}
        <div className="flex gap-1 bg-gray-50 p-1 rounded-md overflow-hidden text-gray-600">
          {midFilter.map(midFilter => (
            <button 
              key={midFilter.id}
              onClick={() => handleTimeFilterChange(midFilter.id)}
              className={`py-1.5 px-4 text-sm font-medium cursor-pointer rounded-md ${
                timeFilter === midFilter.id ? 'bg-white text-blue-500' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {midFilter.name}
            </button>
          ))}
        </div>
        
        {/* Search */}
        <div className="relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Search in Mentors..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

      </div>
    </div>
  );
}