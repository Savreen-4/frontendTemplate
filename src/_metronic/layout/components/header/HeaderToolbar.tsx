/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import noUiSlider, { target } from 'nouislider'
import { useLayout } from '../../core'
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useIntl } from 'react-intl';
import { setLanguage, useLang } from '../../../i18n/Metronici18n';
import { logout } from '../../../../app/redux/features/auth/authActions';

const HeaderToolbar = () => {
  const { classes } = useLayout();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formatMessage } = useIntl();
  // const currentLang = localStorage.getItem('i18nLanguage') || 'en'
  const currentLang = useLang()

  const handleLogout = () => {
    // localStorage.removeItem('token'); 
    // window.location.href = '/';
    dispatch(logout())
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  }

  const handleNotifications = () => {
    navigate('/notifications');
  };

  useEffect(() => {
    const slider: target = document.querySelector('#kt_toolbar_slider') as target
    const rangeSliderValueElement: Element | null = document.querySelector(
      '#kt_toolbar_slider_value'
    )

    if (!slider) {
      return
    }

    slider.innerHTML = ''

    noUiSlider.create(slider, {
      start: [5],
      connect: [true, false],
      step: 1,
      range: {
        min: [1],
        max: [10],
      },
    })

    slider.noUiSlider?.on('update', function (values: any, handle: any) {
      if (!rangeSliderValueElement) {
        return
      }

      rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1)
    })
  }, [])

  return (
    <div className='toolbar d-flex justify-content-end pe-4'>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* <button
          onClick={handleNotifications}
          className='notification'
          style={{ position: 'relative', background: 'none', border: 'none', padding: 0 }}
        >
          <i className="bi bi-bell-fill" style={{
            fontSize: 20,
            color: '#fff'
          }}></i>
        </button> */}
      </div>

      <select
        value={currentLang}
        onChange={(e) => setLanguage(e.target.value)}
        className='form-select ms-3'
        style={{ width: 120 }}
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="pl">Polski</option>
      </select>

      <Dropdown className='profileToggle'>
        <Dropdown.Toggle className='d-flex gap-2 align-items-center' id="dropdown-basic">
        <h4>{formatMessage({ id: 'ADMIN' })}</h4>

        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleChangePassword}>
            <i className="bi bi-box-arrow-right text-black" style={{ marginRight: '8px' }}></i>{formatMessage({ id: 'CHANGE_PASSWORD' })}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <i className="bi bi-box-arrow-right text-black" style={{ marginRight: '8px' }}></i>{formatMessage({ id: 'LOGOUT' })}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export { HeaderToolbar }
