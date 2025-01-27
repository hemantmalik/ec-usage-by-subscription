# ec-usage-by-subscription
Elastic Cloud Usage by Azure Subscription 

This application delivers an interactive web page that allows you 
to view your elastic cloud usage, summarized by a Azure Subscription tag.
It also allows users to download the summarized data to a CSV file.

## Pre-Requisites

Before running the report, you will need do a couple of things
in the [Elastic Cloud](https://cloud.elastic.co) console.

* Create an [API Key](https://cloud.elastic.co/deployment-features/keys) for use by the report.
* Tag your each of your deployments with a "azure_subscription_name" key and name pair.

Note: _Untagged deployments will show up in an "un-tagged" section of the report._

## To build and run the report locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/hemantmalik/ec-usage-by-subscription.git
```
2. Build the docker image

```bash
cd ec-usage-by-subscription
docker build --tag ec-usage-by-subscription:latest .
```

3. Run the image in a container (named "ec-usage")

```bash
export EC_API_KEY="...your-ec-api-key..."
export ADMIN_USER_NAME="elastic"
export ADMIN_PASSWORD="...password..."
docker run --publish 80:8080 --env EC_API_KEY --env ADMIN_USER_NAME --env ADMIN_PASSWORD --rm --name ec-usage --detach ec-usage-by-subscription:latest
```

_Note: the ADMIN_USER_NAME and ADMIN_PASSWORD environment variables are optional.  When omitted from the docker run command, the admin user will be "elastic" and the password will be the EC_API_KEY._

4. To access the usage report, open http://127.0.0.1 in your web browser

5. To shutdown, kill the container

```bash
docker kill ec-usage
```
