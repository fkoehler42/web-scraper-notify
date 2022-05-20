import nconf from 'nconf';
import { isDev } from './utils';
import path from 'path';

const storageFile = path.join(
    isDev ? process.cwd() : path.dirname(process.execPath),
    'storage.json',
);

export const initStore = () => nconf.file(storageFile);

export const saveStore = () => (
    new Promise((resolve) => {
        nconf.save(() => resolve);
    })
);

export const getStoreItem = (key: string) => nconf.get(key);

export const setStoreItem = (key: string, value: unknown) => nconf.set(key, value);