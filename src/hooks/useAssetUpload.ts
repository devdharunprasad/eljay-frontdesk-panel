// import { useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import toast from "react-hot-toast";
// // Initialize Supabase client
// const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
// const BUCKET_NAME = "upload-images";
// /**
//  * Custom hook for uploading and managing images in Supabase storage
//  * @returns {object} - { url, urls, error, loading, uploadAsset, uploadAssets, removeAsset }
//  */
// const useAssetUpload = () => {
//   const [url, setUrl] = useState<string | null>(null);
//   const [urls, setUrls] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Upload a single asset
//   const uploadAsset = (file: File) => {
//     setLoading(true);
//     const fileName = `${Date.now()}-${file.name}`;
//     supabase.storage
//       .from(BUCKET_NAME)
//       .upload(fileName, file)
//       .then(({ data, error }: any) => {
//         if (error) {
//           setLoading(false);
//           toast.error("Image upload error " + error.message);
//           return;
//         }
//         if (data) {
//           const { data: publicUrlData } = supabase.storage
//             .from(BUCKET_NAME)
//             .getPublicUrl(fileName);
//           setUrl(publicUrlData.publicUrl);
//         }
//       })
//       .catch((err: any) => {
//         toast.error(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   // Upload multiple assets and return all URLs
//   const uploadAssets = async (files: File[]): Promise<string[]> => {
//     setLoading(true);
//     const uploadedUrls: string[] = [];
//     for (const file of files) {
//       const fileName = `${Date.now()}-${file.name}`;
//       const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);
//       if (error) {
//         toast.error(`Image upload error for ${file.name}: ${error.message}`);
//         continue;
//       }
//       if (data) {
//         const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
//         if (publicUrlData?.publicUrl) {
//           uploadedUrls.push(publicUrlData.publicUrl);
//         }
//       }
//     }
//     setUrls(uploadedUrls);
//     setLoading(false);
//     return uploadedUrls;
//   };

//   const removeAsset = () => {
//     setUrl("");
//     setUrls([]);
//   };

//   return { url, urls, loading, uploadAsset, uploadAssets, removeAsset };
// };
// export default useAssetUpload;