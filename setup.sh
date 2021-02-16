#!/bin/bash

domain="medialib.hickar.space"
repo="https://github.com/Hickar/medialibrary-coursework"
project_dir="~/medialibrary-coursework/"

function is_exists() {
  if command -v $1 &> /dev/null; then
    return 1
  else
    return 0
  fi
}

function install_docker() {
  is_exists docker
  if [ $? = 0 ];
  then
    echo "Updating packages list..."
    sudo apt-get update && sudo apt-get upgrade

    echo "Installing docker dependencies..."
    sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common

    echo "Downloading Docker..."
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"

    echo "Installing Docker..."
    if apt-get install docker-ce docker-ce-cli containerd.io; then
      echo "Docker was successfully installed!"
      return 1
    else
      echo "Error during Docker installation!!!"
      exit 1
    fi
  else
    echo "Docker is already installed"
    return 1
  fi
}

function install_certbot() {
  echo "Installing certbot & dependencies..."
  sudo apt install snapd
  sudo snap install core; sudo snap refresh core
  sudo snap install --classic certbot
  sudo ln -s /snap/bin/certbot /usr/bin/certbot
  sudo certbot --apache
  return 
}

function configure_vhost() {
  echo "Apache configuration..."
  sudo cp -r /etc/letsencrypt/live/$domain.conf/* ./certs/
  sudo cp $domain.conf /etc/apache2/sites-available/

  sudo a2ensite $domain
  sudo a2enmod rewrite ssl proxy proxy-http log_debug alias
  return
}

install_docker
install_certbot
configure_vhost