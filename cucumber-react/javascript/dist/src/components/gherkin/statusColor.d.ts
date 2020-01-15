import Color from 'color';
import { messages } from 'cucumber-messages';
import Status = messages.TestResult.Status;
declare const statusColor: (status: Status) => Color;
export default statusColor;
