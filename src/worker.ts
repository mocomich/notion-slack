import { Hono } from 'hono';
import { scheduleHandler } from './handler/scheduleHandler';

export type Env = {
	NOTION_TOKEN: string;
	NOTION_DATABASE_ID: string;
	SLACK_TOKEN: string;
};

const isDevelopment = process.env.NODE_ENV === 'development';

const app = new Hono<{ Bindings: Env }>();

// debug
if (isDevelopment) {
	app.get('/_/debug', async (c) => {
		try {
			await scheduleHandler(c.env);
			return c.text('ok');
		} catch (e) {
			console.error(e);
			return c.text('error', 500);
		}
	});
}

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		ctx.waitUntil(scheduleHandler(env));
	},
	fetch: app.fetch,
};
