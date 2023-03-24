const WebClient = require('@slack/web-api').WebClient;
const { createEventAdapter } = require('@slack/events-api');

const slackSigningSecret = '709a7e5ab275b5d53d6eff595d357233';
const slackToken = 'xoxb-4120460522245-4996444148224-v3aT0bgMhddDvLgv5tBo1cbq';

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);



slackEvents.on('app_mention', (event) => {
    console.log(`Received an app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);

    (async () => {
        try {
            if (event.text == "op") {
                await slackClient.chat.postMessage({ channel: event.channel, text: `<@${event.user}> op baqi sb L ki topi :eyes:` });
            }
            await slackClient.chat.postMessage({ channel: event.channel, text: `Hello there <@${event.user}>! :eyes:` });
            console.log(`Hello there <@${event.user}>! :eyes:`);
        }
        catch (error) {
            console.log(error);
        }
    })();
}); slackEvents.on('member_joined_channel', (event) => {
    console.log(`Received a member_joined_channel event: user ${event.user} joined channel ${event.channel}`);
    (async () => {
        try {
            const channelInfo = await slackClient.conversations.info({ channel: event.channel });
            const welcomeMessage = `Welcome <@${event.user}> to CODUKO I hope you are doing great. Please fill out the form below for our record. We will use the provided picture for linkedin posts on our official page.
https://forms.gle/DRRuSmBndXFAr3k19 :tada:`;
            await slackClient.chat.postMessage({ channel: event.channel, text: welcomeMessage });


        } catch (error) {
            console.log(error);
        }
    })();
});
slackEvents.on('error', console.error);
slackEvents.start(8000).then(() => {
    console.log('server started ');
});