import React from "react";

type SelectProps = {
    label: string;
    options: Option[];
    errorMessage?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>

type Option = {
    label: string;
    value: string;
}

export const SimpleSelect = React.forwardRef(({ label, options, errorMessage, ...rest }: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            {label}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              ref={ref}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              {...rest}
            >
              {options.map(({ label, value }, i) => (
                <option key={i} label={label}>{value}</option>
              ))}
            </select>
            <p className="mt-2 text-sm text-red-600">
                {errorMessage}
            </p>
          </div>
        </div>
    )
})