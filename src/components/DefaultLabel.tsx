import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react';

type ILabelProps = {
  children: ReactNode;
} & DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

function DefaultLabel(props: ILabelProps) {
  const { children, ...htmlProps } = props;
  return (
    <label
      {...htmlProps}
      className={`text-gray-500 font-semibold uppercase text-sm tracking-widest dark:text-gray-300 ${htmlProps.className}`}
    >
      {children}
    </label>
  );
}

export default DefaultLabel;
