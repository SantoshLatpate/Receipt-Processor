# Receipt-Processor

#  Receipt Processor Application

Welcome to the Receipt Processor for My Awesome Application!

## Prerequisites

Before you can run this Docker container, you need to have Docker installed on your system. You can download and install Docker from [Docker's official website](https://docs.docker.com/get-docker/).

## Getting Started

Follow these steps to run the container:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SantoshLatpate/Receipt-Processor.git
2. Change your working directory to the project's root:

   ```bash
    cd Receipt-Processor
3. Build the Docker image using the provided Dockerfile:

   ```bash
      docker build -t rp/demo:1.0 .
4. Replace my-awesome-app with a suitable name for your Docker image.
    Run the Docker container:

   ```bash
      docker run -d -p 3000:3000 --name node-app rp/demo:1.0
This command maps port 3000 on your host machine to port 80 on the Docker container. Adjust the port numbers as needed.
