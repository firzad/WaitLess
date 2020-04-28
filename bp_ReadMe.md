# capstone-project-masterminds

capstone-project-masterminds created by GitHub Classroom

Boilerplate credits:
https://github.com/kingbar1990/React-TypeScript-Flask-boilerplate

### Build project

1. Rename ".env.example" to ".env"

```bash
mv .env.example .env
```

2. Create files folder

```bash
mkdir server/files
```

3. Build docker-compose

```bash
docker-compose build
```

4. Create database

```bash
docker-compose up -d database
```

5. Make database migrations

```bash
docker-compose run flask python manage.py db upgrade
```

6. Create node_modules

```bash
docker-compose run node yarn
```

7. Run the project

```bash
docker-compose up
```

8. Open in your browser http://localhost:3000/

#### Steps to run the server

1. Change directory to server

```bash
cd server
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Change DB details if required in config.py

```python
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{passwd}@{host}:5432/{db}'.format(
        user="username",
        passwd="password",
        host="localhost",
        db="Waitless"
)
```

4. Start the server

```bash
python manage.py
```

### Run tests

```bash
docker-compose run flask pytest
```
