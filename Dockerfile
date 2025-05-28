FROM node:18.20.2-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY ./next.config.js ./
COPY ./public ./public
COPY ./package.json ./package.json

#RUN npm install -g --arch=x64 --platform=linux --libc=glibc sharp@0.33.4
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
