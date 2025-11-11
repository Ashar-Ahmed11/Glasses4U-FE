import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const useScrollToTop = () => {
  const { pathname } = useLocation();
    // console.log(pathname);
    
  useEffect(() => {
    // Instantly scrolls to top when route changes
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
  }, [pathname]);
};

export default useScrollToTop;
