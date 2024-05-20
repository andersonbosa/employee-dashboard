
export const ApiConfig = {
  security: {
    cors: process.env.API_SECURITY_CORS_ALLOWED_ORIGINS || '*',
    jwt: {
      secret: process.env.API_SECURITY_JWT_SECRET || '5ccc458b-4d32-5a74-8851-a8fc7bd64caa-d3c8d181-31de-5c8b-b3c5-cd488c577cb9',
      options: {
        expiresIn: '1d',
      }
    }
  }
}