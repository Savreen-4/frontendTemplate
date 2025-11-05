
import { useIntl } from 'react-intl';
import { AsideMenuItem } from './AsideMenuItem'
export function AsideMenuMain() {
  const { formatMessage } = useIntl();
  return (
    <>
      <AsideMenuItem to='/dashboard' title={formatMessage({ id: 'Dashboard' })} hasBullet={true} />
      <AsideMenuItem to='/drivers' title={formatMessage({ id: 'Drivers' })} hasBullet={true} />
      <AsideMenuItem to='/companies' title={formatMessage({ id: 'Companies' })} hasBullet={true} />
      <AsideMenuItem to='/vehicleTypes' title={formatMessage({ id: 'Vehicle_Types' })} hasBullet={true} />
      <AsideMenuItem to='/cms' title={formatMessage({ id: 'contentManagement' })} hasBullet={true} />
      <AsideMenuItem to='/contactus' title='Contact Us' hasBullet={true} />
    </>
  )
}

