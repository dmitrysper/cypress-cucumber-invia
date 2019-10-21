FROM cypress/browsers:chrome69

WORKDIR /tests
COPY . /tests

# Install project dependencies
RUN npm install
# command to be executed when image is run
ENTRYPOINT npm run test:headless-docker
