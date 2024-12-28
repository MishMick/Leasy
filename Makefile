install:
	npm install
	# setup pre-commit hooks
	npm pkg set scripts.prepare="husky install"
	npx husky add .husky/pre-commit "npx lint-staged"

run:
	npm run start