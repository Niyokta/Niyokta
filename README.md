<h1>Description</h1>
Niyokta is a freelance platform where you can post and bid for different projects and manage your projects or bids along with analytics.

<h1>Architecture</h1>
Niyokta follows microservice architecture, though there are not many microservices but the responsibilities have been assigned to different services. All the services are listed below.<br/>
1. Client Application <br/>
2. Notification Microservice (currently limited to email) <br/>
3. Messaging Microservice <br/>


<h1>System Flow</h1> 
G-Drive Link : https://drive.google.com/file/d/1eL5QhgyDl44ZvXQaCMEzA6zy_pK9f7fP/view?usp=sharing

<h1>Setting Up The Project Locally</h1>

<h2>✅ Step 1</h2>
<p>Clone this repository on your maching.</p>
<pre>git clone https://github.com/Niyokta/Niyokta.git</pre>

<h2>✅ Step 2</h2>
<p>Install all the dependencies required</p>
<pre>npm install</pre>

<h2>✅ Step 3</h2>
<p>At this point, the application on your machine makes backend requests to the locahost. To make it work, you need to setup the backend first.</p>

Make sure docker is install on your system before starting the backend setup if you want to use docker for it. If not, you can download it from `docker.com` and setup the docker cli or the docker desktop or both first.

<p>Open your terminal and run the following command to pull the docker image</p>
<pre>docker pull sahayak/niyoktamainserver:v1.0.0</pre>

<p>After the image is fetched, create a .env file which contains the url of the database. Name the varaible as DATABASE_URL. You may spin up a postgreSQL container for the same and it will work fine (easier to do).</p>
<p>Then run the following command after navigating to the root of the .env file.</p>
<pre>docker run -d --env-file .env -p 3000:3000 sahayak/niyoktamainserver:v1.0.0</pre>

_🎉 Congratulations! your backend is ready to connect._

<p>At this stage, the backend is up and running but the client-chat or the messaging service is still not ready.</p>
<p>Run the command in your terminal</p>
<pre>docker pull sahayak/niyoktaclientchat:latest</pre>

<p>Now again create a separate .env file for the messaging service which accepts the following parameters for the firebase firestore configerations.</p>
<ul>
  <li>API_KEY</li>
  <li>AUTH_DOMAIN</li>
  <li>PROJECT_ID</li>
  <li>STORAGE_BUCKET</li>
  <li>MESSAGING_SENDER_ID</li>
  <li>APP_ID</li>
</ul>

<p>Then, move to the root of the .env file and run the following command in your terminal</p>
<pre>docker run -d --env-file .env -p 3001:3001 sahayak/niyoktaclientchat:latest</pre>

_🎉 Congratulations! the client chat service is ready to connect._
