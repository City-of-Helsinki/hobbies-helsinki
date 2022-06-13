import classNames from "classnames";
import { IconAngleRight, IconLinkExternal } from "hds-react";
import { TFunction } from "next-i18next";
import React from "react";
import { LinkProps } from "react-scroll/modules/components/Link";

import RouterLink from "../../../domain/i18n/router/Link";
import SrOnly from "../srOnly/SrOnly";
import styles from "./link.module.scss";

interface Props extends Omit<LinkProps, "size"> {
  color?: "default" | "white";
  isExternal?: boolean;
  size?: "default" | "small";
  to: string;
  children?: React.ReactNode;
  className?: string;
  t: TFunction;
}

const ALink: React.FC<Props> = ({
  t,
  className,
  color = "default",
  children,
  isExternal = false,
  size = "default",
  to,
  ...rest
}) => {
  const commonProps = {
    className: classNames(
      styles.link,
      styles[`${color}Color`],
      styles[`${size}Size`],
      className
    ),
  };

  return isExternal ? (
    <a href={to} rel="noopener noreferrer" target="_blank" {...commonProps}>
      {children}
      <SrOnly>{t<string>("commons.srOnly.opensInANewTab")}</SrOnly>
      <IconLinkExternal aria-hidden />
    </a>
  ) : (
    <RouterLink href={to} {...commonProps} {...rest}>
      {children}
      <IconAngleRight aria-hidden />
    </RouterLink>
  );
};

export default ALink;
