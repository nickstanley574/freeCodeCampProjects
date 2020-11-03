FROM httpd:2.4
RUN apt-get update -y
RUN apt-get install -y markdown wget unzip curl jq sass
COPY httpd.conf /usr/local/apache2/conf/
WORKDIR /usr/local/apache2/htdocs/
COPY start.sh .
CMD ["/usr/local/apache2/htdocs/start.sh"]