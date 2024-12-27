export interface DatabaseConfig {
    HOST: string;
    PORT: number;
    RETRY_ATTEMPTS: number;
    RETRY_TIME: number;
    USER: string;
    PASSWORD: string;    
    DATABASE: string;
}