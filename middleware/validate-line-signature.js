import config from '../config/index.js';
import { validateSignature } from '../utils/index.js';

const validateLineSignature = (req, res, next) => {
  const secret = config.LINE_CHANNEL_SECRET || '';
  const signature = req.header('x-line-signature');

  // 新增除錯訊息
  console.log('--- Debug Start ---');
  console.log('LINE_CHANNEL_SECRET:', secret);
  console.log('X-Line-Signature:', signature);
  console.log('rawBody:', req.rawBody);
  console.log('--- Debug End ---');

  if (!validateSignature(req.rawBody, secret, signature)) {
    console.log('Signature validation failed');
    res.sendStatus(403);
    return;
  }

  console.log('Signature validation succeeded, responding 200...');
  next();
};

export default validateLineSignature;
