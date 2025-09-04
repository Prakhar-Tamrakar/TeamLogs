// // src/components/PathTracker.jsx
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLastPath } from "../redux/section/sectionSlice";

// const PathTracker = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setLastPath(location.pathname));
//   }, [location, dispatch]);

//   return null;
// };

// export default PathTracker;
