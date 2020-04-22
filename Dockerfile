#  Copyright 2020 IBM
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

FROM node:alpine
RUN apk update && apk upgrade
WORKDIR /usr/src/app
COPY /package.json .
RUN npm install
COPY . .

# Support to for arbitrary UserIds
# https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html#openshift-specific-guidelines
RUN chmod -R u+x /server && \
    chgrp -R 0 /server && \
    chmod -R g=u /server /etc/passwd

ENV PORT 8080
EXPOSE 8080

CMD ["node", "app.js"]
