import notifier from 'node-notifier';

const notify = (title, message) => {
    console.log(message);
    notifier.notify({ title, message }, (err) => {
        if (err) {
            console.log('Error', err);
        }
    });
};

export default notify;