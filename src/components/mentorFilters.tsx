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



export default async function MentorFilters({ searchParams}: { searchParams: Promise<SearchParams> | SearchParams }) {

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
        { id: 'uxui', name: 'UX/UI' },
        { id: 'freelancing', name: 'Freelancing' },
        { id: 'career-guidance', name: 'Career Guidance' },
        { id: 'html5', name: 'HTML5' },
        { id: 'youtube', name: 'YouTube Growth' },
        { id: 'animation', name: 'Animation' },
        { id: 'coding', name: 'Coding Help' },
        { id: 'business', name: 'Business' },
    ];

    const sorting = [
        { id: 'recommended', name: 'Recommended' },
        { id: 'newest', name: 'Newest' },
        { id: 'highest-rated', name: 'Highest Rated' },
        { id: 'most-popular', name: 'Most Popular' },
    ]

    const midFilter = [
        { id: 'all', name: 'Any time' },
        { id: 'today', name: 'Today' },
        { id: 'this-week', name: 'This week' },
    ]

    return(
        <Filters initialCategory={category} initialSortBy={sortBy} initialTimeFilter={timeFilter} initialSearch={search} categories={categories} sorting={sorting} midFilter={midFilter}/>
    )

}