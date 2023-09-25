import React, { FC, useState, useEffect, useReducer } from "react";
import { SearchFilterProperties } from "../../../utils/types/types";
import SearchBarTile from "./search-bar-tile";
import FiltersModal from "../filters-modal";
import useFilters from "../../../utils/useFilters";
import SearchBarSkeleton from "./search-bar-skeleton";
import LinkButton from "../../button/link-button";
import { useRouter } from "next/navigation";

import {
  fetchPropertyCategoriesList,
  fetchPropertyPurposeList,
  fetchCompletionStatusList,
  fetchRentFrequencyList,
  fetchFilterOptionsList,
  fetchPropertyLocationList,
  fetchFilterProjectsList,
  fetchAreaUnits,
} from "../../../utils/api-calls";

interface SearchBarProps {
  actHome?: boolean;
  isListView?: boolean;
  onFilter?: (dontApplyFilter?: boolean) => void;
}

const searchTiles = [
  { name: "Property Type" },
  { name: "Price Range" },
  { name: "Project" },
  { name: "Location" },
  { name: "Purpose" },
];

const SearchBar: FC<SearchBarProps> = ({
  onFilter,
  actHome = false,
  isListView,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filtersProperties, setFiltersProperties] =
    useState<SearchFilterProperties>({
      propertyTypesList: undefined,
      propertyPurposeList: undefined,
      propertyLocationList: undefined,
      projectsList: undefined,
      completionStatusList: undefined,
      rentFrequencyList: undefined,
      priceRange: undefined,
      areaRange: undefined,
      areaUnitsList: undefined,
    });
  const [filtersState, filtersDispatch] = useFilters();
  const [openFilter, setOpenFilter] = useState(false);

  const handleResetFilters = () => {
    filtersDispatch({
      type: "resetFilters",
      payload: {
        minSelectedArea: filtersProperties.areaRange[0],
        maxSelectedArea: filtersProperties.areaRange[1],
        minSelectedPrice: filtersProperties.priceRange[0],
        maxSelectedPrice: filtersProperties.priceRange[1],
        selectedAreaUnit: filtersProperties.areaUnitsList[0].name,
      },
    });

    if (!actHome) {
      onFilter(true);
    }
  };

  const getPropertyTypesList = async () => {
    const respCategories = await fetchPropertyCategoriesList();

    const categoriesList = respCategories?.map((category) => {
      const typesList = category.attributes.property_types.data.map((type) => {
        return {
          id: type.id,
          name: type.attributes.name,
        };
      });

      return {
        id: category.id,
        name: category.attributes.name,
        types: typesList,
      };
    });

    setFiltersProperties((oldState) => ({
      ...oldState,
      propertyTypesList: categoriesList,
    }));
  };

  const getProjectsList = async () => {
    const resp = await fetchFilterProjectsList();

    const normalizedProjectsList = resp?.map((project) => {
      return {
        id: project.id,
        label: project.attributes.title,
      };
    });

    setFiltersProperties((oldState) => ({
      ...oldState,
      projectsList: normalizedProjectsList,
    }));
  };

  const getPropertyPurposeList = async () => {
    const resp = await fetchPropertyPurposeList();

    const normalizedPropertyPurposeList = resp?.map((purpose) => {
      return {
        id: purpose.id,
        name: purpose.attributes.name,
      };
    });

    setFiltersProperties((oldState) => ({
      ...oldState,
      propertyPurposeList: normalizedPropertyPurposeList,
    }));
  };

  const getRentFrequencyList = async () => {
    const resp = await fetchRentFrequencyList();

    const rentFrequencyList = resp?.map((status) => {
      return {
        id: status.id,
        name: status.attributes.name,
      };
    });

    setFiltersProperties((oldState) => ({
      ...oldState,
      rentFrequencyList: rentFrequencyList,
    }));
  };

  const getCompletionStatusList = async () => {
    const respCompletionStatus = await fetchCompletionStatusList();

    const completionStatusList = respCompletionStatus?.map((status) => {
      return {
        id: status.id,
        name: status.attributes.name,
      };
    });

    setFiltersProperties((oldState) => ({
      ...oldState,
      completionStatusList: completionStatusList,
    }));
  };

  const getPropertyLocationList = async () => {
    const respPropertyLocation = await fetchPropertyLocationList();

    const propertyLocationList = respPropertyLocation?.map((status) => {
      return {
        id: status?.id,
        label: status?.attributes?.name,
      };
    });

    setFiltersProperties((oldState) => ({
      ...oldState,
      propertyLocationList: propertyLocationList,
    }));
  };

  const getFiltersOptionsList = async () => {
    const respFiltersOptions = await fetchFilterOptionsList();

    const priceRange = respFiltersOptions?.attributes?.priceRange;
    const areaRange = respFiltersOptions?.attributes?.areaRange;

    setFiltersProperties((oldState) => ({
      ...oldState,
      areaRange: [areaRange?.minRange, areaRange?.maxRange],
      priceRange: [priceRange?.minRange, priceRange?.maxRange],
    }));

    filtersDispatch({
      type: "setMinSelectedArea",
      payload: areaRange?.minRange,
    });
    filtersDispatch({
      type: "setMaxSelectedArea",
      payload: areaRange?.maxRange,
    });
  };

  const getAreaUnits = async () => {
    const areaUnits = await fetchAreaUnits();
    const areaUnitsData = areaUnits || [];

    const areaUnitsList = areaUnitsData?.length
      ? [
          { id: undefined, name: "All" },
          ...areaUnitsData?.map((unit, index) => ({
            id: index,
            name: unit,
          })),
        ]
      : [];
    setFiltersProperties((oldState) => ({
      ...oldState,
      areaUnitsList: areaUnitsList,
    }));

    filtersDispatch({
      type: "setSelectedAreaUnit",
      payload: areaUnitsList[0]?.name,
    });
  };

  const fetchFilterProperties = async () => {
    setLoading(true);
    try {
      await getPropertyTypesList();
      await getCompletionStatusList();
      await getPropertyPurposeList();
      await getProjectsList();
      await getPropertyLocationList();
      await getRentFrequencyList();
      await getFiltersOptionsList();
      await getAreaUnits();

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!filtersState?.filterIsSelected && filtersProperties?.priceRange) {
      filtersDispatch({
        type: "setMinSelectedPrice",
        payload: filtersProperties?.priceRange[0],
      });
      filtersDispatch({
        type: "setMaxSelectedPrice",
        payload: filtersProperties?.priceRange[1],
      });
    }
  }, [filtersState?.filterIsSelected, filtersProperties?.priceRange]);

  useEffect(() => {
    fetchFilterProperties();
  }, []);

  if (loading) {
    return <SearchBarSkeleton actListView={isListView} actHome={actHome} />;
  }

  const handleSearchFromHome = () => {
    const selectedKeys = [
      "selectedCategoryId",
      "selectedTypeId",
      "minSelectedPrice",
      "maxSelectedPrice",
      "selectedProjectId",
      "selectedPurposeId",
      "location",
    ];

    const params = new URLSearchParams();

    for (const key of selectedKeys) {
      const value = filtersState[key];
      if (value !== undefined) {
        if (Array?.isArray(value) && value?.length > 0) {
          params.set(key, value?.join(","));
        } else if (!Array?.isArray(value)) {
          params.set(key, value);
        }
      }
    }
    const queryString = params.toString();
    router.push(`/properties?${queryString}`);
  };

  return (
    <section className="relative">
      <div
        className={`flex flex-col ${isListView && "my-4"} ${
          !actHome && "container"
        }`}
      >
        {actHome ? (
          <LinkButton
            type="solid"
            text="search"
            clickEvent={() => {
              setOpenFilter(true);
            }}
            className="py-2.5 md:hidden"
          />
        ) : (
          <div
            className="md:hidden w-full flex justify-between items-center border border-nk-gray bg-white rounded-full px-5 py-2 mb-6 cursor-pointer"
            onClick={() => setOpenFilter(true)}
          >
            <p className="text-nk-gray">Search here</p>

            <svg
              className="w-8 h-8"
              viewBox="0 0 38 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.57098 0.811743C5.75474 1.20538 5.02048 1.88476 4.57264 2.66124C3.91624 3.79837 3.76337 3.88838 2.48632 3.88838C0.73928 3.88838 0.106926 4.12635 0.106926 4.78446C0.106926 5.66267 0.796881 6.04613 2.37745 6.04613C3.70513 6.04613 3.94345 6.14909 4.34129 6.89382C5.42749 8.92734 7.56223 9.91959 9.79541 9.42917C11.044 9.15483 12.6704 7.83429 13.1072 6.73969L13.3838 6.04613H25.0387C33.6814 6.04613 36.7916 5.95057 37.0733 5.67623C37.6094 5.15406 37.5449 4.29681 36.9524 4.07549C36.6771 3.97254 31.2679 3.88838 24.9323 3.88838H13.4126L12.7837 2.68775C12.3508 1.86133 11.726 1.28521 10.7784 0.838252C9.06083 0.0284806 8.20661 0.0232409 6.57098 0.811743ZM10.4072 3.10389C11.7722 4.43306 11.3662 6.56738 9.61374 7.2742C8.48829 7.72825 6.94064 7.27111 6.42476 6.33249C5.48129 4.61554 6.74916 2.34713 8.65224 2.34713C9.26876 2.34713 9.91757 2.62672 10.4072 3.10389ZM23.9354 9.73434C23.3764 10.0663 22.5931 10.8345 22.1947 11.4414L21.4702 12.5446L11.5007 12.5564C6.01743 12.5625 1.20073 12.6948 0.796881 12.8498C0.275617 13.0502 0.0917348 13.3341 0.163895 13.8276L0.265173 14.523L10.8677 14.6041L21.4702 14.6854L22.1032 15.8121C22.9796 17.3721 24.1629 18.1314 25.9568 18.2839C27.9089 18.4504 29.4436 17.6721 30.3978 16.0322L31.0963 14.8312L34.1957 14.6771C37.1157 14.5319 37.3009 14.4829 37.3961 13.8276C37.5341 12.8825 36.6217 12.5903 33.5726 12.6041C32.2215 12.6103 31.0821 12.5591 31.0406 12.4904C30.9992 12.4217 30.7476 11.9522 30.482 11.4476C29.3442 9.28429 26.1157 8.43969 23.9354 9.73434ZM28.1957 11.992C28.6752 12.4195 28.9078 12.9802 28.9078 13.7092C28.9078 16.7023 24.7861 17.1746 23.7461 14.3004C23.4059 13.3597 24.1759 11.8674 25.2314 11.4229C26.373 10.9418 27.1946 11.0996 28.1957 11.992ZM7.44481 18.0768C6.26461 18.3351 5.0132 19.3533 4.34983 20.5949C3.96782 21.3103 3.67823 21.4395 2.27617 21.5196C-0.700447 21.6898 -0.641263 23.6164 2.34073 23.6164C3.78869 23.6164 3.89978 23.6777 4.57581 24.8494C5.33127 26.1582 7.25935 27.3154 8.68515 27.3154C10.0784 27.3154 12.2432 26.0173 12.9249 24.7732L13.5579 23.6179L25.0048 23.6173C31.3008 23.6167 36.6771 23.5322 36.9524 23.4293C37.5449 23.2079 37.6094 22.3507 37.0733 21.8285C36.7916 21.5542 33.6951 21.4586 25.0997 21.4586H13.5057L12.7407 20.3267C11.3912 18.3308 9.65457 17.5932 7.44481 18.0768ZM9.89542 20.3683C12.1928 21.5255 11.25 25.1576 8.65224 25.1576C5.97439 25.1576 5.1553 21.5462 7.54451 20.2734C8.39809 19.8184 8.83928 19.8363 9.89542 20.3683Z"
                fill="#E74451"
              />
            </svg>
          </div>
        )}

        <div
          className={`hidden md:flex justify-center overflow-hidden w-full shadow-3xl ${
            (isListView || actHome) && "my-6"
          } ${
            actHome
              ? "rounded-full pl-8 pr-5 bg-nk-white"
              : "gap-0.5 rounded-xl flex-wrap"
          }`}
        >
          {searchTiles?.map((tile, index) => {
            if (actHome && tile?.name === "Purpose") {
              return null;
            }
            return (
              <SearchBarTile
                key={index}
                tile={tile}
                filtersProperties={filtersProperties}
                acthome={actHome}
                isLastChild={index === searchTiles.length - 2}
              />
            );
          })}

          {actHome ? (
            <div className="min-w-[6.563rem] lg:min-w-fit lg:flex-1 lg:flex-grow-[2.5] flex items-center justify-end bg-nk-white">
              <LinkButton
                text="Search"
                type="solid"
                clickEvent={handleSearchFromHome}
                className="w-full lg:w-[90%] md:h-[56%] lg:h-[65%]"
              />
            </div>
          ) : (
            <button
              onClick={() => onFilter()}
              className="flex items-center justify-center bg-nk-red px-6 py-4 min-w-fit flex-1 transition-all duration-300 hover:opacity-80"
            >
              <svg
                className="w-8 h-8 transform hover:scale-120 transition-transform"
                viewBox="0 0 47 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2915 4.13074C30.8135 4.13074 38.5415 11.6907 38.5415 21.0057C38.5415 30.3207 30.8135 37.8807 21.2915 37.8807C11.7695 37.8807 4.0415 30.3207 4.0415 21.0057C4.0415 11.6907 11.7695 4.13074 21.2915 4.13074ZM21.2915 34.1307C28.7033 34.1307 34.7082 28.2564 34.7082 21.0057C34.7082 13.7551 28.7033 7.88074 21.2915 7.88074C13.8798 7.88074 7.87484 13.7551 7.87484 21.0057C7.87484 28.2564 13.8798 34.1307 21.2915 34.1307ZM37.5544 34.2639L42.9767 39.5664L40.2646 42.2195L34.8443 36.9151L37.5544 34.2639Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>

        <div
          className={`flex ml-auto ${
            !isListView && !actHome && "absolute top-28 right-12 z-10"
          }`}
        >
          {filtersState?.filterIsSelected && !actHome && (
            <button
              className={`flex items-center justify-center bg-white hover:text-nk-red rounded-full px-5 py-1.5 cursor-pointer shadow-3xl transition-colors ${
                actHome && "hidden md:flex"
              }`}
              onClick={handleResetFilters}
            >
              Clear Filters
              <svg
                className="w-3.5 h-3.5 ml-2 text-nk-red"
                viewBox="0 0 31 31"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.980469"
                  y="3.05347"
                  width="4.06338"
                  height="38.3123"
                  rx="2.03169"
                  transform="rotate(-45 0.980469 3.05347)"
                />
                <rect
                  x="28.0713"
                  y="0.180176"
                  width="4.06338"
                  height="38.3123"
                  rx="2.03169"
                  transform="rotate(45 28.0713 0.180176)"
                />
              </svg>
            </button>
          )}

          {!actHome && (
            <button
              className="hidden md:flex items-center justify-center ml-4 bg-white hover:text-nk-red rounded-full px-5 py-1.5 cursor-pointer shadow-3xl"
              onClick={() => setOpenFilter(true)}
            >
              Filters
              <svg
                className="w-6 h-6 ml-2"
                viewBox="0 0 38 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.57098 0.811743C5.75474 1.20538 5.02048 1.88476 4.57264 2.66124C3.91624 3.79837 3.76337 3.88838 2.48632 3.88838C0.73928 3.88838 0.106926 4.12635 0.106926 4.78446C0.106926 5.66267 0.796881 6.04613 2.37745 6.04613C3.70513 6.04613 3.94345 6.14909 4.34129 6.89382C5.42749 8.92734 7.56223 9.91959 9.79541 9.42917C11.044 9.15483 12.6704 7.83429 13.1072 6.73969L13.3838 6.04613H25.0387C33.6814 6.04613 36.7916 5.95057 37.0733 5.67623C37.6094 5.15406 37.5449 4.29681 36.9524 4.07549C36.6771 3.97254 31.2679 3.88838 24.9323 3.88838H13.4126L12.7837 2.68775C12.3508 1.86133 11.726 1.28521 10.7784 0.838252C9.06083 0.0284806 8.20661 0.0232409 6.57098 0.811743ZM10.4072 3.10389C11.7722 4.43306 11.3662 6.56738 9.61374 7.2742C8.48829 7.72825 6.94064 7.27111 6.42476 6.33249C5.48129 4.61554 6.74916 2.34713 8.65224 2.34713C9.26876 2.34713 9.91757 2.62672 10.4072 3.10389ZM23.9354 9.73434C23.3764 10.0663 22.5931 10.8345 22.1947 11.4414L21.4702 12.5446L11.5007 12.5564C6.01743 12.5625 1.20073 12.6948 0.796881 12.8498C0.275617 13.0502 0.0917348 13.3341 0.163895 13.8276L0.265173 14.523L10.8677 14.6041L21.4702 14.6854L22.1032 15.8121C22.9796 17.3721 24.1629 18.1314 25.9568 18.2839C27.9089 18.4504 29.4436 17.6721 30.3978 16.0322L31.0963 14.8312L34.1957 14.6771C37.1157 14.5319 37.3009 14.4829 37.3961 13.8276C37.5341 12.8825 36.6217 12.5903 33.5726 12.6041C32.2215 12.6103 31.0821 12.5591 31.0406 12.4904C30.9992 12.4217 30.7476 11.9522 30.482 11.4476C29.3442 9.28429 26.1157 8.43969 23.9354 9.73434ZM28.1957 11.992C28.6752 12.4195 28.9078 12.9802 28.9078 13.7092C28.9078 16.7023 24.7861 17.1746 23.7461 14.3004C23.4059 13.3597 24.1759 11.8674 25.2314 11.4229C26.373 10.9418 27.1946 11.0996 28.1957 11.992ZM7.44481 18.0768C6.26461 18.3351 5.0132 19.3533 4.34983 20.5949C3.96782 21.3103 3.67823 21.4395 2.27617 21.5196C-0.700447 21.6898 -0.641263 23.6164 2.34073 23.6164C3.78869 23.6164 3.89978 23.6777 4.57581 24.8494C5.33127 26.1582 7.25935 27.3154 8.68515 27.3154C10.0784 27.3154 12.2432 26.0173 12.9249 24.7732L13.5579 23.6179L25.0048 23.6173C31.3008 23.6167 36.6771 23.5322 36.9524 23.4293C37.5449 23.2079 37.6094 22.3507 37.0733 21.8285C36.7916 21.5542 33.6951 21.4586 25.0997 21.4586H13.5057L12.7407 20.3267C11.3912 18.3308 9.65457 17.5932 7.44481 18.0768ZM9.89542 20.3683C12.1928 21.5255 11.25 25.1576 8.65224 25.1576C5.97439 25.1576 5.1553 21.5462 7.54451 20.2734C8.39809 19.8184 8.83928 19.8363 9.89542 20.3683Z"
                  fill="#E74451"
                />
              </svg>
            </button>
          )}
        </div>

        <FiltersModal
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          filtersProperties={filtersProperties}
          onFilter={actHome ? handleSearchFromHome : onFilter}
          actHome={actHome}
        />
      </div>
    </section>
  );
};

export default SearchBar;
