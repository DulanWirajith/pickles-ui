export const BASE_URL = "http://localhost:3000";
export const BASE_API_URL = process.env.BASE_URL || BASE_URL;

export const apis = {
    FETCH_ALL_MAILS: `${BASE_API_URL}/mail/get-all-mails`,
    EMAIL_NOTIFICATION_AUTH: `${BASE_API_URL}/mail/auth/channel-auth`,
};
