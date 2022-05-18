import React from "react";

export interface InputProps {
  name?: string;
  value?: any;
  defaultValue?: any;
  type?: "text" | "search" | "email" | "number" | "textarea" | "password";
  placeholder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  showCounter?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  rows?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?(value: any): void;
  onDebounceChange?(value: any): void;
  onBlur?(value: any): void;
  onClick?(e: any): void;
  onKeyUp?(e: any): void;
  onKeyDown?(e: any): void;
  label?: string;
}

export const Input = ({
  name,
  value,
  defaultValue,
  placeholder,
  type = "text",
  prefix,
  suffix,
  className = "",
  inputClassName = "",
  fullWidth,
  isRequired,
  disabled = false,
  bordered = false,
  readOnly = false,
  min = -9999999999,
  max = 9999999999,
  maxLength,
  showCounter,
  rows,
  error,
  errorMessage,
  autoFocus,
  onChange,
  onDebounceChange,
  onBlur,
  onClick,
  onKeyUp,
  onKeyDown,
  label,
}: InputProps) => {
  return (
    <div className={`form-control ${type !== "textarea" && "h-20"}`}>
      {label && (
        <label className={`label label-text ${error && "text-error"}`}>
          {label}
        </label>
      )}
      <label className={`${prefix ? "input-group-plain" : ""} ${className}`}>
        {prefix && (
          <span className={`${disabled ? "!text-base-secondary" : ""}`}>
            {prefix}
          </span>
        )}
        {type !== "textarea" ? (
          <input
            className={`input max-w-full ${inputClassName && inputClassName} ${
              bordered && "input-bordered"
            } ${error && "input-error"} ${fullWidth && "w-full"}`}
            name={name}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            autoFocus={autoFocus}
            min={min}
            max={max}
          />
        ) : (
          <textarea
            className={`textarea max-w-full ${!prefix ? "px-2" : "pr-2 pl-1"} ${
              bordered && "textarea-bordered"
            } ${error && "textarea-error"} ${fullWidth && "w-full"}`}
            name={name}
            value={value}
            rows={rows}
            placeholder={placeholder}
            required={isRequired}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            disabled={disabled}
            readOnly={readOnly}
          />
        )}
        {suffix && <span>{suffix}</span>}
      </label>
      {showCounter && maxLength && (
        <div
          className={`row-flex justify-end text-xs ${
            ((value && value.length) || 0) >= maxLength
              ? "text-error"
              : "text-disabled-100"
          }`}
        >
          {(value && value.length) || 0}/{maxLength}
        </div>
      )}
      {error && errorMessage ? (
        <div className="text-sm font-normal pt-1 text-error">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};
