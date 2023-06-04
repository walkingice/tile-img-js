.PHONY: main
main:
	npm run build_ts && npm run main src/test/assets/ /tmp/output/

.PHONY: clean
clean:
	rm -rf build
