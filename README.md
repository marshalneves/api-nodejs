## install docker compose
    sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

    sudo chmod +x /usr/local/bin/docker-compose

# run with docker-compose
docker-compose build && docker-compose up -d    

# build image
sudo docker build -t banco-dos-pais-api .   

# run with docker
sudo docker run -d -p 3000:3000 banco-dos-pais-api