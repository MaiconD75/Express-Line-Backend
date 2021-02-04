import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
  deleteUploadedFile: async (filename: string): Promise<void> => {
    const filePath = path.join(tmpFolder, filename);

    const fileExist = await fs.promises.stat(filePath);

    if (fileExist) {
      await fs.promises.unlink(filePath);
    }
  },
};
