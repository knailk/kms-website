const convertDataMessageList = (data, userLoginId) => {
    let messageList = [];
    data.forEach((message_list) => {
        let messages = [];
        message_list.messages.forEach((message, idx) => {
            let prev = idx > 0 ? message_list.messages[idx - 1] : null;
            let next = idx < message_list.messages.length - 1 ? message_list.messages[idx + 1] : null;
            //check direction
            let direction = message.sender.uid === userLoginId ? 'outgoing' : 'incoming';

            //check position first, normat, last, single
            let position = 'normal';
            //check for the first/last message of day
            if (prev === null && next === null) {
                position = 'single';
            }

            if (prev === null && next !== null) {
                if (next.sender.uid !== message.sender.uid) {
                    position = 'single';
                } else {
                    position = 'first';
                }
            }
            if (prev !== null && next === null) {
                if (prev.sender.uid !== message.sender.uid) {
                    position = 'single';
                } else {
                    position = 'last';
                }
            }
            //check for the not first/last message of day
            if (prev !== null && next !== null) {
                //position first
                if (prev.sender.uid !== message.sender.uid) {
                    if (next.sender.uid !== message.sender.uid) {
                        position = 'single';
                    } else {
                        position = 'first';
                    }
                }
                //position last
                if (next.sender.uid !== message.sender.uid) {
                    if (prev.sender.uid !== message.sender.uid) {
                        position = 'single';
                    } else {
                        position = 'last';
                    }
                }
            }

            //check for show avatar
            let showAvatar = false;
            if (direction === 'incoming' && (position === 'single' || position === 'last')) {
                showAvatar = true;
            }
            messages.push({
                ...message,
                direction: direction,
                position: position,
                showAvatar: showAvatar,
            });
        });
        messageList.push({ messages: messages, date: message_list.date });
    });

    return messageList;
};
export default convertDataMessageList;