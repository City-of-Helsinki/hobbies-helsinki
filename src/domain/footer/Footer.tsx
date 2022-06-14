import { Footer, Link } from "hds-react";
import { useTranslation } from "next-i18next";
import React, { FunctionComponent } from "react";

import { resetFocusId } from "../../common-events/components/resetFocus/ResetFocus";
import styles from "./footer.module.scss";
import FooterCategories from "./FooterCategories";
// import FooterCategories from "./FooterCategories";

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation();

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  return (
    <Footer title={t("appName")} className={styles.footer}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t("footer.searchHobbies")}
          href={"/search"}
        />
      </Footer.Navigation>
      <FooterCategories />
      <Footer.Utilities
        backToTopLabel={t("footer.backToTop")}
        onBackToTopClick={handleBackToTop}
      >
        <Footer.Item
          as={"a"}
          href={t("footer.linkFeedbackUrl")}
          label={t("footer.linkFeedback")}
        />
      </Footer.Utilities>
      <Footer.Base
        copyrightHolder={t("footer.copyright")}
        copyrightText={t("footer.allRightsReserved")}
      >
        <Footer.Item as={Link} href={"/about"} label={t("footer.linkAbout")} />
        <Footer.Item
          as={Link}
          href={"/accessibility"}
          label={t("footer.linkAccessibility")}
        />
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;
