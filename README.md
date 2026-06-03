docker build --tag docker-nodejs-sqlite .

docker run -d -p 3000:3000 --name myTest docker-nodejs-sqlite
(without -d to see console)

docker exec -it myTest /bin/bash

docker stop myTest
...
docker start myTest

export image:
docker save docker-nodejs-sqlite -o test.tar
import image:
docker load -i test.tar
