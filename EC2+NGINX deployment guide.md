- 1. Navigate to cloud-lab-react-source/cloud-lab where you can see the package.json file.

- 2. Run npm install to install the dependencies. Meanwhile, you must have node installed on your PC.

- 3. npm run dev to run the react server on your machine and npm run build to build the prod ready files.

On AWS management console

- 1. Create a VPC. CIDR block 10.0.0.0/24

- 2. Create an attach Internet gateway to your newly created VPC

- 3. Create route table to route traffic to the internet gateway.

- 4. Add route to send traffic to IGW


- 5. Pick an AZ. Very important for our next hands-on: Europe (Ireland) / euw1-az2 (eu-west-1a)

6.

- 7. Time to set up our EC2

- a. Go to the EC2 console

- b. Create a key pair and save it on your machine. It’ll be used to SSH into the instance later on.

- c. Paste the Userdata


#!/bin/bash

set -euxo pipefail

dnf update -y dnf install -y nginx

mkdir -p /var/www/html

chown -R ec2-user:ec2-user /var/www/html

systemctl enable nginx systemctl start nginx

Don’t also forget to set your default ec2 sg to anywhere ipv4.

- 8. Set permission to allow only owner to be able to the read the pem file

You should be able to SSH into the server.

- 9. We’re copying the static files to our ec2 instance so it doesn’t show this stale NGINX page when we hit the IP address

## scp -r -i Lautech_key.pem ./dist ec2-user@3.252.100.249:/home/ec2-user

Copy files to sudo cp -r /home/ec2-user/dist/* /var/www/html/

Also create a new nginx config file at /etc/nginx/conf.d/lautech.conf server {

\# Listen on port 80 (HTTP) for both IPv4 and IPv6 listen 80;

listen [::]:80;


\# Replace with your EC2 Public IP or your domain name

server_name 3.252.100.249;

\# The absolute path to the directory containing your HTML files

root /var/www/html/dist;

\# The default file Nginx looks for when a user visits the root URL

index index.html index.htm;

location / {

}

}

}

\# Check if the requested file exists, then folder, otherwise throw a 404 try_files \$uri \$uri/ =404;

\# Optional: Cache control for static assets (images, CSS, JS) location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)\$ { expires 7d; add_header Cache-Control "public, no-transform";

\# Configure custom logs for this specific site access_log /var/log/nginx/static_site_access.log; error_log /var/log/nginx/static_site_error.log;

For replacing IP addresses after terminating EC2 instance

sudo sed -i 's/former_ip/new_ip/g' lautech.conf

Using Amplify cd dist zip -r ../cloud-lab-amplify.zip . cd ..

scp [options] [user@]source_host:path/to/source

[user@]dest_host:path/to/destination

34.244.76.125
