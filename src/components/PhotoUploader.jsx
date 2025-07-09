import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Camera } from "lucide-react";
import { AuthContext } from "../context/auth.context";   // ⬅️  nuevo

const CLOUD_NAME   = "dzbdckbli";
const UPLOAD_PRESET = "UserTest";

function PhotoUploader({ onPhotoUpload }) {
  const { user, setUser } = useContext(AuthContext);     // ⬅️  accedemos al usuario
  const [photoFile,    setPhotoFile]    = useState(null);

  // ⬇️  Vista previa se inicializa con la foto existente (si la hay)
  const [photoPreview, setPhotoPreview] = useState(user?.userImg || "");

  const [loading,      setLoading]      = useState(false);

  /* ------------------------------------------------------------------ */
  /* 1. Si el usuario se recupera después de montar el componente        */
  /*    (típico cuando verify tarda un poco), nos aseguramos de mostrar  */
  /*    la foto en cuanto llegue.                                        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (user?.userImg && user.userImg !== photoPreview) {
      setPhotoPreview(user.userImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userImg]);   // nos interesa solo ese campo

  /* ------------------------------------------------------------------ */
  /* 2. Seleccionar una nueva foto                                       */
  /* ------------------------------------------------------------------ */
  const handleSelectPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));  // preview local instantánea
  };

  /* ------------------------------------------------------------------ */
  /* 3. Subir a Cloudinary                                               */
  /* ------------------------------------------------------------------ */
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
      onPhotoUpload(uploadedPhotoURL);           // avisamos al padre

      /* Opcional pero recomendable: actualizamos el contexto para que
         toda la app muestre la nueva foto inmediatamente                */
      setUser?.({ ...user, userImg: uploadedPhotoURL });

    } catch (err) {
      console.error("Error al subir la imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 4. Render                                                           */
  /* ------------------------------------------------------------------ */
  return (
    <div className="flex flex-col items-center space-y-2 bg-[#2a2f38]/70 rounded-3xl shadow-2xl p-8">
      {/* Foto + icono */}
      <div className="relative w-32 h-32">
        {/* Avatar */}
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

        {/* Input oculto */}
        <input
          id="photo-input"
          type="file"
          accept="image/*"
          onChange={handleSelectPhoto}
          className="hidden"
        />

        {/* Icono superpuesto */}
        <label
          htmlFor="photo-input"
          className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 flex items-center justify-center w-9 h-9 rounded-full bg-teal-600 shadow-lg cursor-pointer hover:bg-teal-700 transition"
        >
          <Camera className="w-5 h-5 text-white" />
        </label>
      </div>

      {/* Botón de subida */}
      <button
        onClick={handleUploadPhoto}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-teal-600 rounded text-white disabled:opacity-60"
      >
        {loading ? "Subiendo…" : "Subir foto"}
      </button>
    </div>
  );
}

export default PhotoUploader;
