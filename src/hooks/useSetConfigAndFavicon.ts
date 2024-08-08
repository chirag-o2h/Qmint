import React, { useEffect } from 'react'
import { useAppDispatch } from '.';
import { setBmkShopPageSections, setConfigDetails } from '@/redux/reducers/homepageReducer';

const useSetConfigAndFavicon = (serverData:any) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setConfigDetails(serverData?.configDetailsForRedux));
    dispatch(setBmkShopPageSections(serverData?.bmkShopPageSections));

    if (serverData?.configDetails?.Store_FaviconURL?.value) {
      const faviconUrl = serverData?.configDetails?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
      // Update favicon dynamically
      const link: any =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);
    }
  }, [serverData]);
}

export default useSetConfigAndFavicon