import { FC } from 'react'
import { useLang } from './Metronici18n'
import { IntlProvider } from 'react-intl'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/de'
import '@formatjs/intl-relativetimeformat/locale-data/es'
import '@formatjs/intl-relativetimeformat/locale-data/fr'
import '@formatjs/intl-relativetimeformat/locale-data/ja'
import '@formatjs/intl-relativetimeformat/locale-data/zh'
import deMessages from './messages/de.json'
import enMessages from './messages/en.json'
import frMessages from './messages/fr.json'
import plMessages from './messages/pl.json'
import { WithChildren } from '../helpers'

const allMessages = {
  de: deMessages,
  en: enMessages,
  fr: frMessages,
  pl: plMessages
}

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export { I18nProvider }
