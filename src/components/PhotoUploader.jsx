import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Camera } from "lucide-react";
import { AuthContext } from "../context/auth.context";

const CLOUD_NAME = "dzbdckbli";
const UPLOAD_PRESET = "UserTest";

function PhotoUploader({ onPhotoUpload }) {
  const { user, setUser } = useContext(AuthContext);
  const [photoFile, setPhotoFile] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(user?.userImg || "");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userImg && user.userImg !== photoPreview) {
      setPhotoPreview(user.userImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userImg]);

  const handleSelectPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return;

    const formData = new FormData();
    formData.append("file", photoFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    setLoading(true);

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const uploadedPhotoURL = data.secure_url;
      onPhotoUpload(uploadedPhotoURL);
      setUser?.({ ...user, userImg: uploadedPhotoURL });
    } catch (err) {
      console.error("Error al subir la imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 bg-gray-800/70 rounded-3xl shadow-2xl p-8">
      <div className="relative w-32 h-32">
        <div className="w-full h-full rounded-full overflow-hidden border border-gray-400">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700 text-sm text-gray-300">
              Sin foto
            </div>
          )}
        </div>

        <input
          id="photo-input"
          type="file"
          accept="image/*"
          onChange={handleSelectPhoto}
          className="hidden"
        />

        <label
          htmlFor="photo-input"
          className="absolute top-0 right-0  translate-x-1/3 -translate-y-1/3 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 shadow-lg cursor-pointer hover:bg-teal-700 transition"
        >
          <Camera className="w-5 h-5 text-white" />
        </label>
      </div>

      <button
        onClick={handleUploadPhoto}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 rounded-xl text-white font-bold"
      >
        {loading ? "Subiendo…" : "Subir foto"}
      </button>
    </div>
  );
}

export default PhotoUploader;
