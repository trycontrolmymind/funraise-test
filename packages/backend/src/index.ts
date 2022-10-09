import * as dotenv from 'dotenv';
import { HtmlApp } from './HtmlApp';
const config = dotenv.config().parsed || {};

const htmlApp = new HtmlApp(config);
const publicPort = parseInt(config["PUBLIC_PORT"], 10);

htmlApp.init(publicPort);