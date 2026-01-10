import { useNavigate } from 'react-router-dom';

export const useAnimatedNavigation = () => {
  const navigate = useNavigate();

  const animatedNavigate = (to: string) => {
    setTimeout(() => {
      navigate(to);
    }, 50);
  };

  return { animatedNavigate };
};
