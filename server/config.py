import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    TESTING = False
    CSRF_ENABLED = True
    MIGRATION_DIR = os.path.join('core', 'migrations')
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{passwd}@postgres:5432/{db}'.format(
        user="postgres",
        passwd="password",
        host="postgres",
        db="Waitless"
    )

class ProductionConfig(Config):
    DEBUG = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    DEVELOPMENT = False
    DEBUG = False

class TestingConfig(Config):
    TESTING = True
