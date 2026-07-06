import { useState } from "react";

type Props<T extends { id: number; name: string }> = {

    placeholder: string;

    options: T[];

    value?: T;

    onChange: (value: T) => void;

    disabled?: boolean;

    disabledPlaceholder?: string;

};

export default function SearchableSelect<
    T extends { id: number; name: string }
>({
    placeholder,
    options,
    value,
    onChange,
    disabled = false,
    disabledPlaceholder,
}: Props<T>) {

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState("");

    const filtered = options.filter(option =>
        option.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function handleSelect(option: T) {

        onChange(option);

        setSearch("");

        setOpen(false);

    }

    return (

        <div className={`search-select ${disabled ? "disabled" : ""}`}>

            <input
                disabled={disabled}
                className={disabled ? "disabled-input" : ""}
                placeholder={
                    disabled
                        ? disabledPlaceholder ?? "Unavailable..."
                        : placeholder
                }
                value={
                    open
                        ? search
                        : value?.name ?? ""
                }
                onFocus={() => {

                    if (disabled) return;

                    setOpen(true);

                    setSearch("");

                }}
                onChange={(e) => {

                    setSearch(e.target.value);

                }}
                onBlur={() => {

                    setTimeout(() => {

                        setOpen(false);

                    }, 150);

                }}
            />

            {open && (

                <div className="dropdown">

                    {filtered.length > 0 ? (

                        filtered.map(option => (

                            <div
                                key={option.id}
                                className="dropdown-item"
                                onMouseDown={() => handleSelect(option)}
                            >

                                {option.name}

                            </div>

                        ))

                    ) : (

                        <div className="dropdown-empty">

                            No results found

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}