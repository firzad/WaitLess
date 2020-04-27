FROM python:3.6

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "manage.py"]