# Web Scraper Notify

A cross-platform executable that scrape some data on targeted websites and send them through desktop notifications.

## Setup

This project uses yarn as the package manager. Follow [this guide](https://classic.yarnpkg.com/en/docs/install) to install it globally on your system. Once done, you can use the following commands:

- `yarn` (`yarn install`) to install the project dependencies.
- `yarn dev` to run the cli from the source files.
- `yarn clean` to delete build and bundle files.
- `yarn lint` to run eslint on source files.
- `yarn test` to run eslint and transpile the source code into JavaScript.
- `yarn build` to transpile the source code into JavaScript.
- `yarn bundle` to package the CLI into a standalone executable for each platform.
- `yarn bundle:mac` to package the CLI into a standalone executable for MacOS.
- `yarn bundle:win` to package the CLI into a standalone executable for Windows.
- `yarn bundle:linux` to package the CLI into a standalone executable for Linux.
## Usage

On Windows and MacOS, the final executable is shipped along with a `notifier` directory that include the necessary files to send a desktop notification. These files must remain at the same place relative to the executable.

You can run the executable whenever you want to get the data from the targeted websites. Feel free to add it to your list of startup programs or to make it a cron job for instance.

The program stores the latest data fetched so if you click on "Suspend until content change" button on the notification, you won't receive any further notifications until the data from the website changes.
Unfortunately this feature doesn't work on Linux for now. You can also click on the notification itself to get redirected to the URL from where the data is fetched.

### MacOS

The first time you run the CLI, you may see a request popup to allow notifications. If you miss it and don't receive any further notifications, go to *System Preferences > Notifications & Focus* and locate `terminal-notifier` in the list of programs to allow notifications.

Also, I've found that running the packaged executable from Mac built-in directories like *Downloads* or *Desktop* make the notifier to hang forever. I already checked the permissions and haven't found the root cause yet. Therefore, I recommend to put the files somewhere else in your user space, e.g. `/Users/Vald/Scraper-Notify/`.
If you have any clues about this issue please reach out to me! Thanks

### Windows

Windows notification method uses Snoretoast under the hood. As they state on their [repository](https://github.com/KDE/snoretoast), a start menu shortcut to `SnoreToast.exe` will be created and the notifications will be assigned to it if no application ID has been set, which we've not implemented at this point.

### Linux

Linux/BSD systems rely on `notify-send` executable. It is not shipped with web-scraper-notify executable so it's on you to install it on your system. It's available under `libnotify-bin` package.
Note: Ubuntu includes it by default.