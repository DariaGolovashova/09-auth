import css from "./SearchBox.module.css";
import type { ChangeEvent } from "react";

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}

export default SearchBox;
