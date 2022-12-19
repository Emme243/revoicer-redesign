import { HTMLAttributes, ReactNode } from 'react';

type ILabelProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function Label(props: ILabelProps) {
  const { children, ...htmlProps } = props;
  return (
    <div
      {...htmlProps}
      className={`text-gray-500 font-semibold uppercase text-sm tracking-widest dark:text-gray-300 ${htmlProps.className}`}
    >
      {children}
    </div>
  );
}

export default Label;
