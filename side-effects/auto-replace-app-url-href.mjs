import { DEVELOPMENT_APP_URL, PRODUCTION_APP_URL } from "../config/analysis-app.mjs";
import { IS_PRODUCTION } from "../config/app.mjs";

(function () {
    if (IS_PRODUCTION) return;

    const elements = document.querySelectorAll(`[href="${PRODUCTION_APP_URL}"]`)

    elements.forEach((element) => {
        element.setAttribute('href', DEVELOPMENT_APP_URL)
    })

    console.debug(`Success replace href of ${elements.length} element(s)`)
})()
