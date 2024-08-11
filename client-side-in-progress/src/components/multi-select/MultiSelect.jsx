import React from "react";
import styles from "./multiselect.module.css";
import { useState } from "react";
import { useEffect } from "react";

function MultiSelect({ values, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState();

  useEffect(() => {
    if (isOpen) setHighlightedIndex(null);
  }, [isOpen]);

  function clearOptions() {
    onChange([]);
  }

  function selectOption(option) {
    if (values.includes(option)) {
      onChange(values.filter((op) => op !== option));
    } else {
      onChange([...values, option]);
    }
  }

  function isOptionSelected(option) {
    return values.includes(option);
  }

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>
        {values.length ? (
          values.map((v) => (
            <button
              key={v.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(v);
              }}
              className={styles.optionBadge}
            >
              {v.label}
              <span className={styles.clearBtn}>&times;</span>
            </button>
          ))
        ) : (
          <span className={styles.placeHolder}>Select Categories...</span>
        )}
      </span>
      <button
        className={styles.clearBtn}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          clearOptions();
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.open}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultiSelect;
