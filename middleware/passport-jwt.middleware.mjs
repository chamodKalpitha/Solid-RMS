import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import prisma from "../prisma/prismaClient.mjs";
import "dotenv/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export default passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });
      if (!user) return done(null, false);

      if (user.role === "OWNER") {
        const owner = await prisma.owner.findUnique({
          where: { userId: user.id },
        });
        user.ownerId = owner.id;
      }

      if (user.role === "MANAGER") {
        const manager = await prisma.manager.findUnique({
          where: { userId: user.id },
        });
        user.managerId = manager.id;
      }
      done(null, user);
    } catch (error) {
      console.log(error);
      return done(error, false);
    }
  })
);
