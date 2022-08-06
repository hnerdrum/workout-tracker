import React from "react";


type TextAreaProps = {
    label: string;
    errorMessage?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const SimpleTextArea = React.forwardRef(({ label, errorMessage, ...rest }: TextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            {label}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              ref={ref}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              {...rest}
            />
          </div>
          <p className="mt-2 text-sm text-red-600">
            {errorMessage}
          </p>
        </div>
    )
})