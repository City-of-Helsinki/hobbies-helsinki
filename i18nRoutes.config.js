const i18nRoutes = {
  "/search": [
    { source: "/haku", locale: "fi" },
    { source: "/sok", locale: "sv" },
  ],
  "/courses/:id": [
    { source: "/kurssit/:id", locale: "fi" },
    { source: "/kurser/:id", locale: "sv" },
  ],
  "/accessibility": [
    { source: "/saavutettavuusseloste", locale: "fi" },
    { source: "/tillgänglighetsutlåtande", locale: "sv" },
  ],
  "/about": [
    { source: "/tietoa", locale: "fi" },
    { source: "/kunskap", locale: "sv" },
  ],
};

module.exports = i18nRoutes;
