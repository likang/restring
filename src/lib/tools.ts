import type { Tool } from './types';

import { tool as jsonTool } from '../routes/json/json';
import { tool as datetimeTool } from '../routes/datetime/datetime';
import { tool as colorTool } from '../routes/color/color';
import { tool as base64Tool } from '../routes/base64/base64';
import { tool as jwtTool } from '../routes/jwt/jwt';
import { tool as urlEncodingTool } from '../routes/url-encoding/url-encoding';

export const allTools: Tool[] = [
	jsonTool,
	datetimeTool,
	colorTool,
	base64Tool,
	jwtTool,
	urlEncodingTool
];
