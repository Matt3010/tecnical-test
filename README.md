# Getting Started with the application

<details>
  <summary style="font-weight: bold; font-size: 24px">
      Running the Program without Docker
   </summary>


To launch the program without Docker, follow these steps:

1. Open a terminal on your computer.
2. Type the following command:

    ```
    npm run start
    ```

3. Press Enter.
4. Follow the program outputs as they appear in the terminal.

You can insert either an online URL or a local file directory on your computer.
</details>


<details>
  <summary style="font-weight: bold; font-size: 24px">
      Running the Program with Docker
   </summary>

To launch the program using Docker, execute the following commands in your terminal:

### Building the Docker Image

First, build the Docker image for your Node.js application:
```bash
docker build -t nodeapp .
```

### Running the Docker Container
To run the Docker container and mount a chosen folder from your host machine:
```bash
docker run -it -v [choosen_folder]:/usr/src/app/files -w /usr/src/app nodeapp
```
Replace [chosen_folder] with the absolute path to the folder on your host machine that you want to mount into the Docker container.

# <span style='color:rgb(235, 174, 52)'>⚠️ Important</span>
When using Docker to access files from the host:

1. Ensure that the files you want to access are located in [chosen_folder].
2. Inside the Docker container, these files will be available in the `/usr/src/app/files` directory.
3. When referencing files inside [chosen_folder], use `/usr/src/app/files/[file_path]` to ensure correct path resolution.
4. Make sure to adjust [chosen_folder] and [file_path] as per your specific setup.

</details>
