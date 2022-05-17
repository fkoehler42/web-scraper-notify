import notifier, {
    NotificationCenter,
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
    throw new Error(`Notifier not supported on your platform: ${process.platform}`);
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