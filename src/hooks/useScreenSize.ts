import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreenWidth } from "../store/slices/uiSlice";

export const useScreenSize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
};

export {};
