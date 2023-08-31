/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { default as Redis } from 'ioredis';
import * as connectRedis from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

// import { createClient } from 'redis';

// const redisClient = createClient({
//   legacyMode: true,
// });
// redisClient.connect().catch(console.error);

// const RedisStore = connectRedis(session);
// const redisClient = new Redis();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN,
    methods: 'GET, PUT, POST, DELETE , OPTIONS',
    allowedHeaders: '*',
    preflightContinue: false,
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,

      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 60000 * 5 * 2 * 3,
        sameSite: 'none',
        domain: 'auth.atlasacademy.ir',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
