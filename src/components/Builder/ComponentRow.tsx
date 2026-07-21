import SearchableSelect from "./SearchableSelect"

type Props<T extends { id: number; name: string }> = {
  label: string

  placeholder: string

  options: T[]

  value?: T

  onChange: (value: T) => void

  helperText?: string

  disabled?: boolean

  disabledPlaceholder?: string
}

export default function ComponentRow<T extends { id: number; name: string }>({
  label,
  placeholder,
  options,
  value,
  onChange,
  helperText,
  disabled = false,
  disabledPlaceholder,
}: Props<T>) {
  return (
    <div className="component-row">
      <label>{label}</label>

      {helperText && <small className="component-text">{helperText}</small>}

      <SearchableSelect
        placeholder={placeholder}

        disabledPlaceholder={disabledPlaceholder}

        options={options}

        value={value}

        onChange={onChange}

        disabled={disabled}
      />
    </div>
  )
}
