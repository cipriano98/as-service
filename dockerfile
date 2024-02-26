FROM node:20

WORKDIR /app


COPY . .
RUN npm install

RUN npm run build
RUN npm prune --production

EXPOSE 3333
# CMD ["node", "dist/main.js"]
CMD ["npm", "start"]