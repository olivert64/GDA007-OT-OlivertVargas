const path = require('path');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { fileURLToPath } = require('url');

const ImageService = {
    async saveBase64Image(base64String) {
        try {
            const imageData = base64String;
            if (!/^[A-Za-z0-9+/=]+$/.test(imageData)) {
                throw new
                    Error('Invalid Base64 string');
            }
            //const buffer = Buffer.from(imageData, 'base64');
           
            const extension = 'png';

            const filename = `${Date.now()}-${uuidv4()}.${extension}`;
            const storageDir = path.join(__dirname, '../../almacenamiento/imagenes');
            if (!existsSync(storageDir)) {

                mkdirSync(storageDir, { recursive: true });
            }
            const filePath = path.join(storageDir, filename);
            writeFileSync(filePath, imageData, { encoding: 'base64' });

            const imageUrl = `http://localhost:3000/api/almacenamiento/${filename}`;
            return imageUrl;
        } catch (error) {
            throw new Error('Failed to save Base64 image: ' + error.message);
        }
    }
}

module.exports = ImageService;