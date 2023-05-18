declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            MONGODB_URI: string;
            // add more environment variables here as needed
        }
    }
}
export interface GoogleProvider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    clientId: string;
    clientSecret: string;
}