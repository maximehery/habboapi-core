export interface IRconMessage {
    key: 'ignoreuser' | 'imagehotelalert' | 'updatecatalog' | 'givecredits' | 'imagealertuser' | 'alertuser' | 'modticket' | 'setmotto' | 'updatewordfilter' | 'setrank' | 'stalkuser' | 'talkuser' | 'forwarduser' | 'sendgift' | 'givepoints' | 'updateuser' | 'muteuser' | 'friendrequest' | 'progressachievement' | 'givebadge' | 'executecommand' | 'givepixels' | 'disconnect' | 'sendroombundle' | 'staffalert' | 'changeroomowner' | 'hotelalert' | 'giverespect';
    data?: {
        user_id?: number;
        message?: string;
        room_id?: number;
        badge?: string;
        credits?: number;
        points?: number;
        type?: number;
        itemid?: number;
        rank?: number;
        follow_id?: number;
    };
}
