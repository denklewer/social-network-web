FROM python:3.7-alpine

LABEL maintainer="tmv1995@gmail.com"

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN  apk update && \
	apk add python python3 python3-dev supervisor && \
	pip3 install --upgrade pip && \
	pip3 install flask gunicorn

COPY . /usr/src/app


EXPOSE 5876

CMD ["gunicorn", "--bind=0.0.0.0:5876", "app:app"]







