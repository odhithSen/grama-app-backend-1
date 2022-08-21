// import dependencies
import axios from "axios";
import dotenv  from "dotenv";
dotenv.config();

// Slack token
const slackToken = 'xoxb-3853243576295-3891550629680-Q5WYECURrFXtYvLuV6kGxgbX';
// const slackToken = process.env.SLACK_TOKEN;

// function to send slack messages to inform server errors.
export async function send_slack_message (message, errorInfo){
    try {
        const url = 'https://slack.com/api/chat.postMessage';
        const res = await axios.post(url, {
        channel: '#server-errors',
        text: `[SERVER ERROR]: ${message}, Error info: ${errorInfo}`}, 
        { headers: { authorization: `Bearer ${slackToken}` } });

    } catch (error) {
        console.error(error.message );
    }
    
}