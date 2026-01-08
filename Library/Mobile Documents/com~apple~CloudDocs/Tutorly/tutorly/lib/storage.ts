import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize R2 client
const R2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'tutorly';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

export type FileType = 'homework' | 'test' | 'submission' | 'avatar' | 'resource';

/**
 * Generate a unique file key for storage
 */
function generateFileKey(type: FileType, userId: string, filename: string): string {
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `${type}/${userId}/${timestamp}-${sanitizedFilename}`;
}

/**
 * Get a presigned URL for uploading a file
 * Client uploads directly to R2 using this URL
 */
export async function getUploadUrl(
    type: FileType,
    userId: string,
    filename: string,
    contentType: string,
    expiresIn: number = 3600 // 1 hour
): Promise<{ uploadUrl: string; fileKey: string; publicUrl: string }> {
    const fileKey = generateFileKey(type, userId, filename);

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(R2, command, { expiresIn });
    const publicUrl = `${PUBLIC_URL}/${fileKey}`;

    return { uploadUrl, fileKey, publicUrl };
}

/**
 * Get a presigned URL for downloading a file
 * Use for private files that require authentication
 */
export async function getDownloadUrl(
    fileKey: string,
    expiresIn: number = 3600
): Promise<string> {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
    });

    return getSignedUrl(R2, command, { expiresIn });
}

/**
 * Delete a file from storage
 */
export async function deleteFile(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
    });

    await R2.send(command);
}

/**
 * Get the public URL for a file
 * Only use for files that should be publicly accessible
 */
export function getPublicUrl(fileKey: string): string {
    return `${PUBLIC_URL}/${fileKey}`;
}

/**
 * Validate file type based on allowed extensions
 */
export function validateFileType(
    filename: string,
    allowedTypes: string[] = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'gif']
): boolean {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension ? allowedTypes.includes(extension) : false;
}

/**
 * Get content type from filename
 */
export function getContentType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const contentTypes: Record<string, string> = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        txt: 'text/plain',
    };
    return contentTypes[extension || ''] || 'application/octet-stream';
}
