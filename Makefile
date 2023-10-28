# Makefile for Node.js CRUD operations on a book database

# Variables
NODE_BIN := node_modules/.bin
NODE := $(NODE_BIN)/node
NPM := npm

# Default target
all: install run

# Install project dependencies
install:
	$(NPM) install

# Run the Node.js server
run:
	$(NODE) server.js

# Clean up installed packages and build artifacts
clean:
	$(NPM) prune
	rm -rf node_modules

# Help target to display available targets
help:
	@echo "Available targets:"
	@echo "  install   - Install project dependencies"
	@echo "  run       - Run the Node.js server"
	@echo "  clean     - Clean up installed packages and build artifacts"
	@echo "  help      - Display this help message"

# Ensure the targets are not treated as file targets
.PHONY: install run clean help

couldn't get the makefile to run