import { getIn } from "formik";
import Select from 'react-select';

const FieldReactSelectInput = ({ field, form, onChange, ...props }: any) => {
    const error = getIn(form.errors, field.name);
    const touch = getIn(form.touched, field.name);

    const handleChange = (selectedOption: any) => {
        if (Array.isArray(selectedOption)) {
            form.setFieldValue(
                field.name,
                selectedOption ? selectedOption.map((el) => el.value) : []
            );
        } else {
            form.setFieldValue(field.name, selectedOption ? selectedOption.value : '');
        }
        if (onChange) {
            onChange(selectedOption);
        }
    };

    const handleBlur = () => {
        form.setFieldTouched(field.name, true);
    };

    return (
        <div>
            <label className="form-label" htmlFor={field.name}>{props.label}<span>{props?.notRequired ? '' : '*'}</span></label>
            <Select
                {...props}
                id={field.name}
                name={field.name}
                value={
                    props.isMulti
                        ? props.options.filter((option: any) => field.value.includes(option.value)) // Multi-select case
                        : props.options.find((option: any) => option.value === field.value) || '' // Single-select case
                }
                onChange={handleChange}
                onBlur={handleBlur}
                classNamePrefix="select"
                isClearable={props.isClearable}
                isSearchable={props.isSearchable}
                isLoading={props.isLoading}
                isDisabled={props.isDisabled}
                isMulti={props.isMulti}
                defaultInputValue={props.defaultInputValue}
                readOnly={props.readOnly}
                defaultValue={props.defaultValue}
                className={`${touch && error && 'react-select-error'}`}
            />

            {touch && error ? <span style={{ color: '#ff8080', 'marginTop': '5px', 'fontSize': '13px' }} className="error">{error}</span> : null}
        </div>
    );
};

export { FieldReactSelectInput }