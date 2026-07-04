import React from 'react'

function FormField({ label, type, placeholder, error, ...props }) {
  return (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            {...props}
            className="w-full rounded-lg border bg-white px-3 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 border-gray-300"
        />
        {error && (
        <p className="mt-1 text-xs text-red-500 text-right">
            {error}
        </p>
        )}
    </div>
  )
}

export default FormField