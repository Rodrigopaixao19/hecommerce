import React, {
  useContext,
  useState,
  Dispatch,
  createContext,
  useEffect,
  SetStateAction,
} from "react";

/* Types */
type ViewState = "client" | "admin";

// dispatchs are methods used to dispatch actions and trigger state changes to the store
type ViewDispatch = Dispatch<SetStateAction<ViewState>>;
/* Types */

/* Contexts */
const ViewStateContext = createContext<ViewState | undefined>(undefined);
const ViewDispatchContext = createContext<ViewDispatch | undefined>(undefined);

/* Contexts */

const ViewContextProvider: React.FC = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewState>("admin");

  return (
    <ViewStateContext.Provider value={viewMode}>
      <ViewDispatchContext.Provider value={setViewMode}>
        {children}
      </ViewDispatchContext.Provider>
    </ViewStateContext.Provider>
  );
};

export default ViewContextProvider;

export const useViewContext = () => {
  const viewMode = useContext(ViewStateContext);
  const setViewMode = useContext(ViewDispatchContext);

  if (viewMode === undefined || setViewMode === undefined)
    throw new Error("useViewContext must be used within a ViewContextProvider");

  return { viewMode, setViewMode };
};
