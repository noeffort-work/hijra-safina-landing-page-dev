import { IS_PRODUCTION } from './app.mjs'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
const searchParams = typeof window !== 'undefined'
  ? new URLSearchParams(window.location.search)
  : new URLSearchParams()

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '::1']
const LOCAL_HOST_SUFFIXES = ['.localhost', '.local', '.test']
const matchesLocalHostname = LOCAL_HOSTNAMES.includes(hostname)
  || LOCAL_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))

const toBoolean = (value) => {
  if (!value) return undefined
  const normalized = value.toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false
  return undefined
}

const toPort = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const emulatorToggle = toBoolean(searchParams.get('useFirebaseEmulators'))
const emulatorHostOverride = searchParams.get('firebaseEmulatorHost')
const authPortOverride = toPort(searchParams.get('firebaseAuthPort'), 9099)
const firestorePortOverride = toPort(searchParams.get('firebaseFirestorePort'), 8080)

const NORMALIZED_LOCALHOST = '127.0.0.1'
const defaultEmulatorHost = matchesLocalHostname ? hostname : NORMALIZED_LOCALHOST
const computedEmulatorHost = emulatorHostOverride || defaultEmulatorHost || NORMALIZED_LOCALHOST

const DEVELOPMENT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB_nqqLZOxCHy_PxMW0Z4k53Nc8u8VoonI',
  authDomain: 'hijra-safina-dev.firebaseapp.com',
  projectId: 'hijra-safina-dev',
  storageBucket: 'hijra-safina-dev.firebasestorage.app',
  messagingSenderId: '677734821284',
  appId: '1:677734821284:web:1ec317f91e289efcb7a531',
  measurementId: 'G-82PC945VMP',
}
const PRODUCTION_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDJeVc2YBZFGSkx7aYdXu1ynikc7jy8ka4',
  authDomain: 'hijra-safina-8ede9.firebaseapp.com',
  projectId: 'hijra-safina-8ede9',
  storageBucket: 'hijra-safina-8ede9.firebasestorage.app',
  messagingSenderId: '322342640987',
  appId: '1:322342640987:web:5b24f7447091e398718e7e',
  measurementId: 'G-57V0G61R84',
}

export const CURRENT_FIREBASE_CONFIG = IS_PRODUCTION
  ? PRODUCTION_FIREBASE_CONFIG
  : DEVELOPMENT_FIREBASE_CONFIG

export const USE_FIREBASE_EMULATORS = false

export const FIREBASE_EMULATOR_CONFIG = {
  host: computedEmulatorHost,
  authPort: authPortOverride,
  firestorePort: firestorePortOverride,
}

console.debug(
  'Firebase is running in ' +
  (IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT') +
  ' environment' +
  (USE_FIREBASE_EMULATORS ? ' with local emulators.' : '.'),
);

if (USE_FIREBASE_EMULATORS) {
  console.debug(
    `Firebase emulator config -> host: ${FIREBASE_EMULATOR_CONFIG.host}, auth: ${FIREBASE_EMULATOR_CONFIG.authPort}, firestore: ${FIREBASE_EMULATOR_CONFIG.firestorePort}`,
  )
}
