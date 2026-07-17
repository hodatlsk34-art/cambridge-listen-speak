CREATE TABLE `pilot_feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`rating` integer NOT NULL,
	`tester_role` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `pilot_feedback_user_idx` ON `pilot_feedback` (`user_id`);--> statement-breakpoint
CREATE TABLE `progress` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`listening_score` integer,
	`pronunciation_score` integer,
	`completed_at` integer,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `progress_user_lesson_unique` ON `progress` (`user_id`,`lesson_id`);--> statement-breakpoint
CREATE INDEX `progress_user_idx` ON `progress` (`user_id`);--> statement-breakpoint
CREATE TABLE `recordings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`object_key` text NOT NULL,
	`content_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`pronunciation_score` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `recordings_user_idx` ON `recordings` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`login_code` text NOT NULL,
	`display_name` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL,
	`role` text DEFAULT 'student' NOT NULL,
	`level` text DEFAULT 'Pre A1' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`must_change_password` integer DEFAULT 1 NOT NULL,
	`is_minor` integer DEFAULT 1 NOT NULL,
	`parent_consent_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_code_unique` ON `users` (`login_code`);--> statement-breakpoint
CREATE INDEX `users_role_idx` ON `users` (`role`);