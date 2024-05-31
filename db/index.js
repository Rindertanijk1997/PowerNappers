import Datastore from 'nedb';

const db = new Datastore({ filename: 'users.db', autoload: true });

export default db;