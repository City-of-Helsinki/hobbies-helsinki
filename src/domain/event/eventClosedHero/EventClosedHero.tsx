import { Button } from "hds-react";
import { useTranslation } from "next-i18next";
import React from "react";

import useLocale from "../../../common-events/hooks/useLocale";
import useRouter from "../../../common-events/i18n/router/useRouter";
import { getI18nPath } from "../../../common-events/i18n/router/utils";
import styles from "./eventClosedHero.module.scss";

const EventClosedHero: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useLocale();

  const moveToHomePage = () => {
    router.push(getI18nPath("/", locale));
  };

  return (
    <div className={styles.eventClosedHero}>
      <h1>{t("event.hero.titleEventClosed")}</h1>
      <p>{t("event.hero.textEventClosed")}</p>
      <Button onClick={moveToHomePage} variant="success">
        {t("event.hero.buttonToHomePage")}
      </Button>
    </div>
  );
};

export default EventClosedHero;
