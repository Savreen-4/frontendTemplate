import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import BackButton from '../../modules/common/BackButton';
import { addVehicleType, updateVehicleType } from '../../redux/features/vehicleTypes/vehicleTypesAction';
import { useIntl } from 'react-intl';
import { FaUpload } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { IMAGE_BASE_URL } from '../../../_metronic/helpers';

const VehicleTypeForm = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { vehicleDetail } = useSelector((state: any) => state.vehicleTypesSlice);
    const { formatMessage } = useIntl();
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const formInitialValues = {
        name: vehicleDetail?.name || "",
        description: vehicleDetail?.description || "",
        photos: vehicleDetail?.photos || [],
    };

    const formValidation = (id?: string, vehicleDetail?: any) =>
        Yup.object().shape({
          name: Yup.string()
            .required(formatMessage({ id: 'NameRequired' }))
            .min(2, formatMessage({ id: 'name_2_Char' }))
            .max(15, formatMessage({ id: 'name_15_Char' })),
          description: Yup.string()
            .min(10, formatMessage({ id: 'description_10_Char' }))
            .max(200, formatMessage({ id: 'description_200_Char' })),
          photos: Yup.array()
            .nullable()
            .test(
              'required',
              formatMessage({ id: 'PhotosRequired' }),
              (value) => {
                if (id && vehicleDetail?.icon) {
                  return true; // Edit mode — skip if already has image
                }
                return !!(value && value.length > 0);
              }
            )
            .test(
              'fileSize',
              formatMessage({ id: 'FileSizeLimit' }),
              (value) => {
                if (id && vehicleDetail?.icon && (!value || value.length === 0)) {
                  return true;
                }
                if (value && value.length > 0) {
                  return value.every((file: File) => file.size <= 5 * 1024 * 1024);
                }
                return true;
              }
            )
            .test(
              'fileFormat',
              formatMessage({ id: 'FileFormatError' }),
              (value) => {
                if (id && vehicleDetail?.icon && (!value || value.length === 0)) {
                  return true;
                }
                if (value && value.length > 0) {
                  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                  return value.every((file: File) => allowedTypes.includes(file.type));
                }
                return true;
              }
            ),
        });

    const formik: any = useFormik({
        initialValues: formInitialValues,
        enableReinitialize: true,
        validationSchema: formValidation(id, vehicleDetail),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values: any) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);

            if (values.photos && values.photos.length > 0) {
                values.photos.forEach((file: File | string) => {
                  if (file instanceof File) {
                    formData.append("photos", file); // new upload
                  }
                });
              }
            
              // Add existing photo URLs separately
            //   if (vehicleDetail?.photos && vehicleDetail.photos.length > 0) {
            //     vehicleDetail.photos.forEach((photo: string) => {
            //       if (typeof photo === "string") {
            //         formData.append("existingPhotos", photo);
            //       }
            //     });
            //   }
              
            // if (values.photos && values.photos.length > 0) {
            //     values.photos.forEach((file: File) => {
            //         formData.append("photos", file);
            //     });
            // } else if (vehicleDetail && vehicleDetail.photos) {
            //     // If no new photos, keep the existing ones
            //     vehicleDetail.photos.forEach((photo: string) => {
            //         formData.append("photos", photo); // Handle existing photos if available
            //     });
            // }

            const data: any = {
                values: formData,
                navigate,
            };
            if (id) data.id = id;
            id ? dispatch(updateVehicleType(data)) : dispatch(addVehicleType(data));
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileList = Array.from(files);
            formik.setFieldValue("photos", fileList);
            setFileName(fileList[0].name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setPreviewImg(base64Image);
            };
            reader.readAsDataURL(fileList[0]);
        }
    };

    useEffect(() => {
        if (vehicleDetail && vehicleDetail.icon) {
            const iconUrl = IMAGE_BASE_URL + vehicleDetail.icon;
            setPreviewImg(iconUrl);
            const fileName = vehicleDetail.icon.split('/').pop();
            setFileName(fileName || 'No file chosen');
        }
    }, [vehicleDetail]);

    return (
        <div className="container py-5">
            <BackButton className="mb-4" label={formatMessage({ id: 'Back' })} />
            <div className="card shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: 600 }}>
                <h3 className="text-center">{formatMessage({ id: 'Vehicle_Types' })}</h3>

                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">{formatMessage({ id: 'VehicleTypeName' })}<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                className="form-control"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-danger small mt-1">{formik.errors.name}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photos" className="form-label fw-semibold">{formatMessage({ id: 'UploadFile' })}<span className="text-danger">*</span></label>
                            <div className="d-flex align-items-center gap-3">
                                {previewImg && (
                                    <img
                                        src={previewImg}
                                        alt="Preview"
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid #eee',
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <input
                                        id="hiddenFileInput"
                                        name="photos"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                    />
                                    <input
                                        type="text"
                                        readOnly
                                        value={fileName || 'No file chosen'}
                                        className="form-control"
                                        onClick={() => fileInputRef.current?.click()}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                            {formik.touched.photos && formik.errors.photos && (
                                <div className="text-danger small mt-1">{formik.errors.photos}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-semibold">{formatMessage({ id: 'VehicleTypeDescription' })}</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows={3}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <div className="text-danger small mt-1">{formik.errors.description}</div>
                            )}
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                className="theme-color py-3 px-4 rounded fw-bold"
                                style={{ width: '450px' }}
                                onClick={async () => {
                                    formik.setTouched({
                                        name: true,
                                        description: true,
                                        photos: true,
                                    });

                                    const isValid = await formik.validateForm();

                                    if (Object.keys(isValid).length === 0) {
                                        formik.handleSubmit(); // proceed to submit
                                    }
                                }}
                            >
                                {formik.isSubmitting
                                    ? formatMessage({ id: id ? 'Saving' : 'Saving' })
                                    : formatMessage({ id: id ? 'Update' : 'Save' })}
                            </button>


                            {/* <button
                                type="submit"
                                className="theme-color py-3 w-100 rounded"
                                disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                            >
                                {formik.isSubmitting
                                    ? formatMessage({ id: id ? 'Saving' : 'Saving' })
                                    : formatMessage({ id: id ? 'Update' : 'Save' })}
                            </button> */}
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export { VehicleTypeForm };
