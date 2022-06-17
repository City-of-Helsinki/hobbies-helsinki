import { Footer, Link } from "hds-react";
import { useTranslation } from "next-i18next";
import React, { FunctionComponent } from "react";

import { resetFocusId } from "../../common-events/components/resetFocus/ResetFocus";
import styles from "./footer.module.scss";
import FooterCategories from "./FooterCategories";
// import FooterCategories from "./FooterCategories";

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation("footer");
  const { t: tCommon } = useTranslation("common");

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  return (
    <Footer title={tCommon<string>("appName")} className={styles.footer}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t<string>("searchHobbies")}
          href={"/search"}
        />
      </Footer.Navigation>
      <FooterCategories />
      <Footer.Utilities
        backToTopLabel={t<string>("backToTop")}
        onBackToTopClick={handleBackToTop}
      >
        <Footer.Item
          as={"a"}
          href={t<string>("linkFeedbackUrl")}
          label={t<string>("linkFeedback")}
        />
      </Footer.Utilities>
      <Footer.Base
        copyrightHolder={t<string>("copyright")}
        copyrightText={t<string>("allRightsReserved")}
      >
        <Footer.Item as={Link} href={"/about"} label={t<string>("linkAbout")} />
        <Footer.Item
          as={Link}
          href={"/accessibility"}
          label={t<string>("linkAccessibility")}
        />
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;
