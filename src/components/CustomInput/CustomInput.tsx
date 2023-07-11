import { useField } from 'formik';
import './CustomInput.css'

// interface CustomInputProps extends FieldHookConfig<string> {
//   label: string;
//   additionalProps?: object;
// }

const CustomInput = ({ label, additionalProps, ...props }: any) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <label>{label}</label>
      <input {...field} {...props} {...additionalProps} 
      className={meta.touched && meta.error? "input-error":""}/>
    </>
  );
};

export default CustomInput;
