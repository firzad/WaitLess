# capstone-project-masterminds

capstone-project-masterminds created by GitHub Classroom

### Build and run the project Waitless

### Installation
1. Install a Docker Engine (Docker Desktop recommended) for the respective system. [Docker engine](https://docs.docker.com/engine/install/)
For older Mac and Windows versions, use Docker Toolbox if the system doesn't support Docker Desktop.
[Docker Toolbox](https://github.com/docker/toolbox/releases).
If Docker toolbox is required, additional setup steps are required before proceeding, see below
Once Docker Desktop is installed, it will set up the required environment. 

2. After installation of docker, navigate into the root directory of the project: capstone-project-masterminds. Start the Docker Engine by running the Docker Desktop application and run the following command to build and set-up the containers for the web application.

```bash
docker-compose up --build
```

This will set-up the environment for the application using the required libraries, build and run the **client, backend** and **database** servers. By default, a demo database script is run to populate the menu and tables, see options below to revert to a clean database.

3. After the docker container **react-app** is running and outputs *“Compiled successfully”*, visit the Waitless homepage.
<http://localhost:3000/>
This url will host the deployed systems where all the four areas of the application can be accessed from the homepage.

4. To exit the server, **Ctrl + C** to gracefully exit.
This will only stop the servers for client, backend and database servers and preserve anything in the database.

5. To clear the created containers including the database, type the following command.
```bash
docker-compose down
```
This command clears the server containers from the system, but the cache is still maintained.

6. To clear the docker environment along with any cached data completely from the system, use the following command:
```bash
docker system prune -a
```

## Docker Toolbox
If the target system is running an older version of windows and Docker Toolbox is required, additional steps are required.

1. Install Docker Toolbox and virtualBox
	(https://github.com/docker/toolbox/releases)

	(https://www.virtualbox.org/wiki/Downloads)

2. Due to the virtualisation of docker toolbox, the address localhost is not available within or outside of docker toolbox containers. A different IP needs to be used. First, navigate to *capstone-project-masterminds/client/src/pathing.tsx*, comment line 1 and uncomment line 2. It should now look like: 
```javascript
//export const net_path = 'http://localhost:5000';
export const net_path = 'http://192.168.99.100:5000';
```

3. Navigate to *capstone-project-masterminds/server/core/\__init__.py*, comment line 11 and uncomment line 12. It should now look like:
```python
#app.config['BASE_URL'] = "http://localhost:5000"
app.config['BASE_URL'] = "http://192.168.99.100:5000"
```

4. Navigate in a command prompt or the docker-toolbox command prompt to the root directory of the project

5. Run the command
```bash
docker-compose up --build
```
to begin the installation and run. Wait until the react-app container outputs *“Compiled Successfully”* 

6. The Waitless application can be accessed at 
	<http://192.168.99.100:3000/>

7.For shutting down and cleaning, see the above section from step 4


## Install Options
By default we have included a demo restaurant setup, including 4 tables and a sample menu populated with items. This is free to be modified and was put in place to save time for demonstration. To run the code fresh with no tables and an empty menu, the initial database script needs to be changed.

1. Navigate to and open *capstone-project-masterminds/docker-compose.yml*

2. On line 16, the initial sql script is listed. *initial.sql* will run the container with a demo restaurant while *initial_base.sql* will be for an empty restaurant

3. Comment line 16 and uncomment line 17. It should now look like:
```yaml
#- ./database/initial.sql:/docker-entrypoint-initdb.d/initial.sql
- ./database/initial_base.sql:/docker-entrypoint-initdb.d/initial_base.sql
```
4. Now run **docker-compose down** to clear the current session, then re-run **docker-compose up --build** to recreate the container with an empty restaurant.


To revert back, undo the comment changes and run the previous two commands again.


## Troubleshooting
There is a known bug in some older systems of windows which run Docker Desktop where the virtualisation container’s internal clock through Hyper-v becomes out of sync, resulting in the internal containers time being wrong. If the kitchen order tickets have time out of sync, it is due to this bug within the Hyper-v virtual box. This can be fixed by resetting the internal clock of the virtual box.
1. Open the Hyper-v manager application (type hyper-v manager in the windows bar)

2. Under the list of virtual machines, the DockerDesktopVM should appear. Click this and navigate to the right hand bar which appears. Click on settings in this right hand bar
3. In the new window, click on *Integration Services* under *Management*

4. Deselect *Time Synchronisation*, hit apply and reselect *Time resynchronisation*, apply again.

5. Close out of the Hyper-v manager and rerun the docker application. The virtual container’s times should now be in sync
