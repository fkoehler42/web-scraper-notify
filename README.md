# Web Scraper Notify

A cross-platform executable that scrape some data on targeted websites and send them through desktop notifications.

## Setup

This project uses yarn as the package manager. Follow [this guide](https://classic.yarnpkg.com/en/docs/install) to install it globally on your system. Once done, you can use the following commands:

- `yarn` (`yarn install`) to install the project dependencies.
- `yarn dev` to run the cli from the source files.
- `yarn lint` to run eslint and transpile the source code into JavaScript.
- `yarn build` to transpile the source code into JavaScript.
- `yarn bundle:mac` to package the CLI into a standalone executable for MacOS.

## Usage

The final executable is shipped along with a `notifier` directory that include the necessary files to send a desktop notification, depending on your operating system. These files must remain at the same place.

You can run the executable whenever you want to get the data from the targeted websites. Feel free to add it to your list of startup programs or to make it a cron job for instance.

### MacOS

The first time you run the CLI, you may see a request popup to allow notifications. If you miss it and don't receive any further notifications, go to *System Preferences > Notifications & Focus* and locate `terminal-notifier` in the list of programs to allow notifications.

Also, I've found that running the packaged executable from Mac built-in directories like *Downloads* or *Desktop* make the notifier to hang forever. I already checked the permissions and haven't found the root cause yet. Therefore, I recommend to put the files somewhere else in your user space, e.g. `/Users/Vald/Scraper-Notify/`.
If you have any clues about this issue please reach out to me! Thanks

### Windows

Windows notification method uses Snoretoast under the hood. As they state on their [repository](https://github.com/KDE/snoretoast), a start menu shortcut to `SnoreToast.exe` will be created and the notifications will be assigned to it if no application ID has been set, which we've not implemented at this point.

### Linux

Linux/BSD systems rely on `notify-send` program. It is not shipped with web-scraper-notify executable so it's on you to check if it's installed on your system and to do so if not.
Note: Popular user friendly distributions like Ubuntu include it by default.