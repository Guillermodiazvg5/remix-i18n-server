import { createCookie } from "@remix-run/node";
import { RemixI18Next } from "remix-i18next/server";
import { resolve } from "node:path";
import Backend from "i18next-fs-backend";

import * as i18n from 'app/config/i18n'

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  backend: Backend,
});