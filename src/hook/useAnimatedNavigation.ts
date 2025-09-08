import { useNavigate } from 'react-router-dom';

export const useAnimatedNavigation = () => {
  const navigate = useNavigate();

  const animatedNavigate = (to: string) => {
    navigate(to);
  };

  return { animatedNavigate };
};
