import React from "react";
import ComingSoon from "../../components/ComingSoon";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function AITools() {
  return (
    <div className={styles.toolPage}>
      <h1>AI Tools</h1>
      <ComingSoon />
    </div>
  );
}
