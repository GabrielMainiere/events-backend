export const corsConfig = {
  origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Apollo-Require-Preflight'],
  methods: ['GET', 'POST', 'OPTIONS'],
}
