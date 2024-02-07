import React from "react";
import Dexie from 'dexie';

export const db = new Dexie('pccontrolChatHistoryDatabase');
db.version(1).stores({
    chathistory: '++id, sender, room, message, type, sent_at'
});