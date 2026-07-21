import { useState, useRef, useEffect } from "react"

type Props<T extends { id: number | string; name: string }> = {
  placeholder: string

  options: T[]

  value?: T

  onChange: (value: T) => void

  disabled?: boolean

  disabledPlaceholder?: string
}

export default function SearchableSelect<
  T extends { id: number | string; name: string },
>({
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  disabledPlaceholder,
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const listRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dropup, setDropup] = useState(false)

  const filtered = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (open && highlightedIndex >= 0 && listRef.current) {
      const container = listRef.current
      const highlightedItem = container.children[
        highlightedIndex
      ] as HTMLElement
      if (highlightedItem) {
        const containerTop = container.scrollTop
        const containerBottom = containerTop + container.clientHeight
        const itemTop = highlightedItem.offsetTop
        const itemBottom = itemTop + highlightedItem.clientHeight

        if (itemTop < containerTop) {
          container.scrollTop = itemTop
        } else if (itemBottom > containerBottom) {
          container.scrollTop = itemBottom - container.clientHeight
        }
      }
    }
  }, [highlightedIndex, open])

  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      if (window.innerHeight - rect.bottom < 300) {
        setDropup(true)
      } else {
        setDropup(false)
      }
    }
  }, [open])

  function handleSelect(option: T) {
    onChange(option)
    setSearch("")
    setOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        if (!disabled) setOpen(true)
      }
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
        handleSelect(filtered[highlightedIndex])
      }
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div
      className={`search-select ${disabled ? "disabled" : ""}`}
      ref={containerRef}
    >
      <input
        disabled={disabled}
        className={disabled ? "disabled-input" : ""}
        placeholder={
          disabled ? (disabledPlaceholder ?? "Unavailable...") : placeholder
        }
        value={open ? search : (value?.name ?? "")}
        onFocus={() => {
          if (disabled) return
          setOpen(true)
          setSearch("")
          setHighlightedIndex(-1)
        }}
        onChange={(e) => {
          setSearch(e.target.value)
          setHighlightedIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false)
            setHighlightedIndex(-1)
          }, 150)
        }}
      />

      {open && (
        <div className={`dropdown ${dropup ? "dropup" : ""}`} ref={listRef}>
          {filtered.length > 0 ? (
            filtered.map((option, index) => (
              <div
                key={option.id}
                className={`dropdown-item ${index === highlightedIndex ? "highlighted" : ""}`}
                onMouseDown={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="dropdown-empty">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
