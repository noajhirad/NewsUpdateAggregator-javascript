"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Send Me an Email",
      path: "/send",
    },
    {
      title: "Subscribe",
      path: "/subscribe",
    },
    {
      title: "Update Preferences",
      path: "/update",
    },
    {
      title: "Unsubscribe",
      path: "/unsubscribe",
    },
  ];

  const pathName = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo.png"
          alt="logo"
          priority={true}
          width={180}
          height={100}
          className={styles.logo}
        />
      </div>
      <div className={styles.links}>
        {links.map((link) => (
          <Link
            href={link.path}
            key={link.title}
            className={`${styles.link} ${
              pathName === link.path && styles.active
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
