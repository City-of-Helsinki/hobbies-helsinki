import classNames from "classnames";
import { LoadingSpinner } from "hds-react";
import React, { FunctionComponent } from "react";

import styles from "./loadingSpinner.module.scss";

interface Props {
  hasPadding?: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingSpinnerri: FunctionComponent<Props> = ({
  hasPadding = true,
  isLoading,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div
          className={classNames(styles.spinnerWrapper, {
            [styles.hasPadding]: hasPadding,
          })}
          data-testid="loading-spinner"
        >
          <div className={styles.spinner}>
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinnerri;
