import type { Tool } from './types';

import jsonTool from '../routes/json/json';
import datetimeTool from '../routes/datetime/datetime';
import colorTool from '../routes/color/color';
import base64Tool from '../routes/base64/base64';
import jwtTool from '../routes/jwt/jwt';
import urlEncodingTool from '../routes/url-encoding/url-encoding';

export const allTools = [jsonTool, datetimeTool, colorTool, base64Tool, jwtTool, urlEncodingTool];

export function defineTool<T>(tool: Tool<T>): Tool<T> {
	return tool;
}
