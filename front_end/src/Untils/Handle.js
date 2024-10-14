
import { useNavigate } from 'react-router-dom';

export const Handle = () => {
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate('/DangTinMoi');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return {
    handleAddPost,
    handleNavigate,
  };
};

export default Handle;