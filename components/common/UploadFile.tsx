import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Button from "@components/common/Button";
import { useAuthUserContext } from "../context/AuthUserContext";
import { mutations } from "../../graphql/queries";
import { fetchGraphqlUpload } from "../../utils/makegqlrequest";

const ACCEPTED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadFileProps {
  onSuccess?: (result: any) => void;
  onError?: (message: string) => void;
}

const UploadFile = ({ onSuccess, onError }: UploadFileProps) => {
  const { authenticatedUser } = useAuthUserContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setValidationError("");
    setUploadStatus("idle");
    setErrorMessage("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      setValidationError("Only PDF, JPEG, and PNG files are accepted.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setValidationError("Please select a file before uploading.");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");

    try {
      const response = await fetchGraphqlUpload(
        mutations.createFirebaseFile,
        selectedFile,
        "variables.file",
        {
          file: null,
          uploadedUserId: parseInt(authenticatedUser?.id ?? "", 10),
        },
      );

      if (response.errors?.length) {
        throw new Error(response.errors[0]?.message ?? "Upload failed.");
      }

      setUploadStatus("success");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onSuccess?.(response.data);
    } catch (err: any) {
      const message = err.message ?? "An unexpected error occurred.";
      setUploadStatus("error");
      setErrorMessage(message);
      onError?.(message);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-blue-900">Upload File</h1>
      <p className="mb-6 text-sm text-gray-500">
        Accepted formats: PDF, JPEG, PNG
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Drop zone / file picker */}
        <label
          htmlFor="file-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 px-6 py-10 transition hover:border-blue-500 hover:bg-blue-100"
        >
          <svg
            className="mb-3 h-10 w-10 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M16.5 12L12 7.5m0 0L7.5 12M12 7.5V19.5"
            />
          </svg>
          <span className="text-sm font-medium text-blue-700">
            Click to select a file
          </span>
          <span className="mt-1 text-xs text-gray-400">PDF, JPEG, or PNG</span>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        {/* Validation error */}
        {validationError && (
          <p className="mt-3 text-sm text-red-600">{validationError}</p>
        )}

        {/* Selected file info */}
        {selectedFile && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold uppercase text-blue-700">
                {selectedFile.type === "application/pdf"
                  ? "PDF"
                  : selectedFile.type === "image/jpeg"
                  ? "JPEG"
                  : "PNG"}
              </span>
              <span className="truncate text-sm text-gray-700">
                {selectedFile.name}
              </span>
            </div>
            <span className="ml-3 shrink-0 text-xs text-gray-400">
              {formatFileSize(selectedFile.size)}
            </span>
          </div>
        )}

        {/* Upload feedback */}
        {uploadStatus === "success" && (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            File uploaded successfully.
          </div>
        )}
        {uploadStatus === "error" && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Upload failed: {errorMessage}
          </div>
        )}

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full"
            disabled={!selectedFile || uploadStatus === "uploading"}
          >
            {uploadStatus === "uploading" ? "Uploading…" : "Upload File"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;
