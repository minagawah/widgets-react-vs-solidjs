PUBLIC_URL = /

# Prettier

prettier.client.widget.react:
	cd client/widget.react && npm run prettier

prettier.client.widget.solid:
	cd client/widget.solid && npm run prettier

prettier.client: prettier.client.widget.react prettier.client.widget.solid

prettier.server:
	cd server && npm run prettier

prettier: prettier.client prettier.server

# Clean

clean.client.widget.react:
	cd client/widget.react && npm run clean

clean.client.widget.solid:
	cd client/widget.solid && npm run clean

clean.client: clean.client.widget.react clean.client.widget.solid

# Build

build.client.widget.react.dev:
	cd client/widget.react && npm run build:dev

build.client.widget.solid.dev:
	cd client/widget.solid && npm run build:dev

build.client.dev: build.client.widget.react.dev build.client.widget.solid.dev

build.client.widget.react.release:
	cd client/widget.react && npm run build:release

build.client.widget.solid.release:
	cd client/widget.solid && npm run build:release

build.client.release: build.client.widget.react.release build.client.widget.solid.release

# Watch: Server + Client

clean.css:
	rm -fR server/public/css/*

build.css: clean.css
	cd server && npm run build:css

watch.server:
	cd server && npm run watch

watch.client.widget.react:
	cd client/widget.react && npm run watch:dev

watch.client.widget.solid:
	cd client/widget.solid && npm run watch:dev

# Stats & Analysis

stats.widget.react:
	cd client/widget.react && npm run webpack:stats

stats.widget.solid:
	cd client/widget.solid && npm run webpack:stats

stats: stats.widget.react stats.widget.solid

analyze.widget.react:
	cd client/widget.react && npm run webpack:analyze

analyze.widget.solid:
	cd client/widget.solid && npm run webpack:analyze

analyze: analyze.widget.react analyze.widget.solid
