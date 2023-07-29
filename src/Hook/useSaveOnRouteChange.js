import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useSaveOnRouteChange = (saveFunction) => {
  const location = useLocation();

  useEffect(() => {
    // Call the save function whenever the route changes
    saveFunction();
  }, [location.pathname, saveFunction]);
};

export default useSaveOnRouteChange;
