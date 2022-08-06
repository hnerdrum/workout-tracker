import React from "react";

type InputProps = {
    label: string;
    errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

export const WorkoutInput = React.forwardRef(({ label, errorMessage, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            {label}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              ref={ref}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              {...rest}
            />
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errorMessage}
          </p>
          </div>
        </div>
    )
})
