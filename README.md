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

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`

`nvm install 10`

### Install Yarn

`curl -o- -L https://yarnpkg.com/install.sh | bash`

### Install PM2

PM2 is a process manager for ensuring that the service can start up on boot and much more.
`npm install pm2@latest -g`

### Clone and install

`yarn install --prod`
This will compile SQLite3 from source on the Pi so it will take a while to complete (530 seconds on Pi 3)

### Build the static files

The service uses NextJS which uses SSR and statically compiled assets. You need to builds all the assets before you start the service.
`yarn build`

### Run the database migration

The service uses SQLite to store the temperature to display the temperature over time.
`yarn db:migrate`

### Start on boot
Start the service with PM2
`pm2 ./index.js`
Tell PM2 to run on startup.
`pm2 startup`

Run the command presented in the console something like this.
`sudo env PATH=$PATH:/home/pi/.nvm/versions/node/v10.13.0/bin /home/pi/.nvm/versions/node/v10.13.0/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi`

 Save the service configuration
`pm2 save`