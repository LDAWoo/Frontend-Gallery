import * as locales from "date-fns/locale";
import i18next from "i18next";
import { nameMapper } from "./NameMapper";

export const getLocale = () => {
  const currentLocal = i18next.language;
  const languageCode = currentLocal?.split("-")[0];
  const localeKey = languageCode?.toLowerCase();
  const locale = locales[nameMapper[localeKey]];
  return locale;
};
