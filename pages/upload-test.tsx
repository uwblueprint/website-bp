import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { NextPage } from "next";
import Layout from "@components/common/Layout";
import { mutations } from "../graphql/queries";
import { fetchGraphqlUpload } from "@utils/makegqlrequest";

interface FirebaseFileResult {
  id: number;
  storagePath: string;
  originalFileName: string;
  sizeBytes: string;
  uploadedUserId: number;
  createdAt: string;
}

type UploadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: FirebaseFileResult }
  | { status: "error"; message: string };

/** PoC page for testing the createFirebaseFile GraphQL mutation. */
const UploadTest: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadState({ status: "idle" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadState({ status: "error", message: "Please select a file." });
      return;
    }

    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId) || parsedUserId <= 0) {
      setUploadState({
        status: "error",
        message: "Please enter a valid positive integer for the user ID.",
      });
      return;
    }

    setUploadState({ status: "loading" });

    try {
      const response = await fetchGraphqlUpload(
        mutations.createFirebaseFile,
        selectedFile,
        "variables.file",
        // The file variable must be null here; fetchGraphqlUpload maps the
        // real file onto it via the multipart spec.
        { file: null, uploadedUserId: parsedUserId },
      );

      if (response.errors?.length) {
        setUploadState({
          status: "error",
          message: response.errors.map((e) => e.message).join("; "),
        });
        return;
      }

      if (!response.data?.createFirebaseFile) {
        setUploadState({
          status: "error",
          message: "Unexpected response: no file data returned.",
        });
        return;
      }

      setUploadState({
        status: "success",
        result: response.data.createFirebaseFile as FirebaseFileResult,
      });

      // Reset form
      setSelectedFile(null);
      setUserId("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setUploadState({ status: "error", message: err.message });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUserId("");
    setUploadState({ status: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Layout title="File Upload PoC">
      <div className="container max-w-2xl px-4 mx-auto mt-32 mb-16">
        <h1 className="text-3xl font-bold text-blue mb-2">File Upload PoC</h1>
        <p className="text-charcoal-500 mb-8">
          Test the{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">
            createFirebaseFile
          </code>{" "}
          GraphQL mutation. The file is uploaded to Firebase Storage via the
          backend and a{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">FirebaseFile</code>{" "}
          record is returned on success.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm"
        >
          {/* File picker */}
          <div>
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-charcoal-700 mb-1"
            >
              File <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              id="file-input"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-charcoal-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-medium
                file:bg-blue file:text-white
                hover:file:opacity-90
                cursor-pointer"
            />
            {selectedFile && (
              <p className="mt-1 text-xs text-gray-500">
                {selectedFile.name} &mdash;{" "}
                {(selectedFile.size / 1024).toFixed(1)} KB &mdash;{" "}
                {selectedFile.type || "unknown type"}
              </p>
            )}
          </div>

          {/* User ID */}
          <div>
            <label
              htmlFor="user-id-input"
              className="block text-sm font-medium text-charcoal-700 mb-1"
            >
              Uploaded User ID <span className="text-red-500">*</span>
            </label>
            <input
              id="user-id-input"
              type="number"
              min={1}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 1"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploadState.status === "loading"}
              className="px-5 py-2 rounded bg-blue text-white text-sm font-medium
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {uploadState.status === "loading" ? "Uploading…" : "Upload File"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 rounded border border-gray-300 text-sm font-medium
                text-charcoal-500 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Result panel */}
        {uploadState.status === "error" && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-1">Upload failed</p>
            <p>{uploadState.message}</p>
          </div>
        )}

        {uploadState.status === "success" && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-700 mb-3">
              File uploaded successfully!
            </p>
            <table className="w-full text-sm text-left border-collapse">
              <tbody>
                {(
                  [
                    ["ID", uploadState.result.id],
                    ["Original File Name", uploadState.result.originalFileName],
                    ["Storage Path", uploadState.result.storagePath],
                    ["Size (bytes)", uploadState.result.sizeBytes],
                    ["Uploaded User ID", uploadState.result.uploadedUserId],
                    ["Created At", uploadState.result.createdAt],
                  ] as [string, string | number][]
                ).map(([label, value]) => (
                  <tr
                    key={label}
                    className="border-b border-green-100 last:border-0"
                  >
                    <td className="py-1.5 pr-4 font-medium text-charcoal-700 w-40">
                      {label}
                    </td>
                    <td className="py-1.5 text-charcoal-500 break-all">
                      {String(value ?? "—")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Raw JSON toggle */}
            <details className="mt-4">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 select-none">
                Show raw JSON
              </summary>
              <pre className="mt-2 bg-gray-100 rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap break-all text-charcoal-600">
                {JSON.stringify(uploadState.result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UploadTest;
