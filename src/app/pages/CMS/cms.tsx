import React, { useEffect, useState } from 'react';
import { FormikProvider, Form, useFormik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { errorMessage } from '../../utlis/common';
import { addPolocies, FetchPolicyData } from '../../redux/policies/policiesAction';
import { useIntl } from 'react-intl';

const tabList = [
  { key: 'about', labelId: 'aboutUs' },
  { key: 'privacy', labelId: 'privacyPolicy' },
  { key: 'terms', labelId: 'termsConditions' },
];

const languages = [
  { key: 'en', labelId: 'english' },
  { key: 'fr', labelId: 'french' },
  { key: 'de', labelId: 'german' },
  { key: 'pl', labelId: 'polish' },
];

// Quill toolbar config
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
};

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'align', 'list', 'bullet', 'color', 'background',
  'link', 'image', 'code-block',
];

// Helper to strip HTML tags
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

// Custom Field component for ReactQuill
const FieldQuillEditor = ({ field, form, label, placeholder }: any) => {
  const { name, value } = field;
  const { setFieldValue, setFieldTouched, touched, errors } = form;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <ReactQuill
        id={name}
        theme="snow"
        modules={quillModules}
        formats={quillFormats}
        value={value || ''}
        onChange={(content) => setFieldValue(name, content)}
        onBlur={() => setFieldTouched(name, true)}
        placeholder={placeholder}
        style={{ height: '200px' }}
      />
      {touched[name] && errors[name] && (
        <div className="text-danger mt-2" style={{ fontSize: '0.875rem' }}>
          {errors[name]}
        </div>
      )}
    </div>
  );
};

const CMSPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const { policyData } = useSelector(
    (state: any) => state?.policyDataSlice || { policyData: {} }
  );

  const [activeTab, setActiveTab] = useState<string>('about');
  const [activeLang, setActiveLang] = useState<string>('en');

  const formInitialValues = {
    about: {
      en: policyData?.about?.en || '',
      fr: policyData?.about?.fr || '',
      de: policyData?.about?.de || '',
      pl: policyData?.about?.pl || '', // Polish added
    },
    privacy: {
      en: policyData?.privacy?.en || '',
      fr: policyData?.privacy?.fr || '',
      de: policyData?.privacy?.de || '',
      pl: policyData?.privacy?.pl || '', // Polish added
    },
    terms: {
      en: policyData?.terms?.en || '',
      fr: policyData?.terms?.fr || '',
      de: policyData?.terms?.de || '',
      pl: policyData?.terms?.pl || '', // Polish added
    },
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const missing = Object.entries(values).some(([section, langs]) =>
          Object.values(langs as Record<string, string>).some(content => !stripHtml(content))
        );

        if (missing) {
          errorMessage(formatMessage({ id: 'pleaseFillPoliciesInAllLanguages' }));
          return;
        }

        const data = { values, navigate };
        dispatch(addPolocies(data));
      } catch (error) {
        console.error("Submit error:", error);
      }
    }
  });

  const getButtonLabel = () => {
    if (formik.isSubmitting) return formatMessage({ id: 'saving' });
    return formatMessage({ id: 'save' });
  };

  useEffect(() => {
    dispatch(FetchPolicyData());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <div className="card shadow-sm rounded-4 p-4 pb-5 mx-auto" style={{ maxWidth: 900 }}>
        <h3 className="mb-4 text-center">{formatMessage({ id: 'contentManagement' })}</h3>

        {/* Main Tabs */}
        <ul className="nav nav-tabs mb-3">
          {tabList.map(tab => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {formatMessage({ id: tab.labelId })}
              </button>
            </li>
          ))}
        </ul>

        {/* Language Tabs */}
        <ul className="nav nav-pills mb-4">
          {languages.map(lang => (
            <li className="nav-item" key={lang.key}>
              <button
                className={`nav-link ${activeLang === lang.key ? 'active' : ''}`}
                onClick={() => setActiveLang(lang.key)}
                type="button"
              >
                {formatMessage({ id: lang.labelId })}
              </button>
            </li>
          ))}
        </ul>

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {/* Render all fields but only show the active tab/lang */}
            {tabList.map(tab =>
              languages.map(lang => {
                const isActive = activeTab === tab.key && activeLang === lang.key;
                return (
                  <div key={`${tab.key}-${lang.key}`} style={{ display: isActive ? 'block' : 'none' }}>
                    <Field
                      name={`${tab.key}.${lang.key}`}
                      component={FieldQuillEditor}
                      label={`${formatMessage({ id: tab.labelId })} (${formatMessage({ id: lang.labelId })})`}
                      placeholder={`${formatMessage({ id: 'enterTextInLang' }, { section: formatMessage({ id: tab.labelId }), lang: formatMessage({ id: lang.labelId }) })}`}
                    />
                  </div>
                );
              })
            )}

            <div style={{ position: 'relative', top: "15px", paddingTop: 10 }}>
              <button
                type="submit"
                className="theme-color py-3 w-100"
                disabled={formik.isSubmitting}
              >
                {getButtonLabel()}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export { CMSPage };
