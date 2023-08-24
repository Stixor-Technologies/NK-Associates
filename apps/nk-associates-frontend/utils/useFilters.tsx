import { createContext, useContext, useReducer } from "react";

import { FiltersStateType } from "./types/types";

type ACTIONTYPE =
  | {
      type: "setLocation";
      payload: string;
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
      type: "setSelectedTypeId";
      payload: string | number;
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
      type: "resetFilters";
      payload?: unknown;
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
  location: undefined,
};

const FiltersContext = createContext<
  [FiltersStateType, React.Dispatch<ACTIONTYPE>]
>([initialState, () => {}]);

const reducer = (state: FiltersStateType, action: ACTIONTYPE) => {
  switch (action.type) {
    case "setSelectedCategoryId":
      return {
        ...state,
        selectedCategoryId: action.payload,
      };
    case "setSelectedTypeId":
      return {
        ...state,
        selectedTypeId: action.payload,
      };
    case "setSelectedProjectId":
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    case "setSelectedPurposeId":
      return {
        ...state,
        selectedPurposeId: action.payload,
      };
    case "setSelectedCompletionStatusId":
      return {
        ...state,
        selectedCompletionStatusId: action.payload,
      };
    case "setSelectedRentFrequencyId":
      return {
        ...state,
        selectedRentFrequencyId: action.payload,
      };
    case "setMinSelectedPrice":
      return {
        ...state,
        minSelectedPrice: action.payload,
      };
    case "setMaxSelectedPrice":
      return {
        ...state,
        maxSelectedPrice: action.payload,
      };
    case "setLocation":
      console.log("do something");
      break;
    case "resetFilters":
      return {
        ...initialState,
      };
      break;
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
