FROM node:24-alpine AS build

WORKDIR /app

ENV CI=true

RUN npm install -g pnpm@12.3.4

COPY package.json package-*.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN pnpm build

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

ENV PORT=3000

ENV HOSTNAME=0.0.0.0

COPY --from=build /app/.next/standalone ./

COPY --from=build /app/.next/static ./.next/static

COPY --from=build /app/public ./public

USER node

EXPOSE 3000

CMD [ "node", "server.js" ]