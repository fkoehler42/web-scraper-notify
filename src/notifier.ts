import open from 'open';
import notifier, {
    NotificationCenter,
    NotifySend,
    WindowsToaster,
} from 'node-notifier';
import { isDev } from './utils';
import path from 'path';
import {
    getStoreItem,
    setStoreItem,
} from './store';


const suspendLabel = 'Suspend until content change';
let Notifier = null;

if (isDev) {
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

const notify = async (id, data, url) => {
    const storedItem = await getStoreItem(id);

    if (storedItem && storedItem.suspended && data === storedItem.message) {
        return;
    }

    return new Promise<void>((resolve, reject) => {
        // Windows specific behavior relies on actions listeners
        if (process.platform !== 'darwin') {
            const saveDataNoSuspend = () => {
                setStoreItem(id, {
                    message: data,
                    suspended: false,
                });
                Notifier.removeAllListeners();

                return resolve();
            };

            Notifier.once('timeout', saveDataNoSuspend);
            Notifier.once('dismissed', saveDataNoSuspend);
            Notifier.once('click', () => {
                open(url);
                saveDataNoSuspend();
            });
            Notifier.once(suspendLabel.toLowerCase(), () => {
                setStoreItem(id, {
                    message: data,
                    suspended: true,
                });
                Notifier.removeAllListeners();

                return resolve();
            });
        }

        Notifier.notify({
            title: id,
            message: data,
            open: url,
            actions: [suspendLabel],
            closeLabel: 'Close',
            wait: true,
            timeout: 10,
        }, (err, response, metadata) => {
            if (err) {
                return reject(err);
            }
            if (process.platform === 'darwin') {
                setStoreItem(id, {
                    message: data,
                    suspended: !!(metadata.activationValue === suspendLabel),
                });

                return resolve();
            }
        });
    });
};

export default notify;