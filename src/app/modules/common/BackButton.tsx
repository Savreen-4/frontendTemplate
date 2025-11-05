import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { setOtpStage } from '../../redux/features/auth/authSlice';

interface BackButtonProps {
  label?: string;
  to?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label, to, className = "" }) => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleBack = () => {
    if(location?.pathname === '/change-password'){
      dispatch(setOtpStage(false))
    }else{
      to ? navigate(to) : navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className={`btn btn-outline-secondary d-inline-flex align-items-center gap-2 ${className}`}
      onClick={handleBack}
      style={{
        background: '#185fdb',
        border: 'none',
        color: 'white',
        fontWeight: '600',
        padding: '6px 12px',
        fontSize: '14px'
      }}
    >
      <FaArrowLeft style={{ fontSize: '14px' }}/>
      {label || formatMessage({ id: 'Back' })}
    </button>
  );
};

export default BackButton;
