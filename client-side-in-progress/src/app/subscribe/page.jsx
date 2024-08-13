"use client";

import React from "react";
import styles from "./subscribe.module.css";
import categories from "./categories";
import MultiSelect from "@/components/multi-select/MultiSelect";
import { useState } from "react";
import addNewUser from "./fetchFromServer";

function Subscribe() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //noaj1997@gmai.com

  async function handleSubscribe() {
    // console.log(email, selectedCategories);
    // e.preventDefault();
    const [isOk, message] = await addNewUser(email, selectedCategories);
    if (isOk) {
      setSuccessMessage(message);
      setErrorMessage("");
    } else {
      setSuccessMessage("");
      setErrorMessage(message);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <input
            type="email"
            required
            placeholder="Email"
            className={styles.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <MultiSelect
          values={selectedCategories}
          options={categories}
          onChange={(newCategories) => setSelectedCategories(newCategories)}
        />
        <div>
          <button
            type="button"
            className={styles.subscribeBtn}
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
        <div
          className={`${styles.message} ${styles.errorMessage} ${
            errorMessage ? styles.show : styles.hidden
          }`}
        >
          <span>&times;</span>
          {errorMessage}
        </div>
        <div
          className={`${styles.message} ${styles.successMessage} ${
            successMessage ? styles.show : styles.hidden
          }`}
        >
          <span>&#x2713;</span>
          {successMessage}
        </div>
      </form>
    </div>
  );
}

export default Subscribe;
