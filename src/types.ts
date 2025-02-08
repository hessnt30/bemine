export interface ImageUploadResource {
  id?: string;
  batchId?: string;
  asset_id?: string;
  public_id?: string;
  version?: number;
  version_id?: string;
  signature?: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  created_at?: string;
  tags?: string[];
  bytes?: number;
  type?: string;
  etag?: string;
  placeholder?: boolean;
  url?: string;
  secure_url?: string;
  asset_folder?: string;
  display_name?: string;
  original_filename?: string;
  original_extension?: string;
  api_key?: string;
  path?: string;
  thumbnail_url?: string;
}

export interface GramResponse {
  postId: string;
  imageUrl: string;
  message: string;
  recipient: string;
  sender: string;
}

export interface NewGram {
  imageUrl: string;
  message: string;
  recipient: string;
  sender: string;
}
