import notifier, {
    NotificationCenter,
    NotifySend,
    WindowsToaster,
} from 'node-notifier';
import path from 'path';

interface NodeProcessPkg extends NodeJS.Process {
    pkg: unknown;
}

let Notifier = null;
const IS_DEV = !(process as NodeProcessPkg).pkg;

if (IS_DEV) {
    Notifier = notifier;
} else if (process.platform === 'darwin') {
    Notifier = new NotificationCenter({
        customPath: path.join(path.dirname(process.execPath), 'notifier', 'terminal-notifier'),
    });
} else if (process.platform === 'win32') {
    Notifier = new WindowsToaster({
        customPath: path.join(path.dirname(process.execPath), 'notifier', 'snoretoast-x64.exe'),
    });
} else {
    // NotifySend internally check if the current system is supported (Linux/BSD)
    // and if `notify-send` is installed. An error is returned
    // in the `notify` callback if one these conditions is not met
    Notifier = new NotifySend();
}

const notify = (title, message) => (
    new Promise<void>((resolve, reject) => {
        Notifier.notify({ title, message }, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    })
);

export default notify;