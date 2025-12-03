import { ProcessNotificationInput } from "./iProcessNotificationInput";
import { ProcessNotificationOutput } from "./iProcessNotificationOutput";


export interface INotificationProcessor {
  process(data: ProcessNotificationInput): Promise<ProcessNotificationOutput>;
}