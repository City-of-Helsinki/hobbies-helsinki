import classNames from "classnames";
import { Koros } from "hds-react";
import React from "react";

import Icon404 from "../../assets/icons/Icon404";
import Container from "../../common-events/components/layout/Container";
import isTestEnv from "../../common/utils/isTestEnv";
import styles from "./errorHero.module.scss";

interface Props {
  children: React.ReactNode;
  smallMargin?: boolean;
  text: string;
  title: string;
}

const NotFound: React.FC<Props> = ({
  children,
  smallMargin = false,
  text,
  title,
}) => {
  return (
    <>
      <div className={styles.errorHero}>
        <Container>
          <Icon404 className={styles.icon} />
          <h1>{title}</h1>
          <p>{text}</p>
          <div className={styles.linkWrapper}>{children}</div>
        </Container>
      </div>

      {!isTestEnv && (
        /* istanbul ignore next */
        <Koros
          className={classNames(styles.koros, {
            [styles.smallMargin]: smallMargin,
          })}
          flipHorizontal={true}
          type="basic"
        />
      )}
    </>
  );
};

export default NotFound;
