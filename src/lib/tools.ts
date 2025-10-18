import type { ToolConfig } from './types';

import json from '../routes/json/json';
import datetime from '../routes/datetime/datetime';
import color from '../routes/color/color';
import base64 from '../routes/base64/base64';
import jwt from '../routes/jwt/jwt';
import urlEncoding from '../routes/url-encoding/url-encoding';

export const allTools: ToolConfig[] = [
	json(),
	datetime(),
	color(),
	base64(),
	jwt(),
	urlEncoding()
];