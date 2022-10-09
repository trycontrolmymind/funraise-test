import * as dotenv from 'dotenv';
import { HtmlApp } from './HtmlApp';
const config = dotenv.config().parsed || {};

const htmlApp = new HtmlApp(config);
htmlApp.init();