/**
 * Get File object from a base64.
 *
 * @param base64 Picture Base64
 * @returns Promise of File
 */
export async function getFileFromBase64(
  base64: string,
  fileType: string
): Promise<File> {
  const response = await fetch(base64);
  const blob = await response.blob();
  return new File([blob], 'file.jpeg', { type: fileType });
}
