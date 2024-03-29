/**
 * Copyright 2020 IBM
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 **/

const bodyParser = require("body-parser");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes/router");
const title = "Web Gallery S3 ICOS";
const Controller = require("./server/controllers/Controller");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(logger("dev"));
app.use(cookieParser());

app.use("/api", router);
app.use("/file", Controller.obtenerfile);
app.use("/files", Controller.getFiles);

module.exports = app;
