import { scheduleHandler } from './handler/scheduleHandler';

export interface Env {
	NOTION_TOKEN: string;
	NOTION_DATABASE_ID: string;
	SLACK_TOKEN: string;
}

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		ctx.waitUntil(scheduleHandler(env));
	},
};
