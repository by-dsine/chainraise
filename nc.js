const dev = process.env.NODE_ENV !== 'production';

export const BASE_URL = dev ? 'api-sandboxdash.norcapsecurities.com' : 'api.norcapsecurities.com'