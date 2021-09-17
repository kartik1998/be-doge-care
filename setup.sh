#/bin/bash

function install_modules {
while true; do
    read -p "Install npm modules ? [Y/n]" yn
    case $yn in
        [Yy]* ) npm install; break;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done 
}

echo "Setting up:: Please ensure that your system has docker, node & npm installed"
install_modules

echo "Setting up:: mongoDB container"
docker-compose up -d
echo "npm run dev :: starting up"
npm run dev