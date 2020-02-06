export const SETUP_IS_NOT_EXPIRED = 'SETUP_IS_NOT_EXPIRED';

export const setupIsExparied = (isNotExpired) => ({
    type: SETUP_IS_NOT_EXPIRED,
    isNotExpired,
});
