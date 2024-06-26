import { useState, useEffect } from 'react';
import { useAppSelector } from '.';

const useImageInView = (imageId="BmkBanner") => {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
    const [imageInView, setImageInView] = useState(false);
    const imageElement = document.getElementById(imageId)
    useEffect(() => {
        const handleScroll = () => {
            if (!imageElement) return;

            const rect = imageElement.getBoundingClientRect();
            const inView = rect.bottom > 0 && rect.top < window.innerHeight;
            setImageInView(inView);
        };

        document.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [imageId,imageElement,configDetailsState?.Sliders_ShopHomepage_Enable,configDetailsState?.Sliders_ShopHomepage_Enable]);

    return imageInView;
};

export default useImageInView;
