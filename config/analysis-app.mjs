import { IS_PRODUCTION } from "./app.mjs"

export const DEVELOPMENT_APP_HOSTNAME = 'app.dev.safinalab.id'
export const PRODUCTION_APP_HOSTNAME = 'app.safinalab.id'
export const CURRENT_APP_HOSTNAME = IS_PRODUCTION
    ? PRODUCTION_APP_HOSTNAME
    : DEVELOPMENT_APP_HOSTNAME

export const DEVELOPMENT_APP_URL = `https://${DEVELOPMENT_APP_HOSTNAME}/`
export const PRODUCTION_APP_URL = `https://${PRODUCTION_APP_HOSTNAME}/`
export const CURRENT_APP_URL = `https://${CURRENT_APP_HOSTNAME}/`
