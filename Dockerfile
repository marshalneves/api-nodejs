FROM node:latest
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# COPY ./dist ./dist
# COPY ./node_modules ./node_modules
# EXPOSE 3000
# CMD npm start
#RUN npm uninstall --save sqlite3 
#RUN npm install --save sqlite3
#RUN npm cache clean --force

# FROM node:10
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install
# RUN npm install pm2 -g
# RUN npm run build
# COPY ./dist .
# EXPOSE 4000
# CMD ["pm2-runtime","app.js"]