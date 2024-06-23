import { useParams } from "react-router-dom";
import useSearchRestaurants from "@/api/RestaurantApi.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import CuisineFilter from "@/components/CuisineFilter.tsx";
import SortOptionDropdown from "@/components/SortOptionDropdown.tsx";

export type SearchState = {
    searchQuery : string;
    page : number;
    selectedCuisines : string[];
    sortOption : string;
}

export default function SearchPage() {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>(
        {
            searchQuery : "",
            page : 1,
            selectedCuisines : [],
            sortOption : "bestMatch"
        }
    );
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { results, isLoading } = useSearchRestaurants(searchState, city);
    const setSortOption = (sortOption : string) => {
        setSearchState((prevState : SearchState) => ({
            ...prevState,
            sortOption,
            page : 1
        }))
    }
    const setSelectedCuisines = (selectedCuisines : string[]) => {
        setSearchState((prevState : SearchState) => ({
            ...prevState,
            selectedCuisines,
            page : 1,
        }))
    }
    const setPage = (page : number) => {
        setSearchState((prevState) => (
            {
                ...prevState,
                page,
            }
        ))
    }
    const setSearchQuery = (searchFormData : SearchForm) => {
        setSearchState((prevState : any) => ({
            ...prevState,
            searchQuery : searchFormData.searchQuery,
            page : 1
        }));
    }
    const resetSearch = () => {
        setSearchState((prevState : any) => ({
            ...prevState,
            searchQuery : "",
            page : 1
        }));
    }
    if (!results?.data || !city) return <span>No Results Found!</span>;
    if (isLoading) return <span>Loading...</span>;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder="Search by Cuisine/Restaurant Name"
                    onReset={resetSearch}/>
                <div className="flex flex-col gap-3 lg:flex-row justify-between">
                    <SearchResultInfo
                        total={results.pagination.total}
                        city={city}/>
                    <SortOptionDropdown sortOption={searchState.sortOption}
                                        onChange={(value) => setSortOption(value)}></SortOptionDropdown>
                </div>
                {
                    results.data.map((restaurant) => (
                        <SearchResultCard restaurant={restaurant}/>
                    ))
                }
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}/>
            </div>
        </div>
    );
}