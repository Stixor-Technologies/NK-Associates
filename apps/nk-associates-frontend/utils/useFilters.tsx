import { createContext, useContext, useReducer } from "react";

import { FiltersStateType } from "./types/types";

type ACTIONTYPE =
  | {
      type: "setLocation";
      payload: string | number;
    }
  | {
      type: "setSelectedCategoryId";
      payload: string | number;
    }
  | {
      type: "setSelectedProjectId";
      payload: string | number;
    }
  | {
      type: "setSelectedPurposeId";
      payload: string | number;
    }
  | {
      type: "setMinSelectedPrice";
      payload: number;
    }
  | {
      type: "setMaxSelectedPrice";
      payload: number;
    }
  | {
      type: "setBothSelectedPrice";
      payload: [number, number];
    }
  | {
      type: "setSelectedTypeId";
      payload: string | number | undefined;
    }
  | {
      type: "setSelectedCompletionStatusId";
      payload: string | number;
    }
  | {
      type: "setSelectedRentFrequencyId";
      payload: string | number;
    }
  | {
      type: "setSelectedRoomsLimit";
      payload: number | undefined;
    }
  | {
      type: "setSelectedBathRoomsLimit";
      payload: number | undefined;
    }
  | {
      type: "setMinSelectedArea";
      payload: number;
    }
  | {
      type: "setMaxSelectedArea";
      payload: number;
    }
  | {
      type: "setBothSelectedArea";
      payload: [number, number];
    }
  | {
      type: "setSelectedAreaUnit";
      payload: string;
    }
  | {
      type: "setFilterIsSelected";
      payload: boolean;
    }
  | {
      type: "resetFilters";
      payload?: {
        minSelectedArea: number;
        maxSelectedArea: number;
        minSelectedPrice: number;
        maxSelectedPrice: number;
        selectedAreaUnit: string;
      };
    };

const initialState = {
  selectedCompletionStatusId: undefined,
  selectedRentFrequencyId: undefined,
  selectedCategoryId: undefined,
  selectedTypeId: undefined,
  selectedProjectId: undefined,
  selectedPurposeId: undefined,
  minSelectedPrice: undefined,
  maxSelectedPrice: undefined,
  selectedRoomsLimit: undefined,
  selectedBathRoomsLimit: undefined,
  minSelectedArea: undefined,
  maxSelectedArea: undefined,
  selectedAreaUnit: undefined,
  location: undefined,
  filterIsSelected: false,
};

const FiltersContext = createContext<
  [FiltersStateType, React.Dispatch<ACTIONTYPE>]
>([initialState, () => {}]);

const reducer = (state: FiltersStateType, action: ACTIONTYPE) => {
  console.log("payload", action.payload);
  switch (action.type) {
    case "setSelectedCategoryId":
      return {
        ...state,
        selectedCategoryId: action.payload,
        filterIsSelected: true,
      };
    case "setSelectedTypeId":
      return {
        ...state,
        selectedTypeId: action.payload,
        filterIsSelected: true,
      };
    case "setSelectedProjectId":
      return {
        ...state,
        selectedProjectId: action.payload,
        filterIsSelected: true,
      };
    case "setSelectedPurposeId":
      return {
        ...state,
        selectedPurposeId: action.payload,
        filterIsSelected: true,
      };
    case "setSelectedCompletionStatusId":
      return {
        ...state,
        selectedCompletionStatusId: action.payload,
        filterIsSelected: true,
      };
    case "setSelectedRentFrequencyId":
      return {
        ...state,
        selectedRentFrequencyId: action.payload,
        filterIsSelected: true,
      };
    case "setMinSelectedPrice":
      return {
        ...state,
        minSelectedPrice: action.payload,
        filterIsSelected: true,
      };
    case "setMaxSelectedPrice":
      return {
        ...state,
        maxSelectedPrice: action.payload,
        filterIsSelected: true,
      };
    case "setBothSelectedPrice":
      return {
        ...state,
        minSelectedPrice: action.payload[0],
        maxSelectedPrice: action.payload[1],
        filterIsSelected: true,
      };
    case "setSelectedBathRoomsLimit":
      return {
        ...state,
        selectedBathRoomsLimit: action.payload,
        filterIsSelected: true,
      };
    case "setSelectedRoomsLimit":
      return {
        ...state,
        selectedRoomsLimit: action.payload,
        filterIsSelected: true,
      };
    case "setMinSelectedArea":
      return {
        ...state,
        minSelectedArea: action.payload,
        filterIsSelected: true,
      };
    case "setMaxSelectedArea":
      return {
        ...state,
        maxSelectedArea: action.payload,
        filterIsSelected: true,
      };
    case "setBothSelectedArea":
      return {
        ...state,
        minSelectedArea: action.payload[0],
        maxSelectedArea: action.payload[1],
        filterIsSelected: true,
      };
    case "setSelectedAreaUnit":
      return {
        ...state,
        selectedAreaUnit: action.payload,
        filterIsSelected: true,
      };
    case "setFilterIsSelected":
      return {
        ...state,
        filterIsSelected: false,
      };
    case "setLocation":
      return {
        ...state,
        location: action.payload,
        filterIsSelected: true,
      };
    case "resetFilters":
      return {
        ...initialState,
        ...action.payload,
      };
    default:
      throw new Error("Couldn't find provided action");
  }
};

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const reducerValues = useReducer(reducer, initialState);

  return (
    <FiltersContext.Provider value={reducerValues}>
      {children}
    </FiltersContext.Provider>
  );
};

const useFilters = () => useContext(FiltersContext);

export { FiltersProvider, FiltersContext };

export default useFilters;
