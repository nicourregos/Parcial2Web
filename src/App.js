import React from "react";
import "./App.css";
import Space from "./components/Space";
import { IntlProvider, FormattedMessage } from "react-intl";
import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";

function App() {
  return (
    <div className="container">
      <IntlProvider
        locale={navigator.language.substring(0, 2)}
        messages={
          navigator.language.substring(0, 2) === "es"
            ? localeEsMessages
            : localeEnMessages
        }
      >
        <div className="Title">
          <h1>
            <FormattedMessage id="TitleSpaces" />
          </h1>
        </div>
        <Space />
      </IntlProvider>
    </div>
  );
}

export default App;
