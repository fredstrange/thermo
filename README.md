# Thermo

A raspberry pi temperature monitor

## Installation on Raspberry Pi

### Enable ssh

- Enter the Rasperry Pi configuration
  `sudo raspi-config`
- Navigate to Interface options or Advanced Options depending on the Pi version.
- Enable SSH

### Enable 1-wire support

Open the boot configuration:
`sudo nano /boot/config.txt`

Add the following line (if not already enabled)
`dtoverlay=w1-gpio`
This will default to using bus 0 and the gpio-pin 4. If you have thermometers connected to multiple gpio pins you need to add additional rows, for instance:
`dtoverlay=w1-gpio,bus=1,gpiopin=17`

Alteratively you can run the following commands

```
sudo dtoverlay w1-gpio gpiopin=4 pullup=0  # header pin 7
sudo dtoverlay w1-gpio gpiopin=17 pullup=0 # header pin 11
```

https://pinout.xyz/pinout/1_wire

### Install NodeJs via NVM

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`

`nvm install 18`
`nvm alias default 18`

### Install Yarn

`curl -o- -L https://yarnpkg.com/install.sh | bash`

### Install PM2

PM2 is a process manager for ensuring that the service can start up on boot and much more.
`yarn global add pm2`

### Clone and install

`yarn install --prod`
This will compile SQLite3 from source on the Pi so it will take a while to complete (530 seconds on Pi 3)

### Start on boot

Start the service with PM2
`pm2 ./index.js`
Tell PM2 to run on startup.
`pm2 startup`

Run the command presented in the console something like this.
`sudo env PATH=$PATH:/home/pi/.nvm/versions/node/v18.12.1/bin /home/pi/.nvm/versions/node/v18.12.1/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi`

Save the service configuration
`pm2 save`

### Prometheus

https://pimylifeup.com/raspberry-pi-prometheus/

`sudo apt update`
`sudo apt full-upgrade`

We can download the pre-compiled version of Prometheus for the ARMv7 architecture.
`wget https://github.com/prometheus/prometheus/releases/download/v2.40.1/prometheus-2.40.1.linux-armv7.tar.gz`

Extract the binaries outside of the archive you downloaded by running the following command.
`tar xfz prometheus-2.40.1.linux-armv7.tar.gz`

Doing this makes it easier to reference the files within the directory. Use the mv command to rename the directory to prometheus.
`mv prometheus-2.40.1.linux-armv7/ prometheus/`

Delete the Prometheus archive by running the following command on your Raspberry Pi.
`rm prometheus-2.40.1.linux-armv7.tar.gz`

With that done, we now have Prometheus installed on our Raspberry Pi.

Setting up a Service for Prometheus
A service is what allows you to have a software automatically started up at boot. It also allows you to start and stop the software quickly.

To create a service, we need to create a new file within the “/etc/systemd/system/” directory.

Begin writing the new service file by running the following command on your Pi.

`sudo nano /etc/systemd/system/prometheus.service`

Within this file, enter the following text. The text defines how the service works and how it should run the Prometheus software.

```
[Unit]
Description=Prometheus Server
Documentation=https://prometheus.io/docs/introduction/overview/
After=network-online.target

[Service]
User=pi
Restart=on-failure

ExecStart=/home/pi/prometheus/prometheus \
  --config.file=/home/pi/prometheus/prometheus.yml \
  --storage.tsdb.path=/home/pi/prometheus/data

[Install]
WantedBy=multi-user.target
```

With the way this service file is written, it will run the Prometheus software on your Raspberry Pi once the network has come online.

Upon starting up, it will run the Prometheus executable located at “/home/pi/prometheus/prometheus“.

We pass in both the config file location and a storage location for the database that the monitoring software requires.

If you ever need to modify the config file, you can find it at “/home/pi/prometheus/prometheus.yml“.

To enable the Prometheus service, we can run the following command.
`sudo systemctl enable prometheus`

To start the service, run the following command.
`sudo systemctl start prometheus`

Check the status
`sudo systemctl status prometheus`

### Grafana

https://pimylifeup.com/raspberry-pi-grafana/

To add the Grafana APT key to your Raspberry Pi’s keychain, run the following command.
`curl https://packages.grafana.com/gpg.key | gpg --dearmor | sudo tee /usr/share/keyrings/grafana-archive-keyrings.gpg >/dev/null`

Use the following command on your Raspberry Pi to add the repository to the list.
`echo "deb [signed-by=/usr/share/keyrings/grafana-archive-keyrings.gpg] https://packages.grafana.com/oss/deb stable main" | sudo tee /etc/apt/sources.list.d/grafana.list`

Running an update with apt allows it to fetch the latest list of packages from all sources.
`sudo apt update`

We can install the latest version of Grafana by running the following command on your device.
`sudo apt install grafana`

To enable Grafana to start at boot, all we need to do is run the following command.
`sudo systemctl enable grafana-server`

Finally, let’s start up the Grafana server software by running the command below in the Pi’s terminal.
`sudo systemctl start grafana-server`
