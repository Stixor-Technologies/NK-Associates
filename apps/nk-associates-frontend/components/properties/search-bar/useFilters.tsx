import { createContext, useContext, useReducer } from "react";

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
      type: "setSelectedTypeId";
      payload: string | number;
    };

type StateType = {
  selectedCategoryId: string | number | null;
  selectedTypeId: string | number | null;
  location: string | null;
};

const initialState = {
  selectedCategoryId: undefined,
  selectedTypeId: undefined,
  location: undefined,
};

const FiltersContext = createContext<[StateType, React.Dispatch<ACTIONTYPE>]>([
  initialState,
  () => {},
]);

const reducer = (state: StateType, action: ACTIONTYPE) => {
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
    case "setLocation":
      console.log("do something");
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
