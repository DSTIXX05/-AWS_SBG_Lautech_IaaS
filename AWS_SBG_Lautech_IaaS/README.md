# Cloud Lab | AWS SBG LAUTECH

A responsive React + Vite workshop demo for comparing EC2 + Nginx with AWS Amplify Hosting.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Create the production build

```bash
npm run build
```

Vite writes the static production files to `dist/`.

## Deploy the same build to EC2 + Nginx

1. Make sure Nginx is installed and running on your EC2 instance.
2. Allow inbound HTTP on port 80 in the instance security group. Restrict SSH (port 22) to your own IP.
3. From this project directory on your local machine, copy the *contents* of `dist/` to the Nginx web root:

```bash
scp -i workshop-key.pem -r dist/* ec2-user@YOUR_EC2_PUBLIC_IP:/var/www/html/
```

Replace the key filename and public IP with your own values. This command assumes Amazon Linux and the `ec2-user` account. Make sure the remote directory is writable by that user or use an appropriate upload-and-move workflow.

Open `http://YOUR_EC2_PUBLIC_IP` in your browser.

If you redeploy, remove only the previous generated site files in `/var/www/html/` before uploading the new build, taking care not to delete unrelated files.

## Deploy with Amplify Hosting

1. Push this project to a GitHub repository.
2. In AWS Amplify, create a new app and connect the repository and branch.
3. For a standard Vite project, use:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy, then push a small change to the repository to demonstrate automatic redeployment.

## Teaching notes

- The live message editor and checklist use browser-side React state only.
- The “Simulate a new build” button changes a local counter. It does not contact AWS or trigger a real deployment.
- This is a static frontend. It has no backend, database, or AWS credentials.
- The comparison describes typical responsibilities for this demo. Real responsibilities depend on the architecture and configuration.
# AWS_SBG_Lautech_IaaS
# Lautech-Live-Repo
# -AWS_SBG_Lautech_IaaS
