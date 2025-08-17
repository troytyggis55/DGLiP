.PHONY: dev-nextjs dev-studio

# Start dglip-nextjs dev server
next:
	cd dglip-nextjs && npm install && npm run dev

# Start dglip-studio dev server
studio:
	cd dglip-studio && npm install && npm run dev
