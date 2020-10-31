FROM httpd:2.4
RUN apt-get update -y
RUN apt-get install -y markdown
COPY httpd.conf /usr/local/apache2/conf/
WORKDIR /usr/local/apache2/htdocs/
COPY . .
RUN markdown README.md > index.html
