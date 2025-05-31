import Filters from "./filters";


interface SearchParams {
  category?: string;
  sortBy?: string;
  timeFilter?: string;
  search?: string;
}

const DEFAULTS: Required<SearchParams> = {
  category: 'All',
  sortBy: 'Recommended',
  timeFilter: 'All',
  search: '',
};

 



export default async function CourseFilters({ searchParams}: { searchParams: Promise<SearchParams> | SearchParams }) {

  const params = await searchParams;
 
  const hasAnyParam = Object.values(params).some(
    (v) => v !== undefined && v !== ''
  );

  const {category, sortBy, timeFilter, search}: Required<SearchParams> = hasAnyParam ? {
    category: params.category ?? DEFAULTS.category,
    sortBy: params.sortBy ?? DEFAULTS.sortBy,
    timeFilter: params.timeFilter ?? DEFAULTS.timeFilter,
    search: params.search ?? DEFAULTS.search,
  } : DEFAULTS;


  const categories = [
    { id: 'all', name: 'All' },
    { id: 'design', name: 'Design' },
    { id: 'programming', name: 'Programming' },
    { id: 'business', name: 'Business' },
    { id: 'communication', name: 'Communication' },
    { id: 'school', name: 'School Subjects' },
    { id: 'freelancing', name: 'Freelancing' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'photography', name: 'Photography' },
    { id: 'language', name: 'Language' },
  ];

  const sorting = [
    { id: 'recommended', name: 'Recommended' },
    { id: 'newest', name: 'Newest' },
    { id: 'highest-rated', name: 'Highest Rated' },
    { id: 'most-popular', name: 'Most Popular' },
  ]

  const midFilter = [
    { id: 'all', name: 'All' },
    { id: 'free', name: 'Free' },
    { id: 'paid', name: 'Paid' },
  ]

  return(
    <Filters initialCategory={category} initialSortBy={sortBy} initialTimeFilter={timeFilter} initialSearch={search} categories={categories} sorting={sorting} midFilter={midFilter}/>
  )

}