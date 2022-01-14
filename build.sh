docker rm -f mdr-frontend
docker build -t mdr-frontend ./frontend3
docker-compose up