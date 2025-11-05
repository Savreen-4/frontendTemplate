import {useAuth} from '../../../../app/modules/auth'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, Search} from '../../../partials'

/* eslint-disable jsx-a11y/anchor-is-valid */
const AsideToolbar = () => {
  const {currentUser} = useAuth()

  return (
    <>
      {/*begin::User*/}
      <div className='aside-user d-flex align-items-sm-center justify-content-center'>
        {/*begin::Symbol*/}
     
        {/*end::Symbol*/}

        {/*begin::Wrapper*/}
       
        {/*end::Wrapper*/}
      </div>
      {/*end::User*/}

      {/*begin::Aside search*/}
    
      {/*end::Aside search*/}
    </>
  )
}

export {AsideToolbar}
