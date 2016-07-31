FROM mhart/alpine-node:6

WORKDIR /src
ADD . .

CMD ["node", "index.js"]