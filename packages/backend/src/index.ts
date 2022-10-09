import * as dotenv from 'dotenv';
import { HtmlApp } from './HtmlApp';
import { ScriptApp } from './ScriptApp';
const config = dotenv.config().parsed || {};

const htmlApp = new HtmlApp(config);
htmlApp.init();

const scriptApp = new ScriptApp(config);
scriptApp.init();