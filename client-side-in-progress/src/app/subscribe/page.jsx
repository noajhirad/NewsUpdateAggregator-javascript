"use client";

import React from "react";
import styles from "./subscribe.module.css";
import categories from "./categories";
import MultiSelect from "@/components/multi-select/MultiSelect";
import { useState } from "react";

function Subscribe() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <input
            type="email"
            required
            placeholder="Email"
            className={styles.email}
          />
        </div>
        <MultiSelect
          values={selectedCategories}
          options={categories}
          onChange={(newCategories) => setSelectedCategories(newCategories)}
        />
        <div>
          <button className={styles.subscribeBtn}>Subscribe</button>
        </div>
      </form>
    </div>
  );
}

export default Subscribe;
