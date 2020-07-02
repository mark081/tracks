FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /web
WORKDIR /web
COPY . /web/
RUN pip3 install -r requirements.txt
