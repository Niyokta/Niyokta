<h1>Setting Up The Project Locally</h1>

<h2>✅ Step 1</h2>
<p>Clone this repository on your maching.</p>
<pre>git clone https://github.com/Niyokta/Niyokta.git</pre>

<h2>✅ Step 2</h2>
<p>Install all the dependencies required</p>
<pre>npm install</pre>

<h2>✅ Step 3</h2>
<p>At this point, the application on your machine makes backend requests to the locahost. To make it work, you need to setup the backend first.</p>

<p>There are two ways to setup the backend. We prefer the first one as it is much easier and time saving.</p>

**Method 1 : Using Docker**

Make sure docker is install on your system before starting the backend setup if you want to use docker for it. If not, you can download it from `docker.com` and setup the docker cli or the docker desktop or both first.

<p>Now pull this repository which contains information about the docker containers orchestration and will manage the creation and synchronization of the machines automatically. </p>
<pre>git clone https://github.com/Niyokta/Niyokta.git</pre>

Create a `.env` file and copy the content of the `sample.env` to .env and provide the values to the fields required.


Make sure your port `3000` and `3001` are available for use on your maching. If not, then you can create a `.env` file and specify the port address that you want to run the service on.

<p>Run this command to start all the containers</p>
<pre>docker compose up -d</pre>

_🎉 Congratulations! your backend is ready to connect._

<hr/>

**Method 2 : Manual Setup**
