import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Field, FormikProvider, useFormik } from 'formik'
import { EMAIL_REQUIRED_FIELD_MESSAGE, INVALID_EMAIL_MESSAGE, PASSWORD_LENGTH_MESSAGE, PASSWORD_REQUIRED_FIELD_MESSAGE } from '../../../utlis/messages'
import FieldInputText from '../../common/FieldInputText'
import SubmitButton from '../../common/SubmitButton'
import { login } from '../../../redux/features/auth/authActions'
import { useDispatch, useSelector } from 'react-redux'


const validationSchema = Yup.object({
  email: Yup.string()
    .email(INVALID_EMAIL_MESSAGE)
    .required(EMAIL_REQUIRED_FIELD_MESSAGE),
  password: Yup.string()
    .min(6, PASSWORD_LENGTH_MESSAGE)
    .required(PASSWORD_REQUIRED_FIELD_MESSAGE),
});

const initialValues = {
  email: '',
  password: '',
}



export function Login() {
  const dispatch:any = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state:any) =>state.auth)
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
    dispatch(login({values,navigate}))
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        <div className='text-center mb-11'>
          <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
          <div className='text-gray-500 fw-semibold fs-6'>Sign in to manage your content</div>
        </div>

        <div className='fv-row mb-8'>
          <Field
            name="email"
            validate={validationSchema}
            label="Email"
            type="email"
            required={true}
            component={FieldInputText}
            placeholder="Email"
          />
        </div>

        <div className='fv-row mb-3'>
          <Field
            name="password"
            validate={validationSchema}
            label="Password"
            type="password"
            required={true}
            component={FieldInputText}
            placeholder="Password"
          />
        </div>
        <div className='d-grid mb-10'>
          <SubmitButton
            className="theme-color"
            title="Submit"
            type="submit"
            loading={authState.loading}
            style={{
              background: '#185fdb',
              border: 'none',
              color: 'white',
              fontWeight: '600',
              padding: '10px',
              width: '100%',
            }}
          />
        </div>
      </form>
    </FormikProvider>
  )
}
